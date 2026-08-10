/**
 * VÉRIFICATION DE LA LECTURE DES AVIS — outil de diagnostic, en lecture seule.
 *
 *     npm run verifier-avis
 *
 * Affiche ce que la clé publique voit réellement dans la base : le nombre
 * d'avis, l'ordre, et les valeurs BRUTES des champs (niveaux, lien de
 * l'auteur…). C'est ce qui permet de vérifier que le portfolio et aeeureka
 * disent exactement la même chose.
 *
 * Ce script refait la requête à la main plutôt que d'importer src/lib/avis.ts :
 * il doit pouvoir tourner seul, sans passer par Astro.
 *
 * ⚠️ Il n'écrit rien et ne peut rien écrire : la clé « anon » n'a que le droit
 *    de lire les avis approuvés.
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const cle = process.env.SUPABASE_ANON_KEY;

if (!url || !cle) {
  console.error(
    "\nSUPABASE_URL et/ou SUPABASE_ANON_KEY sont absents.\n" +
      "Crée un fichier .env à la racine du projet à partir de .env.example,\n" +
      "puis relance : npm run verifier-avis\n"
  );
  process.exit(1);
}

const COLONNES = [
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

const sb = createClient(url, cle, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await sb
  .from('avis')
  .select(`${COLONNES}, avis_matieres ( avis_id, matiere_id, cours_id )`)
  .order('created_at', { ascending: false })
  .order('auteur_nom', { ascending: true });

if (error) {
  console.error('\nLecture impossible :', error.message, '\n');
  process.exit(1);
}

console.log(`\n${data.length} avis lisibles par la clé publique.\n`);

for (const [i, a] of data.entries()) {
  const abrege = (a.commentaire ?? '').replace(/\s+/g, ' ').slice(0, 70);
  console.log(`--- ${i + 1} ------------------------------------------------`);
  console.log('  type                 :', a.type);
  console.log('  prénom / nom         :', a.auteur_prenom, '/', a.auteur_nom);
  console.log('  afficher_nom_complet :', a.afficher_nom_complet);
  console.log('  auteur_lien          :', a.auteur_lien, '| autre :', a.auteur_lien_autre);
  console.log('  niveaux (brut)       :', JSON.stringify(a.niveaux));
  console.log('  niveau_detail        :', a.niveau_detail);
  console.log('  années               :', a.annee_debut, '→', a.annee_fin);
  console.log('  matières / cours     :', JSON.stringify(a.avis_matieres));
  console.log('  commentaire          :', abrege + (abrege.length === 70 ? '…' : ''));
  console.log('  texte_complet        :', Array.isArray(a.texte_complet)
    ? `${a.texte_complet.length} paragraphe(s)`
    : typeof a.texte_complet);
  console.log('  mention              :', a.mention);
  console.log('  created_at           :', a.created_at);
}

// Noms des matières et des cours : deux requêtes séparées, parce que le lien
// entre `avis_matieres` et `cours` est une clé composite (cours_id, matiere_id)
// que PostgREST ne sait pas suivre.
const liens = data.flatMap((a) => a.avis_matieres ?? []);
const idsMatieres = [...new Set(liens.map((l) => l.matiere_id).filter((v) => v != null))];
const idsCours = [...new Set(liens.map((l) => l.cours_id).filter((v) => v != null))];

if (idsMatieres.length) {
  const { data: m, error: e } = await sb.from('matieres').select('id, nom').in('id', idsMatieres);
  console.log('\nmatieres :', e ? `ERREUR — ${e.message}` : JSON.stringify(m));
}
if (idsCours.length) {
  const { data: c, error: e } = await sb
    .from('cours')
    .select('id, matiere_id, nom')
    .in('id', idsCours);
  console.log('cours    :', e ? `ERREUR — ${e.message}` : JSON.stringify(c));
}

console.log('');
