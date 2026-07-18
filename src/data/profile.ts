/**
 * PROFIL — source unique de vérité du contenu du portfolio.
 *
 * 👉 Pour modifier ton site, tu édites CE fichier (puis `git push`).
 * Les types ci-dessous décrivent la "forme" de ton profil : c'est cette même
 * structure qu'on réutilisera le jour où le portfolio deviendra multi-utilisateur
 * (chaque champ deviendra une colonne / un champ en base de données).
 *
 * Contenu renseigné à partir de ton CV et de ta lettre de présentation.
 * Ce qui reste marqué « TODO » est à compléter par toi.
 */

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  /** Email public affiché sur le site (peut différer de ton email personnel). */
  email?: string;
}

export interface Project {
  title: string;
  description: string;
  /** Ex. ["Python", "Data", "Astro"] */
  tags: string[];
  /** Lien vers le dépôt GitHub public (optionnel). */
  repo?: string;
  /** Lien vers une démo en ligne (optionnel). */
  demo?: string;
}

export interface ExperienceItem {
  /** Ex. "2024 — Aujourd'hui" */
  period: string;
  role: string;
  org: string;
  description: string;
}

export interface EducationItem {
  /** Ex. "2022 — 2025" */
  period: string;
  credential: string;
  school: string;
  description?: string;
}

export interface Tutoring {
  headline: string;
  description: string;
  /** Ex. ["Mathématiques", "Informatique", "Physique"] */
  subjects: string[];
  /** Lien vers le futur site de tutorat (Site B). Placeholder pour l'instant. */
  url: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Profile {
  name: string;
  /** Initiales pour le logo / la carte portrait. */
  initials: string;
  role: string;
  tagline: string;
  location: string;
  /** Affiche (ou non) la pastille « disponible pour du tutorat ». */
  available: boolean;
  availableLabel: string;
  social: SocialLinks;
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  tutoring: Tutoring;
}

export const profile: Profile = {
  name: 'Landry Kubwimana',
  initials: 'LK',
  role: 'Scientifique de données, M.Sc. | Tuteur',
  tagline:
    "Titulaire d'une maîtrise en science des données et analytique d'affaires (HEC Montréal) et d'un baccalauréat en mathématiques, j'occupe actuellement un poste de scientifique de données au Centre de Recherche du CHUM (CRCHUM). Je combine une base quantitative solide à une véritable expérience en communication et en vulgarisation. Cette double force – technique et relationnelle – me permet de traduire des besoins d'affaires en analyses claires et utiles. En parallèle, je dirige une agence de tutorat où j'accompagne des étudiants en mathématiques et en sciences, ce qui entretient ma capacité à rendre accessibles des concepts complexes.",
  location: 'Montréal, QC',
  available: true,
  availableLabel: 'Disponible pour du tutorat',

  social: {
    github: 'https://github.com/landrykubwimana',
    linkedin: 'https://www.linkedin.com/in/landry-kubwimana-8354b41a1/',
    // Email public affiché sur le site. (Tu peux mettre un email dédié pour limiter le spam.)
    email: 'landrykub@icloud.com',
  },

  // Projets tirés de ton parcours (recherche / stages). Ajoute un `repo` GitHub si tu en publies un.
  projects: [
    {
      title: 'Sécurité des piétons — analyse spatiale',
      description:
        "Projet de fin de maîtrise (HEC) : analyse géospatiale des accidents impliquant des piétons aux intersections signalisées de Montréal (GLM, régressions et corrélations spatiales) pour prioriser les zones à risque et formuler des recommandations ciblées.",
      tags: ['Python', 'Analyse spatiale', 'Machine Learning'],
      repo: '',
      demo: '',
    },
    {
      title: 'Householding par clustering probabiliste',
      description:
        "Chez iA Groupe financier : regroupement des membres d'un même ménage à partir de données complexes (méthodes probabilistes et clustering) et détection d'événements de vie, pour appuyer la décision d'affaires.",
      tags: ['Clustering', 'Statistique', 'Data'],
      repo: '',
      demo: '',
    },
    {
      title: 'Mesure de performance de portefeuille',
      description:
        "Bourse d'excellence de recherche CRSNG (HEC) : implémentation d'une return-based style analysis et résolution d'un problème d'optimisation par backward recursion, codé en Python.",
      tags: ['Python', 'Finance quantitative', 'Optimisation'],
      repo: '',
      demo: '',
    },
  ],

  // Expériences les plus pertinentes (curées depuis le CV). Ajoute/enlève librement.
  experience: [
    {
      period: "2026 — Aujourd'hui",
      role: 'Scientifique de données',
      org: 'Centre de Recherche du CHUM (CRCHUM)',
      description:
        'Analyses statistiques pour les directions du CHUM, pipelines ETL, modèles de prédiction et tableaux de bord Power BI ; animation de formations sur la culture des données.',
    },
    {
      period: "2020 — Aujourd'hui",
      role: 'Fondateur & directeur',
      org: "Académie d'Excellence Eurêka",
      description:
        'Direction de mon agence de tutorat : aide aux devoirs en maths et sciences, coordination et assignation des demandes aux tuteurs, gestion des finances et des salaires.',
    },
    {
      period: '2025',
      role: 'Stagiaire analyste de données',
      org: 'iA Groupe financier (Industrielle Alliance)',
      description:
        "Approche de householding par regroupement probabiliste et clustering ; nettoyage et transformation de jeux de données complexes ; communication des résultats aux parties prenantes.",
    },
    {
      period: '2025',
      role: 'Stagiaire en science des données',
      org: 'HEC Montréal',
      description:
        'Analyse spatiale de la sécurité des piétons aux intersections de Montréal ; modélisation prédictive et visualisation géospatiale (GLM, régressions spatiales).',
    },
    {
      period: '2024',
      role: 'Analyste de la logistique scolaire',
      org: 'Solutions Informatiques Dash',
      description:
        "Conception et optimisation des horaires-maîtres d'écoles secondaires sous contraintes académiques ; validation de données scolaires et support technique aux directions.",
    },
  ],

  education: [
    {
      period: '2025',
      credential: "M. Sc. Science des données et analytique d'affaires",
      school: 'HEC Montréal',
      description:
        "Complété également une année de maîtrise en ingénierie financière (marchés, produits dérivés, gestion du risque).",
    },
    {
      period: '2021',
      credential: 'Baccalauréat en mathématiques',
      school: 'Université de Montréal',
    },
    {
      period: '2017',
      credential: 'DEC en sciences pures et appliquées',
      school: 'Collège de Maisonneuve',
    },
  ],

  // Compétences tirées du CV, regroupées par catégorie.
  skills: [
    {
      label: 'Langages & programmation',
      items: ['Python', 'R', 'SQL', 'C', 'MATLAB', 'Mathematica', 'LaTeX'],
    },
    {
      label: 'Données, BI & modélisation',
      items: ['Power BI', 'Microsoft Fabric', 'SAS', 'IBM ILOG CPLEX'],
    },
    {
      label: 'Cloud & DevOps',
      items: ['AWS', 'Azure DevOps'],
    },
    {
      label: 'Web & bureautique',
      items: ['HTML', 'WordPress', 'Suite Microsoft Office'],
    },
    {
      label: 'Langues',
      items: ['Français', 'Anglais'],
    },
  ],

  tutoring: {
    headline: "Académie d'Excellence Eurêka",
    description:
      "L'agence de tutorat que je fonde et dirige. Aide aux devoirs, mise à niveau et préparation aux examens en mathématiques et en sciences — un accompagnement personnalisé, adapté au rythme de chaque élève.",
    subjects: ['Mathématiques', 'Sciences', 'Préparation aux examens', 'Soutien scolaire'],
    // Site de tutorat Eurêka (Site B — à construire). Domaine déjà réservé.
    url: 'https://aeeureka.com',
  },
};
