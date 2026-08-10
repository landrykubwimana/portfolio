# Audit — points à revoir

Carnet des points relevés en chemin, à traiter lors d'une revue complète du site.
Rien ici n'est urgent : c'est de la finition et des questions ouvertes.

Ouvert le 10 août 2026.

---

## Demandé par Landry

### 1. Donner un accès direct aux fichiers d'aeeureka
**Pourquoi.** Aujourd'hui, les règles d'affichage des avis sont recopiées à la main d'un site à l'autre (libellés, ordre, formats). Elles concordent, mais rien ne l'impose : une modification d'un côté peut passer inaperçue de l'autre.
**Pistes.** Lire directement le dépôt aeeureka pendant la session pour comparer plutôt que déduire ; ou déplacer ce qui doit rester commun (libellés des cartes) dans la base, lue par les deux sites.
**Tension à trancher.** La règle actuelle est « une session = un dépôt », qui protège d'une modification accidentelle du mauvais projet. Un accès en lecture seule ne la casse pas ; un accès en écriture, si.

### 2. Revoir la nomenclature de la section témoignages
**Pourquoi.** Les deux sites ne l'appellent pas pareil : aeeureka dit « Ce que disent les familles », le portfolio dit « Témoignages ». Les intros diffèrent aussi.
**À décider.** Harmoniser, ou assumer deux formulations pour deux publics. Dans les deux cas ce doit être un choix, pas un reste.

### 3. Ajouter une touche de l'univers grec au portfolio — ✅ fait le 10 août 2026
Quatre gestes, repris du traitement de la page « À propos » d'aeeureka :
- **εὕρηκα** en filigrane dans le coin supérieur droit de la bande tutorat (`tutoring.greekName` dans `profile.ts`).
- **Le méandre grec**, motif de 12 × 15 px répété, juste avant la maxime (`.meandre`) — copié tel quel d'aeeureka, couleur comprise.
- **La couronne de laurier** au-dessus de la citation (SVG en clair dans `Maxime.astro`).
- **Une maxime** juste avant le pied de page : « Les nombres gouvernent le monde », Pythagore (`maxim` dans `profile.ts`).

Le texte grec et la maxime utilisent `--font-serif`, la serif du système — la même pile que sur aeeureka, sans police à télécharger.

**Resté ouvert.** L'intensité du filigrane (`.tutoring-grec`, opacité 0,2) et celle du halo violet (`.tutoring::after`) ont été réglées à l'estime : le halo a été repoussé vers le coin et adouci pour que le mot ne s'y noie pas. À revoir à l'œil sur plusieurs écrans.

⚠️ **Attribution.** Pythagore n'a rien écrit ; la maxime vient de ses successeurs. C'est pourquoi une ligne de source l'accompagne (« maxime transmise par la tradition pythagoricienne »), sur le modèle du « rapporté par Pappus d'Alexandrie » d'aeeureka. Vider `maxim.source` pour n'afficher que le nom.

---

## Relevé en chemin (session du 10 août 2026)

### Avis

- **Le cas « 1re année ».** La base ne stocke que le rang (« 4 ») et le portfolio écrit `4e année`. Pour une première année, le français veut « 1re année » — mon code écrirait « 1e année ». Vérifier ce que fait aeeureka avant qu'un avis concerné arrive. Voir `libelleNiveauDetail()` dans [`src/lib/avis.ts`](../src/lib/avis.ts).
- **Le libellé « Lire la lettre complète ».** Il parle de lettre alors que la règle d'affichage, elle, ne dépend pas du type d'avis. Les trois avis actuels sont des lettres, donc rien ne se voit. Le jour où un avis d'un autre type aura un texte complet, les deux sites diront « lettre » à tort.
- **Les libellés du lien de l'auteur** (`LIEN_CARTE`) sont recopiés d'aeeureka. Rien n'empêche techniquement une divergence — voir le point 1 ci-dessus.

### Site

- **`site: 'https://example.com'`** dans [`astro.config.mjs`](../astro.config.mjs) : c'est encore le domaine d'exemple. Il sert aux adresses absolues et aux aperçus de partage. À remplacer par l'adresse réelle.
- **Le bouton « Visiter le site de l'Académie »** a été retiré tant que la vitrine d'aeeureka est derrière son mur. À remettre quand elle ouvrira ; l'adresse est déjà dans `profile.ts` (`tutoring.url`).
- **`hero-test.html`** à la racine : fichier de travail d'une session passée, resté là. À supprimer s'il ne sert plus.
- **Les projets n'ont ni lien de dépôt ni démo** (`repo` et `demo` vides dans `profile.ts`). Les boutons n'apparaissent donc jamais sur les cartes.

### Vercel

- **Variables `NEXT_PUBLIC_…` résiduelles** dans le projet portfolio, s'il en reste : elles n'y servent à rien et brouillent la lecture. Seules `SUPABASE_URL` et `SUPABASE_ANON_KEY` comptent ici. Ne pas toucher à celles du projet aeeureka.
