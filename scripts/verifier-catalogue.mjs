/**
 * VÉRIFICATION DU CATALOGUE — outil de diagnostic, en lecture seule.
 *
 *     npm run verifier-catalogue
 *
 * Lit l'offre exactement comme le fera le portfolio, et compare le résultat
 * aux chiffres attendus. Sert à s'assurer que les deux sites voient la même
 * chose avant d'afficher quoi que ce soit.
 *
 * ⚠️ N'écrit rien et ne peut rien écrire : la clé « anon » ne fait que lire.
 * ⚠️ Jamais select('*') : les droits sont accordés colonne par colonne, une
 *    requête qui demande tout échoue entièrement.
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const cle = process.env.SUPABASE_ANON_KEY;

if (!url || !cle) {
  console.error('\nSUPABASE_URL et/ou SUPABASE_ANON_KEY sont absents. Vérifie ton .env.\n');
  process.exit(1);
}

const sb = createClient(url, cle, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Les quatre niveaux, dans l'ordre du parcours scolaire. */
const NIVEAUX = [
  ['primaire', 'Primaire'],
  ['secondaire', 'Secondaire'],
  ['cegep', 'Cégep'],
  ['universite', 'Université'],
];

/** Ce que la base doit contenir (état communiqué le 10 août 2026). */
const ATTENDU = {
  primaire: { matieres: 3, cours: 0 },
  secondaire: { matieres: 5, cours: 10 },
  cegep: { matieres: 5, cours: 16 },
  universite: { matieres: 2, cours: 10 },
};

const [rMat, rCours] = await Promise.all([
  // Une matière est offerte à un niveau si `matieres_niveaux` le dit — jamais
  // parce qu'un cours existe à ce niveau : le primaire a 3 matières, 0 cours.
  sb.from('matieres').select('id, nom, matieres_niveaux(niveau)'),
  sb.from('cours').select('id, matiere_id, nom, niveau').eq('actif', true).order('ordre'),
]);

for (const [nom, r] of [['matieres', rMat], ['cours', rCours]]) {
  if (r.error) {
    console.error(`\nLecture de ${nom} impossible : ${r.error.message}\n`);
    process.exit(1);
  }
}

if (rMat.data.length === 0) {
  console.error(
    '\n⚠️ Aucune matière lue, et pourtant aucune erreur.\n' +
      "   C'est la signature d'une politique de lecture manquante côté base.\n" +
      '   À corriger sur aeeureka — ne va pas plus loin.\n'
  );
  process.exit(1);
}

/** Règle d'affichage : masquer le cours qui porte le nom de sa matière. */
const memeNom = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

const nomMatiere = new Map(rMat.data.map((m) => [String(m.id), String(m.nom)]));

console.log('');
let ecarts = 0;

for (const [cle, libelle] of NIVEAUX) {
  const matieres = rMat.data
    .filter((m) => (m.matieres_niveaux ?? []).some((j) => String(j.niveau) === cle))
    .map((m) => String(m.nom))
    .sort((a, b) => a.localeCompare(b, 'fr'));

  const cours = rCours.data.filter((c) => String(c.niveau) === cle); // déjà triés par `ordre`
  const affiches = cours.filter((c) => !memeNom(String(c.nom), nomMatiere.get(String(c.matiere_id)) ?? ''));
  const masques = cours.length - affiches.length;

  const att = ATTENDU[cle];
  const okM = matieres.length === att.matieres;
  const okC = cours.length === att.cours;
  if (!okM || !okC) ecarts++;

  console.log(`--- ${libelle}`);
  console.log(
    `    matières : ${matieres.length} ${okM ? 'OK' : `⚠️ attendu ${att.matieres}`}` +
      `   ·   cours : ${cours.length} ${okC ? 'OK' : `⚠️ attendu ${att.cours}`}`
  );
  console.log(`    ${matieres.join(', ')}`);

  for (const nom of matieres) {
    const id = [...nomMatiere.entries()].find(([, n]) => n === nom)?.[0];
    const liste = affiches.filter((c) => String(c.matiere_id) === id).map((c) => String(c.nom));
    // Une matière sans cours n'affiche rien de plus.
    if (liste.length) console.log(`      ${nom} : ${liste.join(', ')}`);
  }
  if (masques > 0) {
    const noms = cours
      .filter((c) => memeNom(String(c.nom), nomMatiere.get(String(c.matiere_id)) ?? ''))
      .map((c) => String(c.nom));
    console.log(`    (${masques} cours masqué(s), même nom que leur matière : ${noms.join(', ')})`);
  }
  console.log('');
}

console.log(
  ecarts === 0
    ? '=== Les chiffres correspondent. La lecture est bonne. ===\n'
    : `=== ⚠️ ${ecarts} niveau(x) hors des chiffres attendus — ne va pas plus loin. ===\n`
);
