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

/**
 * Le PARCOURS n’est pas écrit ici : accroche, expériences, formations et
 * compétences viennent de Professionnel/Carriere/profil.json, la source
 * commune au CV, à la lettre de présentation et à LinkedIn.
 *
 * Pour les modifier : éditer profil.json, puis `npm run generer:portfolio`
 * depuis le dépôt Carriere. Éditer parcours.genere.ts à la main ne sert à
 * rien — le fichier est réécrit à chaque génération.
 */
import { tagline, experience, education, skills } from "./parcours.genere";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  /** Email public affiché sur le site (peut différer de ton email personnel). */
  email?: string;
}

export interface Service {
  title: string;
  description: string;
  /**
   * Lien optionnel au bas de la carte. Les deux champs vont ensemble : sans
   * l'un des deux, aucun lien ne s'affiche.
   */
  linkLabel?: string;
  linkHref?: string;
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
  /** Un élément par paragraphe. */
  description: string[];
  /**
   * Les matières et les cours ne sont PAS écrits ici : ils sont lus dans la
   * base commune avec aeeureka, pour que les deux sites disent la même chose.
   * Voir src/lib/catalogue.ts.
   */
  /** Site de l'Académie (la vitrine). Voir le commentaire plus bas. */
  url: string;
  /** Formulaire de demande de tutorat, hébergé sur le site de l'Académie. */
  demandeUrl: string;
  /** Formulaire pour laisser un avis, hébergé sur le site de l'Académie. */
  avisUrl: string;
  /** Phrase discrète sous les deux boutons. */
  ctaNote: string;
  /** Titre du bloc de l'offre. Doit rester celui d'aeeureka. */
  catalogueTitle: string;
  /** Mention discrète sous la liste des niveaux. */
  catalogueNote: string;
  /** Sous-titre du bloc d'avis. */
  avisTitle: string;
  /** Phrase d'introduction sous ce sous-titre. */
  avisIntro: string;
  /** Le nom en grec ancien, posé en filigrane dans le coin de la bande. */
  greekName: string;
}

export interface Maxim {
  /** La citation, sans guillemets : ils sont ajoutés à l'affichage. */
  text: string;
  author: string;
  /** Petite ligne sous l'auteur. Vide ('') pour n'afficher que le nom. */
  source: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Profile {
  name: string;
  /** Initiales pour le logo / la carte portrait. */
  initials: string;
  /**
   * Chemin de la photo de profil affichée dans le hero.
   * Le fichier vit dans public/ (ex. '/photo.jpg' → public/photo.jpg).
   * Laisser vide ('') pour retomber sur les initiales.
   */
  photo?: string;
  role: string;
  tagline: string;
  location: string;
  /** Affiche (ou non) la pastille « disponible pour du tutorat ». */
  available: boolean;
  availableLabel: string;
  social: SocialLinks;
  services: Service[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  tutoring: Tutoring;
  maxim: Maxim;
}

export const profile: Profile = {
  name: 'Landry Kubwimana',
  initials: 'LK',
  photo: '/photo.jpg', // vide ('') → repli sur les initiales « LK »
  role: 'Scientifique de données, M.Sc. | Tuteur',
  tagline,
  location: 'Montréal, QC',
  available: true,
  availableLabel: 'Disponible pour du tutorat',

  social: {
    github: 'https://github.com/landrykubwimana',
    linkedin: 'https://www.linkedin.com/in/landry-kubwimana-8354b41a1/',
    // Email public affiché sur le site. (Tu peux mettre un email dédié pour limiter le spam.)
    email: 'landrykub@icloud.com',
  },

  // Les trois services offerts, annoncés juste sous le hero. Le tutorat est
  // le seul à porter un lien : sa section détaillée est plus bas dans la page.
  services: [
    {
      title: 'Tutorat',
      description:
        "Accompagnement en mathématiques et en sciences, du primaire à l'université, à travers l'Académie d'Excellence Eurêka. Les matières, les cours et les niveaux couverts sont détaillés plus bas.",
      linkLabel: 'Voir le détail',
      linkHref: '#tutorat',
    },
    {
      title: 'Conception de site web',
      description:
        "Conception, développement et mise en ligne de sites web. Ce portfolio et le site de l'Académie d'Excellence Eurêka en sont deux exemples, présentés dans la section Projets.",
    },
    {
      title: 'Science des données',
      description:
        "Analyse statistique, modélisation prédictive, tableaux de bord et automatisation de processus, du nettoyage des données jusqu'à la présentation des résultats.",
    },
  ],

  // Projets tirés de ton parcours (recherche / stages). Ajoute un `repo` GitHub si tu en publies un.
  projects: [
    {
      title: 'Ce portfolio',
      description:
        "Le site que vous regardez. Bâti avec Astro et TypeScript, avec tout le contenu réuni dans un seul fichier structuré. Sa page d'accueil est refabriquée à la demande pour afficher les avis de l'Académie, lus dans une base de données commune aux deux sites, et le site se remet en ligne tout seul à chaque modification déposée.",
      tags: ['Astro', 'TypeScript', 'Supabase', 'Vercel'],
      repo: 'https://github.com/landrykubwimana/portfolio',
      // Pas de bouton « Démo » : le visiteur est déjà sur le site.
      demo: '',
    },
    {
      title: 'Écosystème automatisé pour Portfolio, CV et LinkedIn',
      description:
        "Le même contenu professionnel vivait à quatre endroits — CV LaTeX sur Overleaf, ce portfolio, LinkedIn, lettre de présentation — et les versions avaient déjà divergé. Un fichier de données unique est devenu la référence : chaque expérience sait sur quelles destinations elle doit paraître, et trois générateurs en tirent du LaTeX, du TypeScript et du Markdown. LinkedIn n'ouvrant pas ses modifications de profil aux particuliers, le système y produit la liste de ce qui a changé, champ par champ, à recopier.",
      tags: ['TypeScript', 'LaTeX', 'Automatisation'],
      // TODO Landry : dépôt public ? Si oui, coller son adresse ici pour
      // allumer le bouton « Code ».
      repo: '',
      demo: '',
    },
    {
      title: "Site de l'Académie d'Excellence Eurêka",
      description:
        "Le site de mon agence de tutorat : formulaire de demande, avis des familles, catalogue des cours par niveau, et un espace d'administration pour les élèves, les séances et la facturation. Ses avis et son catalogue de cours sont aussi synchronisés vers ce portfolio. Deux automatisations l'entourent : chaque soir, les séances du calendrier deviennent des séances à confirmer — la machine prépare, l'humain confirme ; et une sauvegarde quotidienne dont l'alerte est bâtie pour sonner d'elle-même le jour où plus rien ne tourne.",
      tags: ['Next.js', 'Supabase', 'Automatisation'],
      // Dépôt privé : pas de bouton « Code ».
      repo: '',
      // Pas de bouton « Démo » tant que la vitrine est derrière son mur
      // « site en préparation ». Voir tutoring.url plus bas.
      demo: '',
    },
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
    {
      title: 'Approche unificatrice des équations différentielles et aux différences',
      description:
        "Bourse d'excellence de recherche du CRSNG (1er cycle, Université de Montréal) : stage de recherche dirigé par un professeur du Département de mathématiques et de statistique, visant à développer le potentiel pour une carrière en recherche en sciences naturelles et en génie. Étude d'une approche unificatrice des théories des équations différentielles et des équations aux différences.",
      tags: ['Mathématiques', 'Recherche', 'Équations différentielles'],
      repo: '',
      demo: '',
    },
  ],

  // Parcours : généré depuis Carriere/profil.json — voir l’import en tête de fichier.
  experience,
  education,
  skills,

  tutoring: {
    headline: "Académie d'Excellence Eurêka",
    // Un élément = un paragraphe. Ce qu'on offre concrètement n'est plus
    // décrit ici : le bloc « Matières et cours couverts », juste en dessous,
    // le dit en détail et à jour.
    description: [
      'Mon histoire avec le tutorat commence tôt, avec mes petits frères et sœurs : c’est vers moi qu’ils se tournent quand quelque chose ne rentre pas. Je me découvre alors une nouvelle passion. En quatrième secondaire, ce réflexe de grand frère devient un métier : je deviens tuteur pour mon école.',
      'Suivent des années à enseigner et à me perfectionner, dans plusieurs agences. Puis vient la pandémie : derrière les écrans, des élèves seuls devant leurs difficultés, presque sans accompagnement. Naît alors l’envie de faire autrement — ne pas seulement rattraper des notes, mais transmettre une façon de penser. C’est de là qu’est venue l’Académie d’Excellence Eurêka.',
    ],
    // Site de l'Académie. La vitrine est encore derrière un mur « site en
    // préparation » : aucun bouton ne pointe ici pour l'instant, pour ne pas
    // envoyer les visiteurs dans une impasse. Le jour où elle ouvrira, il
    // suffira de rajouter un bouton vers cette adresse dans Tutoring.astro.
    url: 'https://aeeureka.com',

    // ⚠️ NE PAS RETIRER le « ?src=portfolio » de ces deux adresses.
    //    Le site de l'Académie lit ce paramètre et l'enregistre : c'est lui
    //    qui dit d'où viennent les demandes et les avis.
    demandeUrl: 'https://aeeureka.com/demande?src=portfolio',
    avisUrl: 'https://aeeureka.com/avis?src=portfolio',

    ctaNote: 'Les demandes et les avis sont traités sur le site de l’Académie.',

    catalogueTitle: 'Matières et cours couverts',
    catalogueNote:
      'Si le cours que vous cherchez n’est pas dans la liste, n’hésitez pas à me contacter pour que j’évalue votre besoin.',

    avisTitle: 'Témoignages',
    avisIntro:
      'Avis recueillis auprès des familles et des élèves que j’ai accompagnés, publiés avec leur consentement.',

    // « Eurêka » en grec ancien : « j'ai trouvé ». Le même mot, au même
    // endroit, que sur la page « À propos » d'aeeureka.
    greekName: 'εὕρηκα',
  },

  maxim: {
    text: 'Les nombres gouvernent le monde.',
    author: 'Pythagore',
    // ⚠️ Pythagore n'a rien écrit : la maxime vient de ses successeurs
    // (Aristote rapporte que les pythagoriciens tenaient le nombre pour la
    // substance de toute chose). Cette ligne le dit sans détour.
    // La vider ('') pour n'afficher que le nom.
    source: 'maxime transmise par la tradition pythagoricienne',
  },
};
