/**
 * TYPO — la typographie française, posée au moment d'afficher.
 *
 * Les textes restent tels qu'ils sont écrits (profile.ts, le parcours généré
 * depuis Carrière, la base commune) : seule la page change, et aucun mot ne
 * bouge. Deux corrections :
 *   - l'apostrophe droite du clavier devient typographique (la police du
 *     système la dessine droite, et ça se voit dans les grands titres) ;
 *   - l'espace devant : ; ? ! » et après « devient insécable, pour que le
 *     signe ne tombe pas seul en début de ligne. Elle garde la même largeur.
 *
 * ⚠️ Les avis des familles n'y passent pas : ils s'affichent tels qu'ils ont
 *    été signés, et les deux sites doivent montrer exactement les mêmes.
 */
export function typo(texte: string): string {
  return texte
    .replace(/(\p{L})'(?=\p{L})/gu, '$1’')
    .replace(/ ([:;?!»])/g, ' $1')
    .replace(/« /g, '« ');
}

/** Applique typo() à tous les textes d'un contenu, tableaux et sous-objets compris. */
export function typoProfonde<T>(valeur: T): T {
  if (typeof valeur === 'string') return typo(valeur) as T;
  if (Array.isArray(valeur)) return valeur.map((v) => typoProfonde(v)) as T;
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, typoProfonde(v)])) as T;
  }
  return valeur;
}
