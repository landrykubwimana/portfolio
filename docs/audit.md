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

### 4. Une section « services offerts » — ✅ fait le 16 août 2026

Trois cartes — **Tutorat**, **Conception de site web**, **Science des données** — dans un nouveau composant [`Services.astro`](../src/components/Services.astro), placé juste après le hero. Le contenu vit dans `profile.ts` (`services`) ; les cartes reprennent exactement l'habillage de celles des projets, pour que la page garde un seul vocabulaire visuel.

Les décisions prises avec Landry, pour qu'on n'ait pas à les rejouer :

- **Emplacement** : première section de la page, avant Tutorat. L'annonce, puis le développement.
- **Le tutorat qui figurait deux fois** : la carte l'annonce et un lien « Voir le détail » descend vers la bande Tutorat, qui garde le catalogue et les témoignages. La répétition devient un chemin.
- **Pas d'icône ni de mots-clés sur les cartes** : Compétences, juste en dessous, porte déjà des dizaines de pastilles.
- **Seule la carte tutorat porte un lien.** Les deux autres sont du texte.
- **Intitulé** : « Collaborer » au-dessus de « Services offerts ». Le petit mot de la section Tutorat passe de « Services de tutorat » à **« Tutorat »** — sinon on lisait deux fois le mot « services » à deux centimètres d'écart.
- **Menu du haut et pastilles du hero** reçoivent une entrée « Services » en tête, dans l'ordre des sections.
- **Aucune promesse commerciale** dans la carte « site web » (ni coût, ni possession du contenu, ni automatisme) : Landry ne veut pas s'engager avant de connaître la demande.

⚠️ **L'icône de la pastille « Services »** (une mallette) est de mon invention, comme l'icône de repli du catalogue — les autres viennent du jeu existant. À valider à l'œil, et à refaire si elle jure.

### 5. Deux projets à ajouter — ✅ fait le 16 août 2026, une carte à compléter

Devenus **trois cartes**, en tête de la section Projets, dans cet ordre : **Ce portfolio**, **Écosystème automatisé pour Portfolio, CV et LinkedIn**, **Site de l'Académie d'Excellence Eurêka**.

Pourquoi trois et non deux : Landry a aussi bâti un système qui alimente CV, portfolio, LinkedIn et lettre de présentation depuis une source unique. Il ne fait pas *tourner* le portfolio — le portfolio en est une des quatre destinations — donc le glisser dans la carte du portfolio aurait rangé le grand dans le petit. Il a sa carte.

L'introduction de la section a été réécrite : elle annonçait « science des données, analytique et recherche », ce qui excluait les sites web et l'automatisation.

**Les liens des cartes.** Le portfolio est le premier projet à porter un vrai bouton : « Code » vers `github.com/landrykubwimana/portfolio` (dépôt public). Pas de bouton « Démo » — le visiteur est déjà sur le site. Le dépôt d'aeeureka est privé, donc pas de bouton « Code » de ce côté.

Le bouton « Démo » d'aeeureka reste éteint, mais **pour une autre raison qu'au début de la session** : le mur « site en préparation » est tombé, et c'est Landry qui a décidé de ne pas lier vers la vitrine tant qu'elle n'est ouverte que pour ses essais. Voir la note du bouton « Visiter le site de l'Académie », plus bas.

**Les deux automatisations d'aeeureka** ont rejoint sa carte le 16 août 2026, d'après les descriptions fournies par Landry : l'import des séances depuis le calendrier Apple, et la sauvegarde quotidienne avec son alerte qui sonne d'elle-même quand plus rien ne tourne.

⚠️ **Ce que j'ai volontairement laissé de côté dans cette description**, et qui reste à trancher. Les documents de Landry détaillent des mécanismes d'un système en service qui porte des **données d'élèves mineurs** : la porte d'API à jeton et ce qu'elle interdit, le nombre de tables, l'endroit où vivent les sauvegardes, la région d'hébergement, les politiques d'accès. Rien de tout cela n'est un secret au sens strict, mais mis bout à bout sur une page publique, ça décrit une surface d'attaque plutôt qu'un savoir-faire. La carte s'en tient donc aux principes de conception — « la machine prépare, l'humain confirme », « un filet mort ne produit aucun signal d'échec ». À élargir si Landry le souhaite, en connaissance de cause.

**Le dépôt de l'écosystème** : public ou privé ? Si public, coller son adresse dans `repo` allume le bouton « Code » tout seul. Un `TODO` le rappelle dans `profile.ts`.

---

## Relevé en chemin (session du 10 août 2026)

### Avis

- **Le cas « 1re année ».** La base ne stocke que le rang (« 4 ») et le portfolio écrit `4e année`. Pour une première année, le français veut « 1re année » — mon code écrirait « 1e année ». Vérifier ce que fait aeeureka avant qu'un avis concerné arrive. Voir `libelleNiveauDetail()` dans [`src/lib/avis.ts`](../src/lib/avis.ts).
- **Le libellé « Lire la lettre complète ».** Il parle de lettre alors que la règle d'affichage, elle, ne dépend pas du type d'avis. Les trois avis actuels sont des lettres, donc rien ne se voit. Le jour où un avis d'un autre type aura un texte complet, les deux sites diront « lettre » à tort.
- **Les libellés du lien de l'auteur** (`LIEN_CARTE`) sont recopiés d'aeeureka. Rien n'empêche techniquement une divergence — voir le point 1 ci-dessus.

### Catalogue (ajouté le 10 août 2026)

- **« Programmation : Programmation — Python, Programmation — R… »** — les noms de cours répètent le nom de leur matière. La règle du cours homonyme ne les attrape pas, puisque les noms ne sont pas identiques. ⚠️ Question à trancher pour LES DEUX SITES : garder tel quel, ou renommer ces cours dans Supabase (« Python », « R », « SQL »). Ne pas raccourcir côté portfolio seulement — ce serait une divergence.
- **L'icône de repli** (un simple cercle) est de mon invention : le serveur d'aeeureka était arrêté quand je l'ai écrite, je n'ai pas vu la sienne. À aligner. Les sept icônes de matières, elles, sont copiées à l'identique.
- ~~Le libellé du bloc.~~ Réglé : le portfolio titre « Matières et cours couverts », comme aeeureka.

### Contenu partagé avec aeeureka

- **Les mêmes avis sur deux sites.** Google y voit du contenu dupliqué. Ça ne pénalise pas, mais c'est la raison pour laquelle le portfolio n'en montre que trois avec un « Voir plus », et non la collection entière.
- **Un lien « voir tous les avis » est devenu possible.** Je croyais la liste d'aeeureka cachée derrière son mur ; elle ne l'est pas, `aeeureka.com/avis` l'affiche publiquement sous le formulaire. Le bouton « Laisser un avis » y mène déjà, mais on pourrait l'assumer plus clairement.
- **Le récit d'introduction ressemble au « Notre histoire » d'aeeureka.** La version retenue s'en éloigne (formulations propres au portfolio), mais les étapes sont les mêmes. À relire d'un site à l'autre si l'un des deux textes évolue.

### Site

- **Les taches floues du hero débordent horizontalement** de 60 à 80 px selon la largeur d'écran (`.blob-1`, `.blob-2`). C'est masqué par `overflow-x: hidden` sur le `body`, donc invisible — mais cette propriété a des effets de bord connus (elle peut casser `position: sticky`). Antérieur à ce travail ; à assainir un jour en contenant les taches plutôt qu'en rognant la page.
- **`site: 'https://example.com'`** dans [`astro.config.mjs`](../astro.config.mjs) : c'est encore le domaine d'exemple. Il sert aux adresses absolues et aux aperçus de partage. À remplacer par l'adresse réelle.
- **Le bouton « Visiter le site de l'Académie »** reste retiré. Le 16 août 2026, `aeeureka.com` répondait par une vitrine complète (formats de cours, catalogue par niveau, parcours en trois étapes) et non plus par le mur « site en préparation » — mais Landry a précisé que le site n'est ouvert que **le temps de ses essais**. ⚠️ **Ne pas en conclure que la vitrine est lancée** : tant qu'il ne l'a pas dit, aucun lien du portfolio ne pointe vers elle, ni ici ni sur la carte de projet. L'adresse dort dans `profile.ts` (`tutoring.url`).
- **`hero-test.html`** à la racine : fichier de travail d'une session passée, resté là. À supprimer s'il ne sert plus.
- ~~Les projets n'ont ni lien de dépôt ni démo.~~ Réglé en partie le 16 août 2026 : la carte du portfolio porte un bouton « Code ». Les autres cartes gardent `repo` et `demo` vides — les travaux de recherche et de stage n'ont pas de dépôt public.

### Relevé en chemin (session du 16 août 2026)

- **`npm run build` ne vérifie pas les types.** Le champ `catalogueNote` était écrit deux fois dans `profile.ts` — dans la description de structure et dans le contenu — et le site se construisait quand même sans un mot. Le doublon a été supprimé le 16 août. L'outil qui l'aurait signalé (`astro check`) n'est pas installé dans le projet ; l'ajouter est une décision de Landry, elle touche aux dépendances.
- **La hauteur de la première rangée de projets, réglée en deux temps.** Elle est montée à 608 px (contre 358 px pour la rangée suivante) parce que la grille aligne les cartes sur la plus haute. Raccourcir la seule description de l'écosystème n'a rendu que 24 px : celle d'aeeureka avait grossi en accueillant ses automatisations et commandait à son tour. Les deux ramenées autour de 82 mots, la rangée est descendue à 488 px, puis remontée à **512 px** quand la carte d'aeeureka a repris deux mots. Règle à retenir pour la suite : dans cette grille, c'est toujours la carte la plus bavarde qui décide, donc on la raccourcit elle, pas ses voisines — et quelques mots ajoutés à la mauvaise carte se paient en dizaines de pixels sur toute la rangée.
- **Le menu du haut n'existe pas sur téléphone** (`.nav-links` est en `display: none` sous une certaine largeur, et il n'y a pas de menu de remplacement). L'entrée « Services » ajoutée au menu n'y change rien, mais ça veut dire qu'un visiteur sur téléphone n'a que les pastilles du hero pour naviguer. Antérieur à ce travail.
- **Un serveur de développement tournait déjà sur le port 4321** pendant la session ; j'ai regardé la page rendue par celui-là plutôt que d'en lancer un second. Le panneau navigateur composait des images périmées : les vérifications ont été faites par mesure dans la page, pas à l'œil. **Le rendu visuel reste à valider par Landry.**

### Vercel

- **Variables `NEXT_PUBLIC_…` résiduelles** dans le projet portfolio, s'il en reste : elles n'y servent à rien et brouillent la lecture. Seules `SUPABASE_URL` et `SUPABASE_ANON_KEY` comptent ici. Ne pas toucher à celles du projet aeeureka.

### Mémoire et documentation — correction reportée à la demande de Landry

⚠️ **La mémoire de Claude sur le portfolio est périmée et contredit ce qui a été construit.** Elle affirme deux choses fausses depuis le 10 août 2026 :

> le tutorat doit être **dé-marqué** — pas de nom d'agence, un lien vers un formulaire à la place

> ⚠️ le filigrane εὕρηκα s'appuie sur le nom Eurêka, ce qui entre en conflit avec le dé-marquage de la section tutorat — le retenir ou le remplacer à cet endroit

La section porte désormais le nom complet de l'Académie, le filigrane grec, le catalogue et les témoignages — l'inverse, décidé par Landry. **Une prochaine session lirait cette note et proposerait de défaire le travail.** À corriger dans `portfolio-astro-vercel.md`. Y ajouter aussi que le portfolio lit la base Supabase commune, ce que la note ignore complètement.

**Deux consignes ne sont écrites nulle part** — ni en mémoire, ni dans ce dépôt :

- **La Loi 25.** Ce qui autorise l'affichage des avis est la formulation du consentement signé : « publié publiquement, notamment sur le site de l'Académie et sur les pages qui la présentent ». C'est elle qui couvre le portfolio. ⚠️ Ne pas l'élargir : aucune reprise des avis ailleurs — réseaux sociaux, publicité — sans un nouveau consentement. À écrire dans le README, à côté des règles de lecture.
- **La limite sur les clés.** Landry saisit lui-même l'URL et la clé anon, et lance lui-même toute commande qui touche à la base ou aux clés. À mettre en mémoire.
