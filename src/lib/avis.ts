/**
 * AVIS — lecture des avis de l'Académie d'Excellence Eurêka.
 *
 * Le portfolio est en LECTURE SEULE. Il n'écrit rien, ne corrige rien, ne
 * modère rien : tout cela se passe dans l'espace admin d'aeeureka.com.
 *
 * La base (Supabase) est commune aux deux sites. Une règle de sécurité posée
 * dans la base (RLS) n'ouvre à la clé publique QUE les avis approuvés, et QUE
 * les colonnes listées dans COLONNES_AVIS ci-dessous.
 *
 * ⚠️ Ce fichier n'utilise que la clé « anon », publique par conception.
 *    La clé service_role ne doit JAMAIS se trouver dans ce dépôt : elle ignore
 *    toute la sécurité de la base. Voir `supabase.ts`.
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { connexion, avertirVariablesAbsentes } from './supabase';

/* ============================================================
   Libellés affichés sur les cartes
   ============================================================ */

/**
 * LIEN DE L'AUTEUR — à garder identique à aeeureka.
 *
 * Côté aeeureka, ces libellés vivent dans `LIEN_CARTE` (src/lib/avis.ts),
 * séparés des libellés des formulaires : l'article (« L'élève ») appartient à
 * la question posée, pas à l'étiquette d'une carte.
 *
 * ⚠️ Si tu changes un libellé ici, change-le aussi là-bas. Sinon les deux
 *    sites ne diront pas la même chose sur le même avis.
 *
 * « autre » n'est volontairement pas dans cette table : on affiche alors la
 * précision libre saisie par l'auteur (auteur_lien_autre, ex. « Grand-mère »),
 * et seulement à défaut le mot « Autre ».
 */
export const LIEN_CARTE: Record<string, string> = {
  parent: 'Parent / tuteur légal',
  eleve: 'Élève',
};

/**
 * NIVEAUX SCOLAIRES — écrits en minuscules, parce qu'un avis peut en couvrir
 * plusieurs et qu'on ne met la majuscule qu'au début de la phrase obtenue
 * (« Primaire, secondaire, cégep »).
 *
 * Une valeur inconnue est affichée telle quelle plutôt que masquée : mieux
 * vaut un mot mal orthographié à l'écran qu'un niveau disparu en silence.
 */
const NIVEAU_MOT: Record<string, string> = {
  prescolaire: 'préscolaire',
  primaire: 'primaire',
  secondaire: 'secondaire',
  cegep: 'cégep',
  collegial: 'collégial',
  universite: 'université',
  universitaire: 'universitaire',
  adulte: 'formation aux adultes',
};

/* ============================================================
   Ce que le reste du site reçoit
   ============================================================ */

/** Un avis, déjà mis en forme : les composants n'ont plus qu'à l'afficher. */
export interface AvisAffiche {
  id: string;
  /** « Rita Darko » ou « Rita D. », selon le choix de l'auteur. */
  nom: string;
  /** « Parent / tuteur légal », « Élève », ou la précision libre. */
  lien: string;
  /** « Primaire » ou « Primaire, secondaire, cégep ». */
  niveaux: string;
  /** « 4e année ». Segment distinct des niveaux, comme sur aeeureka. */
  niveauDetail: string;
  /** « Depuis 2025 », « 2023 », « 2017 – 2020 », ou '' si aucune année. */
  periode: string;
  /** « Mathématiques — Mathématique CST », ou « Français » sans cours. */
  matieres: string[];
  /** Le texte affiché sur la carte. */
  commentaire: string;
  /** Paragraphes de la fenêtre de lecture. Vide = pas de « Lire la suite ». */
  texteComplet: string[];
  /** Note discrète au bas de la fenêtre de lecture. */
  mention: string;
}

/* ============================================================
   Lecture de la base
   ============================================================ */

/**
 * Les 17 colonnes que la clé publique a le droit de lire.
 *
 * ⚠️ JAMAIS `select('*')`. Les droits sont accordés colonne par colonne : une
 *    requête qui demande tout échoue entièrement. Il faut les nommer.
 *
 * D'autres colonnes existent (auteur_email, commentaire_original,
 * consentement_at, politique_version, source) mais sont inaccessibles, et
 * c'est voulu. Ne les ajoute pas ici.
 */
const COLONNES_AVIS = [
  'id',
  'type',
  'auteur_prenom',
  'auteur_nom',
  'auteur_lien',
  'auteur_lien_autre',
  'afficher_nom_complet',
  'niveaux',
  'niveau_detail',
  'annee_debut',
  'annee_fin',
  'commentaire',
  'texte_complet',
  'mention',
  'created_at',
  'date_approbation',
  'date_rejet',
].join(', ');

/** `avis_matieres` s'imbrique dans la requête sur `avis`. Pas `cours`. */
const SELECT_AVIS = `${COLONNES_AVIS}, avis_matieres ( avis_id, matiere_id, cours_id )`;

interface LienMatiere {
  avis_id: string;
  matiere_id: string | number | null;
  cours_id: string | number | null;
}

interface AvisRow {
  id: string;
  auteur_prenom: string | null;
  auteur_nom: string | null;
  auteur_lien: string | null;
  auteur_lien_autre: string | null;
  afficher_nom_complet: boolean | null;
  niveaux: unknown;
  niveau_detail: string | null;
  annee_debut: number | string | null;
  annee_fin: number | string | null;
  commentaire: string | null;
  texte_complet: unknown;
  mention: string | null;
  avis_matieres: LienMatiere[] | null;
}

/**
 * Renvoie les avis publiés, du plus récent au plus ancien.
 *
 * ⚠️ AUCUN filtre sur `date_approbation` ici, et il ne faut pas en ajouter.
 *    C'est la règle de sécurité de la base qui décide ce qui est public. Un
 *    filtre écrit ici masquerait une règle cassée au lieu de la révéler : le
 *    jour où elle tomberait, un avis non approuvé s'afficherait — et c'est
 *    ainsi qu'on l'apprendrait.
 *
 * En cas de problème (variables absentes, base injoignable, droits refusés),
 * renvoie une liste vide et écrit la raison dans les journaux : la page
 * s'affiche sans la section des avis plutôt que de tomber en panne.
 */
export async function getAvis(): Promise<AvisAffiche[]> {
  const sb = connexion();
  if (!sb) {
    avertirVariablesAbsentes('avis');
    return [];
  }

  const { data, error } = await sb
    .from('avis')
    .select(SELECT_AVIS)
    // Le plus récent d'abord…
    .order('created_at', { ascending: false })
    // …puis le nom, pour départager. Ce second critère n'est pas décoratif :
    // des avis insérés dans une même transaction portent le même created_at à
    // la microseconde près, et sans lui leur ordre serait indéfini — variable
    // d'un chargement à l'autre, et différent de celui d'aeeureka.
    .order('auteur_nom', { ascending: true });

  if (error) {
    console.error('[avis] lecture impossible :', error.message);
    return [];
  }

  const lignes = (data ?? []) as unknown as AvisRow[];
  if (lignes.length === 0) return [];

  const noms = await nomsDesMatieres(sb, lignes);

  return lignes.map((a) => ({
    id: String(a.id),
    nom: nomAffiche(a),
    lien: libelleLien(a),
    niveaux: libelleNiveaux(listeDeTextes(a.niveaux)),
    niveauDetail: libelleNiveauDetail(a.niveau_detail),
    periode: libellePeriode(a.annee_debut, a.annee_fin),
    matieres: matieresDe(a, noms),
    commentaire: (a.commentaire ?? '').trim(),
    texteComplet: listeDeTextes(a.texte_complet),
    mention: (a.mention ?? '').trim(),
  }));
}

/* ============================================================
   Matières et cours
   ============================================================ */

interface NomsMatieres {
  matieres: Map<string, string>;
  /** Clé composite « matiere_id::cours_id » — voir l'explication ci-dessous. */
  cours: Map<string, string>;
}

/**
 * Résout les noms des matières et des cours.
 *
 * ⚠️ La table `cours` ne peut pas être imbriquée dans la requête sur `avis` :
 *    le lien est une clé étrangère COMPOSITE (cours_id, matiere_id), que
 *    PostgREST ne sait pas suivre. D'où ces deux requêtes séparées.
 *
 * Et comme l'identité d'un cours est ce couple, la table de correspondance est
 * indexée sur les deux valeurs, pas sur le seul `id`.
 */
async function nomsDesMatieres(sb: SupabaseClient, lignes: AvisRow[]): Promise<NomsMatieres> {
  const vide: NomsMatieres = { matieres: new Map(), cours: new Map() };

  const liens = lignes.flatMap((a) => a.avis_matieres ?? []);
  const idsMatieres = [...new Set(liens.map((l) => l.matiere_id).filter((v) => v != null))];
  const idsCours = [...new Set(liens.map((l) => l.cours_id).filter((v) => v != null))];
  if (idsMatieres.length === 0 && idsCours.length === 0) return vide;

  const [rMatieres, rCours] = await Promise.all([
    idsMatieres.length ? sb.from('matieres').select('id, nom').in('id', idsMatieres) : null,
    idsCours.length ? sb.from('cours').select('id, matiere_id, nom').in('id', idsCours) : null,
  ]);

  if (rMatieres?.error) console.error('[avis] matières illisibles :', rMatieres.error.message);
  if (rCours?.error) console.error('[avis] cours illisibles :', rCours.error.message);

  const noms: NomsMatieres = { matieres: new Map(), cours: new Map() };
  for (const m of rMatieres?.data ?? []) {
    noms.matieres.set(String(m.id), String(m.nom));
  }
  for (const c of rCours?.data ?? []) {
    noms.cours.set(`${c.matiere_id}::${c.id}`, String(c.nom));
  }
  return noms;
}

/**
 * « Mathématiques — Mathématique CST » quand un cours est précisé, sinon la
 * matière seule. Sans doublon, et par ordre alphabétique — c'est ce que fait
 * aeeureka, et les deux sites doivent lister dans le même ordre.
 */
function matieresDe(a: AvisRow, noms: NomsMatieres): string[] {
  const sortie: string[] = [];
  for (const lien of a.avis_matieres ?? []) {
    const matiere = lien.matiere_id != null ? noms.matieres.get(String(lien.matiere_id)) : undefined;
    const cours =
      lien.cours_id != null ? noms.cours.get(`${lien.matiere_id}::${lien.cours_id}`) : undefined;
    const texte = matiere && cours ? `${matiere} — ${cours}` : (cours ?? matiere);
    if (texte && !sortie.includes(texte)) sortie.push(texte);
  }
  return sortie.sort((x, y) => x.localeCompare(y, 'fr'));
}

/* ============================================================
   Mise en forme
   ============================================================ */

/**
 * Le nom, tel que l'auteur a consenti à le voir affiché.
 *
 * ⚠️ Ce choix lui appartient : il fait partie de son consentement.
 *    Ne jamais afficher plus que ce qu'il a indiqué.
 */
function nomAffiche(a: AvisRow): string {
  const prenom = (a.auteur_prenom ?? '').trim();
  const nom = (a.auteur_nom ?? '').trim();
  if (!nom) return prenom;
  if (a.afficher_nom_complet) return [prenom, nom].filter(Boolean).join(' ');
  const initiale = `${nom.charAt(0).toUpperCase()}.`;
  return [prenom, initiale].filter(Boolean).join(' ');
}

function libelleLien(a: AvisRow): string {
  const lien = (a.auteur_lien ?? '').trim();
  if (!lien) return '';
  if (lien === 'autre') return (a.auteur_lien_autre ?? '').trim() || 'Autre';

  const connu = LIEN_CARTE[lien];
  if (connu) return connu;

  // Un lien inconnu vient forcément d'un ajout côté aeeureka : on l'affiche
  // brut et on le signale, plutôt que de faire disparaître l'information.
  console.warn(`[avis] lien « ${lien} » sans libellé — à ajouter dans LIEN_CARTE.`);
  return majuscule(lien);
}

function libelleNiveaux(niveaux: string[]): string {
  if (niveaux.length === 0) return '';
  return majuscule(niveaux.map((n) => NIVEAU_MOT[n] ?? n).join(', '));
}

/**
 * `niveau_detail` n'existe que lorsqu'un seul niveau est renseigné, et la base
 * n'y stocke que le rang (« 4 »). aeeureka l'affiche « 4e année » ; on fait
 * pareil, dans un segment séparé des niveaux.
 *
 * Une valeur qui n'est pas un nombre est affichée telle quelle.
 */
function libelleNiveauDetail(detail: string | null): string {
  const t = (detail ?? '').trim();
  if (!t) return '';
  return /^\d+$/.test(t) ? `${t}e année` : t;
}

function libellePeriode(debut: unknown, fin: unknown): string {
  const d = annee(debut);
  const f = annee(fin);
  if (!d && !f) return '';
  if (d && !f) return `Depuis ${d}`;
  if (!d && f) return `Jusqu'à ${f}`;
  if (d === f) return `${d}`;
  return `${d} – ${f}`;
}

function annee(v: unknown): string {
  if (v === null || v === undefined) return '';
  const t = String(v).trim();
  return t === '' ? '' : t;
}

function majuscule(t: string): string {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Normalise `niveaux` et `texte_complet` en liste de textes, quelle que soit
 * la forme reçue (tableau, tableau encodé en texte, ou texte à paragraphes).
 */
function listeDeTextes(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof v === 'string') {
    const t = v.trim();
    if (!t) return [];
    if (t.startsWith('[')) {
      try {
        const parse = JSON.parse(t);
        if (Array.isArray(parse)) return parse.map((x) => String(x).trim()).filter(Boolean);
      } catch {
        // Pas du JSON : on retombe sur la découpe en paragraphes ci-dessous.
      }
    }
    return t
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return [];
}
