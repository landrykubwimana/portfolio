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

export const tagline: string = "Scientifique de données au Centre de recherche du CHUM (CRCHUM), mathématicien de formation et titulaire d'une maîtrise en science des données et analytique d'affaires (HEC Montréal), je conçois des modèles de prédiction et des pipelines qui appuient des décisions concrètes. Passé par les services financiers et l'assurance, j'ai appris à traduire un besoin d'affaires en question analytique et à rendre le résultat utilisable par ceux qui doivent s'en servir. En parallèle, je dirige une agence de tutorat (Académie d'Excellence Eurêka) où j'accompagne des étudiants en mathématiques et en sciences, ce qui entretient ma capacité à rendre accessibles des concepts complexes.";

export const experience: ExperienceItem[] = [
  {
    period: "2026 — Aujourd'hui",
    role: "Scientifique de données",
    org: "Centre de recherche du CHUM (CRCHUM)",
    description: "Analyses statistiques pour les directions du CHUM, extraction par requêtes SQL et pipelines ETL, modèles de prédiction des admissions et des congés développés en Python (analyse de survie, modèles longitudinaux, séries chronologiques) et tableaux de bord Power BI ; automatisation de processus et recours à l'IA générative (Microsoft Copilot) ; animation de formations sur la culture des données.",
  },
  {
    period: "2020 — Aujourd'hui",
    role: "Fondateur & directeur",
    org: "Académie d'Excellence Eurêka",
    description: "Direction de mon agence de tutorat : aide aux devoirs en maths et sciences, coordination et assignation des demandes aux tuteurs, gestion des finances et des salaires.",
  },
  {
    period: "2026",
    role: "Adjoint administratif",
    org: "Club de Soccer Mont-Royal Outremont (CS MRO)",
    description: "Service à la clientèle de première ligne (téléphone, courriels, accueil) et soutien à l'équipe administrative ; conception et maintenance d'une base de données (inscriptions, paiements, masse salariale) et automatisation de processus — avec l'appui de l'IA générative (Google Gemini) — pour réduire les tâches manuelles et gagner en efficacité.",
  },
  {
    period: "2025",
    role: "Stagiaire analyste de données",
    org: "iA Groupe financier",
    description: "Approche de householding en Python par regroupement probabiliste et clustering ; nettoyage et transformation de jeux de données complexes ; communication des résultats aux parties prenantes.",
  },
  {
    period: "2025",
    role: "Stagiaire en science des données",
    org: "HEC Montréal",
    description: "Analyse spatiale de la sécurité des piétons aux intersections signalisées de Montréal : modèles linéaires généralisés sur données de comptage, régressions spatiales et pipeline analytique complet en R.",
  },
  {
    period: "2024 — 2025",
    role: "Analyste de la logistique scolaire",
    org: "Solutions Informatiques Dash (Dash)",
    description: "Optimisation sous contraintes des horaires-maîtres d'écoles secondaires ; analyse des besoins, validation de données scolaires et soutien technique aux directions.",
  },
  {
    period: "2023 — 2024",
    role: "Agent en assurance de dommages",
    org: "Desjardins",
    description: "Analyse des besoins en assurance auto et habitation, soumissions complètes et vulgarisation de notions techniques auprès d'un public non spécialiste, en français et en anglais.",
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
    label: "Langages & outils",
    items: ["Python", "R", "SQL (PostgreSQL, Oracle)", "C", "LaTeX", "Git (GitHub, GitLab)"],
  },
  {
    label: "Données, décisionnel & cloud",
    items: ["Power BI (DAX, Power Query)", "Microsoft Fabric", "Azure Databricks (PySpark)", "SAS", "DBeaver", "AWS", "Azure DevOps", "Microsoft 365", "Google Workspace", "Spordle"],
  },
  {
    label: "Calcul scientifique & optimisation",
    items: ["MATLAB", "Mathematica", "IBM ILOG CPLEX"],
  },
  {
    label: "IA générative & automatisation",
    items: ["Microsoft Copilot", "Google Gemini", "Claude", "ChatGPT", "Power Automate"],
  },
  {
    label: "Domaines",
    items: ["Santé et systèmes hospitaliers", "Assurance de dommages", "Services financiers", "Éducation"],
  },
  {
    label: "Langues",
    items: ["Français", "Anglais"],
  },
];
