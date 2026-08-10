# Portfolio

Site portfolio personnel, construit avec [Astro](https://astro.build). Rapide, possédé, déployé gratuitement sur Vercel.

Tout est statique, **sauf la page d'accueil**, qui est fabriquée à la demande pour afficher les avis de l'Académie d'Excellence Eurêka toujours à jour — voir [Les avis de l'Académie](#les-avis-de-lacadémie).

## Prérequis

- [Node.js](https://nodejs.org) 20.6+ (la commande `npm run verifier-avis` a besoin de cette version)
- npm (fourni avec Node)

## Démarrer

```bash
npm install       # installe les dépendances (une seule fois)
npm run dev       # lance le serveur de dev → http://localhost:4321
```

Autres commandes :

```bash
npm run build           # construit le site
npm run verifier-avis   # affiche les avis que le site voit dans la base
```

## Modifier le contenu

**Tout le contenu du site vit dans un seul fichier :** [`src/data/profile.ts`](src/data/profile.ts).

Nom, titre, tagline, projets, expériences, formations, tutorat, liens sociaux : tu édites ce fichier, puis tu `git push`. La structure (les `interface`) est pensée pour une future migration vers une base de données si le portfolio devient multi-utilisateur.

## Structure

```
src/
├── data/profile.ts        # ← LE contenu (source unique de vérité)
├── lib/supabase.ts        # LA connexion à la base (un seul endroit)
├── lib/avis.ts            # lecture des avis + libellés des cartes
├── lib/catalogue.ts       # lecture de l'offre par niveau
├── styles/global.css      # système de design (couleurs, typo, composants)
├── layouts/Base.astro     # coquille HTML, polices, métadonnées SEO
├── components/             # sections de la page
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Tutoring.astro     # section « services » + les deux liens Eurêka
│   ├── Catalogue.astro    # l'offre par niveau, lue dans la base
│   ├── IconeMatiere.astro # les icônes de matières (mêmes qu'aeeureka)
│   ├── Avis.astro         # les témoignages, lus dans la base
│   ├── Projects.astro
│   ├── Skills.astro
│   ├── Parcours.astro     # expérience + formation
│   ├── Maxime.astro       # la citation avant le pied de page
│   └── Footer.astro
└── pages/index.astro      # assemble les sections
scripts/verifier-avis.mjs       # diagnostic : les avis lus dans la base
scripts/verifier-catalogue.mjs  # diagnostic : l'offre par niveau
public/favicon.svg              # favicon (monogramme LK)
```

## L'offre de tutorat

Les matières et les cours affichés dans la section Tutorat viennent de la **même base que [aeeureka.com](https://aeeureka.com)** — rien n'est écrit en dur. Ajouter une matière sur aeeureka la fait apparaître ici en moins d'une minute.

Les règles d'affichage sont celles d'aeeureka, reproduites à l'identique et documentées dans [`src/lib/catalogue.ts`](src/lib/catalogue.ts). Les deux qui comptent :

1. Une matière est offerte à un niveau **si `matieres_niveaux` le dit** — jamais parce qu'un cours existe à ce niveau. Le primaire a trois matières et aucun cours.
2. Un cours qui **porte le nom de sa matière est masqué** (« Chimie › Chimie » n'apprend rien). Le cours reste en base et reste sélectionnable dans les formulaires : c'est un choix d'affichage. Sans cette règle, les deux sites montreraient des listes différentes.

Vérifier ce que le site voit :

```bash
npm run verifier-catalogue
```

## Les avis de l'Académie

Les avis affichés dans la section Tutorat viennent de la **base Supabase commune avec [aeeureka.com](https://aeeureka.com)**. Les deux sites montrent donc exactement les mêmes, dans le même ordre.

**Le portfolio ne fait que lire.** Il n'écrit rien et ne modère rien : la modération se passe dans l'espace admin d'aeeureka.

**Comment la synchronisation tient.** La page d'accueil n'est pas figée au déploiement : elle est fabriquée à la demande, puis réutilisée pendant **60 secondes** (réglage `isr` dans `astro.config.mjs`). Publier un avis sur aeeureka le fait donc apparaître ici en moins d'une minute, sans redéployer.

**Les deux variables à poser** (voir [`.env.example`](.env.example)) :

| Variable | Où |
|---|---|
| `SUPABASE_URL` | `.env` en local · Vercel → Settings → Environment Variables |
| `SUPABASE_ANON_KEY` | idem |

> ⚠️ `SUPABASE_ANON_KEY` est la clé **anon**, publique par conception. La clé `service_role` ne doit jamais entrer dans ce dépôt : elle ignore toute la sécurité de la base.

Si les variables manquent, le site s'affiche quand même — seule la section des avis reste vide, avec un avertissement dans les journaux.

**Vérifier ce que le site voit** :

```bash
npm run verifier-avis
```

**Deux règles à ne pas casser** — elles sont expliquées en détail dans [`src/lib/avis.ts`](src/lib/avis.ts) :

1. Ne jamais filtrer sur `date_approbation` dans le code. C'est la base qui décide ce qui est public ; un filtre écrit ici masquerait une règle de sécurité cassée au lieu de la révéler.
2. Les libellés des cartes (`LIEN_CARTE`) doivent rester identiques à ceux d'aeeureka. Si tu en changes un ici, change-le aussi là-bas.

## Documentation

Points en attente et questions ouvertes : [`docs/audit.md`](docs/audit.md).

Pour la méthodologie, l'architecture et le workflow complet, voir [`docs/methodologie-et-workflow.md`](docs/methodologie-et-workflow.md).

## Polices

Auto-hébergées via `@fontsource-variable` (Space Grotesk + Inter) — aucune requête vers un CDN externe.

## À faire (placeholders)

Cherche les commentaires `TODO` dans `src/data/profile.ts` (et le domaine dans `astro.config.mjs`) pour remplacer le contenu de démonstration par le tien.
