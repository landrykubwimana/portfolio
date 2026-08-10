/**
 * CATALOGUE — l'offre de tutorat, groupée par niveau.
 *
 * Lue dans la base commune avec aeeureka, en LECTURE SEULE, avec la clé anon.
 * Les deux sites doivent afficher exactement la même chose : les règles
 * ci-dessous sont celles d'aeeureka, reproduites à l'identique.
 *
 * ⚠️ Jamais select('*') : les droits sont accordés colonne par colonne, une
 *    requête qui demande tout échoue entièrement. Il faut nommer les colonnes.
 * ⚠️ Certaines colonnes existent mais restent fermées, et c'est voulu :
 *    cours.niveaux_detail, cours.programmes, et les colonnes de trace. Ce sont
 *    des rouages du formulaire de demande, pas de la vitrine.
 */
import { connexion, avertirVariablesAbsentes } from './supabase';

/**
 * Les quatre niveaux, dans l'ordre du parcours scolaire. Ces libellés doivent
 * rester exactement ceux d'aeeureka.
 */
const NIVEAUX: ReadonlyArray<readonly [string, string]> = [
  ['primaire', 'Primaire'],
  ['secondaire', 'Secondaire'],
  ['cegep', 'Cégep'],
  ['universite', 'Université'],
];

export interface MatiereAffichee {
  nom: string;
  /** Vide quand la matière n'a aucun cours à montrer — on n'affiche alors rien. */
  cours: string[];
}

export interface NiveauAffiche {
  /** La valeur en base : 'primaire', 'secondaire'… Sert d'identifiant. */
  cle: string;
  libelle: string;
  matieres: MatiereAffichee[];
  /** Faux quand aucun cours n'est à montrer : pas de bouton « voir les cours ». */
  aDesCours: boolean;
}

interface LienNiveau {
  niveau: string | null;
}

interface MatiereRow {
  id: string;
  nom: string | null;
  matieres_niveaux: LienNiveau[] | null;
}

interface CoursRow {
  id: string;
  matiere_id: string;
  nom: string | null;
  niveau: string | null;
}

/**
 * Un cours qui porte le nom de sa matière n'apprend rien : au secondaire,
 * « Chimie » contient un cours « Chimie », et la carte afficherait
 * « Chimie › Chimie ». On le masque.
 *
 * C'est un choix d'AFFICHAGE : le cours reste en base et reste sélectionnable
 * dans les formulaires d'aeeureka. Là-bas la règle s'appelle `coursAAfficher()`.
 *
 * ⚠️ Comparaison insensible à la casse et aux espaces de bordure, mais PAS aux
 *    accents. Sans cette règle, les deux sites montrent des listes différentes
 *    pour les mêmes données.
 */
function memeNom(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

/**
 * Renvoie les quatre niveaux avec leurs matières et leurs cours.
 *
 * En cas de problème, renvoie une liste vide et écrit la raison dans les
 * journaux : la page s'affiche sans le bloc plutôt que de tomber en panne.
 * Aucun repli sur une liste écrite en dur — ce serait masquer une divergence
 * avec aeeureka au lieu de la révéler.
 */
export async function getCatalogue(): Promise<NiveauAffiche[]> {
  const sb = connexion();
  if (!sb) {
    avertirVariablesAbsentes('catalogue');
    return [];
  }

  const [rMatieres, rCours] = await Promise.all([
    // Une matière est offerte à un niveau si `matieres_niveaux` le dit — jamais
    // parce qu'un cours existe à ce niveau. Le primaire a trois matières et
    // aucun cours.
    sb.from('matieres').select('id, nom, matieres_niveaux(niveau)'),
    // `actif` écarte les cours retirés de l'offre. Le tri se fait sur `ordre`,
    // jamais sur le nom : sinon « Calcul intégral » passerait avant
    // « Calcul différentiel ».
    sb.from('cours').select('id, matiere_id, nom, niveau').eq('actif', true).order('ordre'),
  ]);

  if (rMatieres.error) {
    console.error('[catalogue] matières illisibles :', rMatieres.error.message);
    return [];
  }
  if (rCours.error) {
    console.error('[catalogue] cours illisibles :', rCours.error.message);
    return [];
  }

  const matieres = (rMatieres.data ?? []) as unknown as MatiereRow[];
  const cours = (rCours.data ?? []) as unknown as CoursRow[];

  if (matieres.length === 0) {
    // Une lecture qui réussit sans rien renvoyer n'est pas un catalogue vide :
    // c'est la signature d'une politique de lecture manquante côté base.
    console.error(
      '[catalogue] aucune matière lue, et pourtant aucune erreur — ' +
        'politique de lecture probablement manquante sur `matieres`. À corriger côté aeeureka.'
    );
    return [];
  }

  const nomDeMatiere = new Map(matieres.map((m) => [String(m.id), (m.nom ?? '').trim()]));

  return NIVEAUX.map(([cle, libelle]) => {
    const duNiveau = matieres
      .filter((m) => (m.matieres_niveaux ?? []).some((j) => String(j.niveau) === cle))
      // Matières triées par nom.
      .sort((a, b) => (a.nom ?? '').localeCompare(b.nom ?? '', 'fr'));

    const matieresAffichees = duNiveau.map((m) => {
      const nom = (m.nom ?? '').trim();
      const siens = cours
        // `cours` arrive déjà trié par `ordre` : on ne le retrie jamais.
        .filter((c) => String(c.niveau) === cle && String(c.matiere_id) === String(m.id))
        .map((c) => (c.nom ?? '').trim())
        .filter((n) => n && !memeNom(n, nom));
      return { nom, cours: siens };
    });

    return {
      cle,
      libelle,
      matieres: matieresAffichees,
      aDesCours: matieresAffichees.some((m) => m.cours.length > 0),
    };
  }).filter((n) => n.matieres.length > 0);
}
