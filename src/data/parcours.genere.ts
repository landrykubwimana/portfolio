// ─────────────────────────────────────────────────────────────────────
// FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN
//
// Source      : Professionnel/Carriere/profil.json
// Produit par : generateurs/vers-portfolio.mjs
//
// Toute modification faite ici sera perdue à la prochaine génération.
// Pour changer ce contenu, édite profil.json (ou passe par l'atelier).
//
// Ce que ce fichier NE contient PAS, et ne contiendra jamais : les services,
// les projets, le bloc tutoring, la maxime. Ils vivent dans profile.ts, écrit
// à la main, parce qu'ils appartiennent au site et non au parcours.
// ─────────────────────────────────────────────────────────────────────

import type { ExperienceItem, EducationItem, SkillGroup } from './profile';

export const tagline: string = "Titulaire d'une maîtrise en science des données et analytique d'affaires (HEC Montréal) et d'un baccalauréat en mathématiques, j'occupe actuellement un poste de scientifique de données au Centre de Recherche du CHUM (CRCHUM). Je combine une base quantitative solide à une véritable expérience en service à la clientèle, en communication et en vulgarisation. Cette double force – technique et relationnelle – me permet de traduire des besoins d'affaires en analyses claires et utiles. En parallèle, je dirige une agence de tutorat (Académie d'Excellence Eurêka) où j'accompagne des étudiants en mathématiques et en sciences, ce qui entretient ma capacité à rendre accessibles des concepts complexes.";

export const experience: ExperienceItem[] = [
  {
    period: "2026 — Aujourd'hui",
    role: "Scientifique de données",
    org: "Centre de Recherche du CHUM (CRCHUM)",
    description: "Analyses statistiques pour les directions du CHUM, pipelines ETL, modèles de prédiction et tableaux de bord Power BI ; automatisation de processus et recours à l'IA générative (Microsoft Copilot) ; animation de formations sur la culture des données.",
  },
  {
    period: "2020 — Aujourd'hui",
    role: "Fondateur & directeur",
    org: "Académie d'Excellence Eurêka",
    description: "Direction de mon agence de tutorat : aide aux devoirs en maths et sciences, coordination et assignation des demandes aux tuteurs, gestion des finances et des salaires.",
  },
  {
    period: "2026 — Aujourd'hui",
    role: "Adjoint administratif",
    org: "Club de Soccer Mont-Royal Outremont (CS MRO)",
    description: "Service à la clientèle de première ligne (téléphone, courriels, accueil) et soutien à l'équipe administrative ; conception et maintenance d'une base de données (inscriptions, paiements, masse salariale) et automatisation de processus — avec l'appui de l'IA générative (Google Gemini) — pour réduire les tâches manuelles et gagner en efficacité.",
  },
  {
    period: "2025",
    role: "Stagiaire analyste de données",
    org: "iA Groupe financier",
    description: "Approche de householding par regroupement probabiliste et clustering ; nettoyage et transformation de jeux de données complexes ; communication des résultats aux parties prenantes.",
  },
  {
    period: "2025",
    role: "Stagiaire en science des données",
    org: "HEC Montréal",
    description: "Analyse spatiale de la sécurité des piétons aux intersections de Montréal ; modélisation prédictive et visualisation géospatiale (GLM, régressions spatiales).",
  },
  {
    period: "2024",
    role: "Analyste de la logistique scolaire",
    org: "Solutions Informatiques Dash (Dash)",
    description: "Conception et optimisation des horaires-maîtres d'écoles secondaires sous contraintes académiques ; validation de données scolaires et support technique aux directions.",
  },
];

export const education: EducationItem[] = [
  {
    period: "2025",
    credential: "M. Sc. Science des données et analytique d'affaires",
    school: "HEC Montréal",
    description: "Complété également une année de maîtrise en ingénierie financière (marchés, produits dérivés, gestion du risque).",
  },
  {
    period: "2021",
    credential: "Baccalauréat en mathématiques",
    school: "Université de Montréal",
  },
  {
    period: "2017",
    credential: "DEC en sciences pures et appliquées",
    school: "Collège de Maisonneuve",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Langages & programmation",
    items: ["Python (pandas, NumPy, scikit-learn)", "R", "SQL", "C", "MATLAB", "Mathematica", "LaTeX"],
  },
  {
    label: "Méthodes & modélisation",
    items: ["Apprentissage automatique", "Modélisation prédictive", "Statistiques appliquées", "GLM", "Clustering", "Analyse spatiale", "Pipelines ETL"],
  },
  {
    label: "IA générative & automatisation",
    items: ["IA générative", "Automatisation de processus", "Microsoft Copilot", "Google Gemini", "Claude"],
  },
  {
    label: "Données, BI & modélisation",
    items: ["Power BI", "Microsoft Fabric", "SAS", "IBM ILOG CPLEX"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Azure DevOps", "GitHub", "GitLab"],
  },
  {
    label: "Web & bureautique",
    items: ["HTML", "WordPress", "Microsoft 365", "Google Workspace"],
  },
  {
    label: "Langues",
    items: ["Français", "Anglais"],
  },
];
