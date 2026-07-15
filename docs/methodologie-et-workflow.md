# Méthodologie & Workflow

Ce document explique **comment ce portfolio a été pensé et construit**, et **comment travailler au quotidien** dessus. Il sert de référence pour comprendre les choix techniques et le cycle de développement.

---

## 1. Objectif

Un **site portfolio personnel** : parcours académique et professionnel, projets et compétences. Objectifs de conception : un site **rapide, possédé, à faible maintenance**, et **déployé en continu**.

---

## 2. Méthodologie

Les principes qui ont guidé la conception :

1. **Décision avant construction.** Avant d'écrire du code, on a comparé les approches possibles : un outil **no-code** (type *Webflow*) versus du **code auto-hébergé** avec *Astro*. Critères décisifs : contrôle et possession du contenu, coût récurrent, performance, et le fait que le site lui-même serve de démonstration technique. → Choix du **code**.

2. **Design d'abord.** On a validé une **direction visuelle** (la section « hero ») avant de bâtir tout le site, pour ne pas construire sur une base incertaine.

3. **Le contenu est une donnée, pas du HTML.** Tout le contenu vit dans **un seul fichier typé** ([`src/data/profile.ts`](../src/data/profile.ts)). Les composants ne font que *l'afficher*. Modifier le site = éditer ce fichier, jamais le HTML.

4. **Itératif et vérifié.** On construit section par section, on vérifie le rendu au fur et à mesure, et on déploie tôt.

---

## 3. Stack technique

| Brique | Choix | Pourquoi |
|--------|-------|----------|
| Framework | **Astro** (génération statique) | Rapide, léger, idéal pour un site de contenu |
| Langage | **TypeScript** | Contenu structuré et typé |
| Styles | **CSS** avec *design tokens* | Système de design cohérent, sans dépendance lourde |
| Polices | **@fontsource** (Space Grotesk + Inter) | **Auto-hébergées** — aucune requête vers un CDN externe |
| Versioning | **Git + GitHub** | Historique, sauvegarde |
| Hébergement | **Vercel** | Build + mise en ligne automatiques à chaque push |

---

## 4. Architecture

```
src/
├── data/profile.ts        # ← LE contenu (source unique de vérité)
├── styles/global.css      # système de design (tokens, composants)
├── layouts/Base.astro     # coquille HTML, polices, métadonnées SEO
├── components/             # sections de la page
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Projects.astro
│   ├── Skills.astro
│   ├── Parcours.astro     # expérience + formation
│   ├── Tutoring.astro     # section « services » / appel à l'action
│   └── Footer.astro
└── pages/index.astro      # assemble les sections
public/favicon.svg
docs/                      # cette documentation
```

**Flux du contenu** — une seule source alimente toute la page :

```mermaid
flowchart TD
    P["src/data/profile.ts<br/>(contenu structuré)"] --> C1[Hero]
    P --> C2[Projects]
    P --> C3[Skills]
    P --> C4[Parcours]
    P --> C5[Tutoring]
    P --> C6[Footer]
    C1 --> PG[pages/index.astro]
    C2 --> PG
    C3 --> PG
    C4 --> PG
    C5 --> PG
    C6 --> PG
    PG --> L[layouts/Base.astro]
    L --> OUT["Site statique (dist/)"]
```

**Conséquence pratique :** pour changer un texte, un projet, une compétence, on édite **uniquement `profile.ts`**.

---

## 5. Workflow de développement

### Prérequis
- [Node.js](https://nodejs.org) 18.20+ (ou 20+ / 22+) et npm.

### En local
```bash
npm install       # une seule fois
npm run dev       # serveur de dev → http://localhost:4321
```

### Modifier le contenu
Éditer [`src/data/profile.ts`](../src/data/profile.ts). Le serveur de dev recharge automatiquement.

### Publier
```bash
git add -A
git commit -m "Décris ton changement"
git push origin main
```

### Mise en ligne (automatique)
Vercel est connecté au dépôt GitHub : **chaque `push` sur `main` déclenche un build et une mise en ligne**, sans aucune action manuelle.

```mermaid
flowchart LR
    A["Éditer profile.ts"] --> B["git commit"]
    B --> C["git push origin main"]
    C --> D["Vercel détecte le push"]
    D --> E["Build (astro build)"]
    E --> F["🌐 Site en ligne mis à jour (~1 min)"]
```

---

## 6. Déploiement

- **Dépôt** : GitHub — [`github.com/landrykubwimana/portfolio`](https://github.com/landrykubwimana/portfolio)
- **Hébergeur** : Vercel, relié au dépôt (intégration continue).
- **URL de production** : `https://landry-kubwimana-portfolio.vercel.app`
- **Domaine personnalisé** : optionnel, à brancher plus tard. Un domaine (ex. `landrykubwimana.com`) ne *remplace* pas l'hébergeur — il *pointe* vers lui. On peut l'ajouter à tout moment sans rien changer au site.

---

## 7. Améliorations possibles

- Ajouter une **photo de profil** (remplace le placeholder du hero).
- Ajouter les **liens de dépôts** sur les cartes de projets.
- Brancher un **domaine personnalisé**.

---

## 8. Conventions

- **Contenu = données.** Pas de contenu en dur dans le HTML ; tout passe par `profile.ts`.
- **Commits descriptifs.** Un message clair par changement.
- **Rien de sensible dans Git.** Les secrets ne sont jamais versionnés.
