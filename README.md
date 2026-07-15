# Portfolio

Site portfolio personnel, construit avec [Astro](https://astro.build). Site statique, rapide, possédé, et déployable gratuitement (Vercel / Netlify / Cloudflare Pages).

## Prérequis

- [Node.js](https://nodejs.org) 18.20+ (ou 20+ / 22+)
- npm (fourni avec Node)

## Démarrer

```bash
npm install       # installe les dépendances (une seule fois)
npm run dev       # lance le serveur de dev → http://localhost:4321
```

Autres commandes :

```bash
npm run build     # génère le site statique dans dist/
npm run preview   # prévisualise le build de production
```

## Modifier le contenu

**Tout le contenu du site vit dans un seul fichier :** [`src/data/profile.ts`](src/data/profile.ts).

Nom, titre, tagline, projets, expériences, formations, tutorat, liens sociaux : tu édites ce fichier, puis tu `git push`. La structure (les `interface`) est pensée pour une future migration vers une base de données si le portfolio devient multi-utilisateur.

## Structure

```
src/
├── data/profile.ts        # ← LE contenu (source unique de vérité)
├── styles/global.css      # système de design (couleurs, typo, composants)
├── layouts/Base.astro     # coquille HTML, polices, métadonnées SEO
├── components/             # sections de la page
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Projects.astro
│   ├── Parcours.astro     # expérience + formation
│   ├── Tutoring.astro     # section « services » / appel à l'action
│   └── Footer.astro
└── pages/index.astro      # assemble les sections
public/favicon.svg         # favicon (monogramme LK)
```

## Documentation

Pour la méthodologie, l'architecture et le workflow complet, voir [`docs/methodologie-et-workflow.md`](docs/methodologie-et-workflow.md).

## Polices

Auto-hébergées via `@fontsource-variable` (Space Grotesk + Inter) — aucune requête vers un CDN externe.

## À faire (placeholders)

Cherche les commentaires `TODO` dans `src/data/profile.ts` (et le domaine dans `astro.config.mjs`) pour remplacer le contenu de démonstration par le tien.
