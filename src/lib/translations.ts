export type Language = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      portfolio: "Portfolio",
    },
    home: {
      hero: {
        name: "Guillaume TRAPET",
        role: "Développeur Full-Stack",
        description:
          "Passionné par la création d'expériences digitales innovantes et performantes. Spécialisé dans les technologies modernes et l'architecture logicielle.",
      },
      about: {
        title: "À PROPOS",
        text1:
          "Développeur full-stack spécialisé dans la création d'applications métier performantes. J'aide les entreprises à digitaliser leurs processus en construisant des solutions sur mesure, maintenables et évolutives.",
        text2:
          "Expertise technique : écosystème JavaScript (Vue.js, React, Svelte, Next.js), PHP/Laravel, architecture de bases de données (MySQL, PostgreSQL). Polyvalence sur Java et C# selon les besoins projets.",
      },
      skills: {
        title: "COMPÉTENCES",
        items: [
          {
            category: "Frontend",
            skills: [
              "Vue.js",
              "React",
              "Next.js",
              "Svelte",
              "TypeScript",
              "HTML5/CSS3 (Tailwind, SCSS)",
            ],
          },
          {
            category: "Backend",
            skills: ["Node.js", "PHP (Laravel)", "MySQL", "PostgreSQL"],
          },
          {
            category: "Soft Skills",
            skills: [
              "Résolution de problèmes",
              "Adaptabilité",
              "Travail d’équipe",
            ],
          },
        ],
      },
      experiences: {
        title: "EXPÉRIENCES",
        items: [
          {
            title: "Développeur web",
            company: "Infofil",
            description:
              "Développement d'applications web sur mesure principalement en Vue.js avec Laravel, mais également React avec Next.js.",
            date: "2022 - en cours",
            tags: ["Vue", "Laravel", "React", "Next.js", "PHP", "MySQL"],
          },
        ],
      },
      projects: {
        title: "PROJETS",
        items: [
          {
            title: "Plateforme CSE",
            description:
              "Application full-stack pour la gestion d’un Comité Social et Économique : dashboard, stocks et commandes. Développée avec Vue.js et Laravel.",
            tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "CRM & E-commerce",
            description:
              "Gestion des clients, commandes et statistiques. Module e-commerce intégré. Stack : Vue.js, Laravel et MySQL.",
            tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "Gestion des temps",
            description:
              "Suivi des heures, projets et congés. Développée avec Svelte et Laravel pour une gestion RH simplifiée.",
            tags: ["Svelte", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "Learning App - Japonais",
            description:
              "Application d’apprentissage du japonais avec flashcards et suivi de progression. Stack : React, Next.js et PostgreSQL.",
            tags: ["React", "NestJS", "Next.js", "PostgreSQL", "TypeScript"],
            github: "https://github.com/Fulcrum1/Learning-app",
          },
        ],
      },
      contact: {
        title: "CONTACT",
        text: "Intéressé par une collaboration ? N'hésitez pas à me contacter !",
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        resume: "CV",
      },
      footer: {
        rights: "Tous droits réservés",
        built: "Built with Next.js & TailwindCSS",
      },
    },

    /* ──────────────────────────────── */
    /*         PORTFOLIO COMPLET        */
    /* ──────────────────────────────── */

    portfolio: {
      experiences: [
        {
          period: "2022 - en cours",
          company: "Infofil - Genlis",
          role: "CDI - Développeur Fullstack",
          description:
            "Développement d’applications web métier sur mesure, en autonomie comme en équipe, pour améliorer et digitaliser les processus internes des entreprises clientes.",
          tech: [
            "Vue.js",
            "Laravel",
            "React",
            "Next.js",
            "Svelte",
            "MySQL",
            "PostgreSQL",
          ],
          tasks: [
            "Analyse fonctionnelle : recueil des besoins, rédaction de spécifications, propositions techniques.",
            "Développement de fonctionnalités avancées : modules de gestion, dashboards, API REST, automatisations.",
            "Participation à l’architecture logicielle : optimisation, modularisation, bonnes pratiques backend & frontend.",
            "Mise en production : configuration serveurs, déploiements, monitoring, correctifs rapides.",
            "Méthodologie agile : itérations courtes, communication client, adaptation continue.",
            "Sécurisation et optimisation des performances.",
            "Réalisations clés :",
          ],
          projects: [
            "Plateforme CSE : gestion complète des stocks, commandes, avantages salariés, export et tableau de bord interactif.",
            "Outil complet RH : gestion du temps, congés, validations, statistiques PDF et suivi multi-services.",
            "Création et maintenance de modules CRM : clients, commandes, facturation, reporting.",
          ],
        },

        {
          period: "Avril - Juin 2021",
          company: "Sidel Packing Solution - Corcelles-lès-Cîteaux",
          role: "Stagiaire Développeur",
          description:
            "Immersion en environnement industriel international pour moderniser un composant logiciel clé.",
          mission:
            "Migration d’une bibliothèque PHP obsolète vers une alternative moderne, avec garantie de compatibilité.",
          skills: [
            "Analyse comparative technique : documentation, tests et benchmark.",
            "Mise en place d’un environnement de tests automatisés pour sécuriser la migration.",
            "Documentation technique et communication régulière avec l’équipe.",
            "Présentation de la solution et transfert de connaissances.",
          ],
        },

        {
          period: "Juin - Août 2018 à 2022",
          company: "Côte-d'Or",
          role: "Saisonnier",
          description:
            "Travail saisonnier dans la vigne (taille, ébourgeonnage, levage…) dans les domaines Digioia Royer et Mugneret Gibourg. Développement d'une forte endurance, discipline et travail en équipe.",
        },
      ],

      projects: [
        {
          title: "Plateforme CSE",
          description:
            "Application full-stack dédiée à la gestion d’un Comité Social et Économique : tableau de bord, gestion des stocks, commandes et avantages salariés. Développée avec Vue.js et Laravel.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
          github: "",
        },
        {
          title: "CRM & E-commerce",
          description:
            "Solution complète de gestion clients, commandes, catalogue produits et statistiques, intégrant un module e-commerce. Stack : Vue.js, Laravel et MySQL.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
          github: "",
        },
        {
          title: "Gestion des temps",
          description:
            "Application RH pour le suivi des heures, projets et congés : saisie, validation, reporting. Développée avec Svelte et Laravel.",
          tags: ["Svelte", "Laravel", "PHP", "MySQL"],
          github: "",
        },
        {
          title: "Learning App - Japonais",
          description:
            "Application d’apprentissage du japonais avec système de flashcards et suivi de progression personnalisé. Développée en React, Next.js et PostgreSQL.",
          tags: ["React", "NestJS", "Next.js", "PostgreSQL", "TypeScript"],
          github: "https://github.com/Fulcrum1/Learning-app",
        },
      ],

      skills: [
        {
          category: "Frontend",
          skills: ["Vue.js", "React", "Svelte", "Next.js", "TypeScript"],
        },
        {
          category: "Backend",
          skills: ["Laravel", "PHP", "NestJS", "Node.js"],
        },
        {
          category: "Base de données",
          skills: ["MySQL", "PostgreSQL"],
        },
        {
          category: "DevOps",
          skills: ["Git", "GitHub", "Docker"],
        },
      ],

      formations: [
        {
          period: "2019 - 2022",
          diploma: "DUT Informatique (Bac+2)",
          school: "Université de Dijon",
          location: "Dijon",
          details: [
            "Formation orientée développement logiciel, systèmes, réseaux et bases de données.",
            "Pratique intensive : architecture logicielle, programmation avancée, tests, cybersécurité.",
            "Projet tutoré en équipe selon une méthode agile.",
          ],
        },
        {
          period: "2017 - 2019",
          diploma: "Baccalauréat STI2D – Systèmes d’Information et Numérique",
          school: "Lycée Eiffel",
          location: "Dijon",
          details: [
            "Bases solides en technologie, électronique, développement et modélisation.",
            "Travail en équipe sur projets technologiques.",
          ],
        },
      ],
    },
  },
  en: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      portfolio: "Portfolio",
    },
    home: {
      hero: {
        name: "Guillaume TRAPET",
        role: "Développeur Full-Stack",
        description:
          "Passionné par la création d'expériences digitales innovantes et performantes. Spécialisé dans les technologies modernes et l'architecture logicielle.",
      },
      about: {
        title: "À PROPOS",
        text1:
          "Développeur full-stack spécialisé dans la création d'applications métier performantes. J'aide les entreprises à digitaliser leurs processus en construisant des solutions sur mesure, maintenables et évolutives.",
        text2:
          "Expertise technique : écosystème JavaScript (Vue.js, React, Svelte, Next.js), PHP/Laravel, architecture de bases de données (MySQL, PostgreSQL). Polyvalence sur Java et C# selon les besoins projets.",
      },
      skills: {
        title: "COMPÉTENCES",
        items: [
          {
            category: "Frontend",
            skills: [
              "Vue.js",
              "React",
              "Next.js",
              "Svelte",
              "TypeScript",
              "HTML5/CSS3 (Tailwind, SCSS)",
            ],
          },
          {
            category: "Backend",
            skills: ["Node.js", "PHP (Laravel)", "MySQL", "PostgreSQL"],
          },
          {
            category: "Soft Skills",
            skills: [
              "Résolution de problèmes",
              "Adaptabilité",
              "Travail d’équipe",
            ],
          },
        ],
      },
      experiences: {
        title: "EXPÉRIENCES",
        items: [
          {
            title: "Développeur web",
            company: "Infofil",
            description:
              "Développement d'applications web sur mesure principalement en Vue.js avec Laravel, mais également React avec Next.js.",
            date: "2022 - en cours",
            tags: ["Vue", "Laravel", "React", "Next.js", "PHP", "MySQL"],
          },
        ],
      },
      projects: {
        title: "PROJETS",
        items: [
          {
            title: "Plateforme CSE",
            description:
              "Application full-stack pour la gestion d’un Comité Social et Économique : dashboard, stocks et commandes. Développée avec Vue.js et Laravel.",
            tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "CRM & E-commerce",
            description:
              "Gestion des clients, commandes et statistiques. Module e-commerce intégré. Stack : Vue.js, Laravel et MySQL.",
            tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "Gestion des temps",
            description:
              "Suivi des heures, projets et congés. Développée avec Svelte et Laravel pour une gestion RH simplifiée.",
            tags: ["Svelte", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "Learning App - Japonais",
            description:
              "Application d’apprentissage du japonais avec flashcards et suivi de progression. Stack : React, Next.js et PostgreSQL.",
            tags: ["React", "NestJS", "Next.js", "PostgreSQL", "TypeScript"],
            github: "https://github.com/Fulcrum1/Learning-app",
          },
        ],
      },
      contact: {
        title: "CONTACT",
        text: "Intéressé par une collaboration ? N'hésitez pas à me contacter !",
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        resume: "CV",
      },
      footer: {
        rights: "Tous droits réservés",
        built: "Built with Next.js & TailwindCSS",
      },
    },

    /* ──────────────────────────────── */
    /*         PORTFOLIO COMPLET        */
    /* ──────────────────────────────── */

    portfolio: {
      experiences: [
        {
          period: "2022 - en cours",
          company: "Infofil - Genlis",
          role: "CDI - Développeur Fullstack",
          description:
            "Développement d’applications web métier sur mesure, en autonomie comme en équipe, pour améliorer et digitaliser les processus internes des entreprises clientes.",
          tech: [
            "Vue.js",
            "Laravel",
            "React",
            "Next.js",
            "Svelte",
            "MySQL",
            "PostgreSQL",
          ],
          tasks: [
            "Analyse fonctionnelle : recueil des besoins, rédaction de spécifications, propositions techniques.",
            "Développement de fonctionnalités avancées : modules de gestion, dashboards, API REST, automatisations.",
            "Participation à l’architecture logicielle : optimisation, modularisation, bonnes pratiques backend & frontend.",
            "Mise en production : configuration serveurs, déploiements, monitoring, correctifs rapides.",
            "Méthodologie agile : itérations courtes, communication client, adaptation continue.",
            "Sécurisation et optimisation des performances.",
            "Réalisations clés :",
          ],
          projects: [
            "Plateforme CSE : gestion complète des stocks, commandes, avantages salariés, export et tableau de bord interactif.",
            "Outil complet RH : gestion du temps, congés, validations, statistiques PDF et suivi multi-services.",
            "Création et maintenance de modules CRM : clients, commandes, facturation, reporting.",
          ],
        },

        {
          period: "Avril - Juin 2021",
          company: "Sidel Packing Solution - Corcelles-lès-Cîteaux",
          role: "Stagiaire Développeur",
          description:
            "Immersion en environnement industriel international pour moderniser un composant logiciel clé.",
          mission:
            "Migration d’une bibliothèque PHP obsolète vers une alternative moderne, avec garantie de compatibilité.",
          skills: [
            "Analyse comparative technique : documentation, tests et benchmark.",
            "Mise en place d’un environnement de tests automatisés pour sécuriser la migration.",
            "Documentation technique et communication régulière avec l’équipe.",
            "Présentation de la solution et transfert de connaissances.",
          ],
        },

        {
          period: "Juin - Août 2018 à 2022",
          company: "Côte-d'Or",
          role: "Saisonnier",
          description:
            "Travail saisonnier dans la vigne (taille, ébourgeonnage, levage…) dans les domaines Digioia Royer et Mugneret Gibourg. Développement d'une forte endurance, discipline et travail en équipe.",
        },
      ],

      projects: [
        {
          title: "Plateforme CSE",
          description:
            "Application full-stack dédiée à la gestion d’un Comité Social et Économique : tableau de bord, gestion des stocks, commandes et avantages salariés. Développée avec Vue.js et Laravel.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
          github: "",
        },
        {
          title: "CRM & E-commerce",
          description:
            "Solution complète de gestion clients, commandes, catalogue produits et statistiques, intégrant un module e-commerce. Stack : Vue.js, Laravel et MySQL.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
          github: "",
        },
        {
          title: "Gestion des temps",
          description:
            "Application RH pour le suivi des heures, projets et congés : saisie, validation, reporting. Développée avec Svelte et Laravel.",
          tags: ["Svelte", "Laravel", "PHP", "MySQL"],
          github: "",
        },
        {
          title: "Learning App - Japonais",
          description:
            "Application d’apprentissage du japonais avec système de flashcards et suivi de progression personnalisé. Développée en React, Next.js et PostgreSQL.",
          tags: ["React", "NestJS", "Next.js", "PostgreSQL", "TypeScript"],
          github: "https://github.com/Fulcrum1/Learning-app",
        },
      ],

      skills: [
        {
          category: "Frontend",
          skills: ["Vue.js", "React", "Svelte", "Next.js", "TypeScript"],
        },
        {
          category: "Backend",
          skills: ["Laravel", "PHP", "NestJS", "Node.js"],
        },
        {
          category: "Base de données",
          skills: ["MySQL", "PostgreSQL"],
        },
        {
          category: "DevOps",
          skills: ["Git", "GitHub", "Docker"],
        },
      ],

      formations: [
        {
          period: "2019 - 2022",
          diploma: "DUT Informatique (Bac+2)",
          school: "Université de Dijon",
          location: "Dijon",
          details: [
            "Formation orientée développement logiciel, systèmes, réseaux et bases de données.",
            "Pratique intensive : architecture logicielle, programmation avancée, tests, cybersécurité.",
            "Projet tutoré en équipe selon une méthode agile.",
          ],
        },
        {
          period: "2017 - 2019",
          diploma: "Baccalauréat STI2D – Systèmes d’Information et Numérique",
          school: "Lycée Eiffel",
          location: "Dijon",
          details: [
            "Bases solides en technologie, électronique, développement et modélisation.",
            "Travail en équipe sur projets technologiques.",
          ],
        },
      ],
    },
  },
} as const;
