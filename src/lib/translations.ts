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
    portfolio: {
      experiences: [
        {
          period: "2022 - en cours",
          company: "Infofil - Genlis",
          role: "CDI - Développeur Fullstack",
          description:
            "Développement d’applications web métier sur mesure, en autonomie comme en équipe, pour améliorer et digitaliser les processus internes des entreprises clientes.",
          tasks: {
            label: "Tâches",
            items: [
              "Analyse fonctionnelle : recueil des besoins, rédaction de spécifications, propositions techniques.",
              "Développement de fonctionnalités avancées : modules de gestion, dashboards, API REST, automatisations.",
              "Participation à l’architecture logicielle : optimisation, modularisation, bonnes pratiques backend & frontend.",
              "Mise en production : configuration serveurs, déploiements, monitoring, correctifs rapides.",
              "Méthodologie agile : itérations courtes, communication client, adaptation continue.",
              "Sécurisation et optimisation des performances.",
            ],
          },
        },

        {
          period: "Avril - Juin 2021",
          company: "Sidel Packing Solution - Corcelles-lès-Cîteaux",
          role: "Stagiaire Développeur",
          description:
            "Immersion en environnement industriel international pour moderniser un composant logiciel clé.",
          mission:
            "Migration d’une bibliothèque PHP obsolète vers une alternative moderne, avec garantie de compatibilité.",
          skills: {
            label: "Compétences obtenues",
            items: [
              "Analyse comparative technique : documentation, tests et benchmark.",
              "Mise en place d’un environnement de tests automatisés pour sécuriser la migration.",
              "Documentation technique et communication régulière avec l’équipe.",
              "Présentation de la solution et transfert de connaissances.",
            ],
          },
        },

        {
          period: "June - August 2018 to 2022",
          company: "Côte-d'Or",
          role: "Seasonal Worker",
          description:
            "Travail saisonnier dans plusieurs domaines viticoles (taille, ébourgeonnage, relevage, etc.).",
          skills: {
            label: "Compétences obtenues",
            items: [
              "Ce travail physiquement exigeant m’a appris la discipline, la précision et le maintien d’un haut niveau de qualité sur la durée — des compétences directement transférables au développement logiciel orienté qualité.",
            ],
          },
        },
      ],

      projects: [
        {
          title: "Plateforme CSE",
          description:
            "Application full-stack dédiée à la gestion d’un Comité Social et Économique : tableau de bord, gestion des stocks, commandes et avantages salariés. Développée avec Vue.js et Laravel.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
          type: "Professionnel",
          github: "",
        },
        {
          title: "CRM & E-commerce",
          description:
            "Solution complète de gestion clients, commandes, catalogue produits et statistiques, intégrant un module e-commerce. Stack : Vue.js, Laravel et MySQL.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
          type: "Professionnel",
          github: "",
        },
        {
          title: "Gestion des temps",
          description:
            "Application RH pour le suivi des heures, projets et congés : saisie, validation, reporting. Développée avec Svelte et Laravel.",
          tags: ["Svelte", "Laravel", "PHP", "MySQL"],
          type: "Professionnel",
          github: "",
        },
        {
          title: "Learning App - Japonais",
          description:
            "Application d’apprentissage du japonais avec système de flashcards et suivi de progression personnalisé. Développée en React, Next.js et PostgreSQL.",
          tags: ["React", "NestJS", "Next.js", "PostgreSQL", "TypeScript"],
          type: "Personnel",
          github: "https://github.com/Fulcrum1/Learning-app",
        },
        {
          title: "Portfolio",
          description:
            "Portfolio web développé en React, Next.js et Tailwind CSS.",
          tags: ["React", "Next.js", "TypeScript"],
          type: "Personnel",
          github: "https://github.com/Fulcrum1/Portfolio",
        },
      ],

      skills: [
        { label: "Vue.js", url: "vue-js" },
        { label: "React", url: "react" },
        { label: "Svelte", url: "svelte" },
        { label: "Next.js", url: "next-js" },
        { label: "TypeScript", url: "typescript" },
        { label: "Laravel", url: "laravel" },
        { label: "PHP", url: "php" },
        { label: "NestJS", url: "nestjs" },
        { label: "Node.js", url: "node-js" },
        { label: "MySQL", url: "mysql" },
        { label: "PostgreSQL", url: "postgresql" },
        { label: "git", url: "git" },
        { label: "github", url: "github" },
        { label: "docker", url: "docker" },
      ],

      formations: [
        {
          period: "2019 - 2022",
          diploma: "DUT Informatique (Bac+2)",
          school: "Université de Dijon",
          location: "Dijon",
          details: [
            "Formation axée sur le développement logiciel, les systèmes, les réseaux et les bases de données.",
            "Pratique approfondie : architecture logicielle, programmation avancée, tests, cybersécurité et optimisation.",
            "Réalisation d’un projet tutoré en équipe en suivant une méthodologie agile.",
          ],
        },
        {
          period: "2017 - 2019",
          diploma: "Baccalauréat STI2D – Systèmes d’Information et Numérique",
          school: "Lycée Eiffel",
          location: "Dijon",
          details: [
            "Acquisition de bases solides en électronique, technologies numériques, développement et modélisation.",
            "Participation à des projets technologiques collaboratifs favorisant l’autonomie et la créativité.",
          ],
        },
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      portfolio: "Portfolio",
    },
    home: {
      hero: {
        name: "Guillaume TRAPET",
        role: "Full-Stack Developer",
        description:
          "Passionate about creating innovative and high-performance digital experiences. Specialized in modern technologies and software architecture.",
      },
      about: {
        title: "ABOUT",
        text1:
          "Full-stack developer specialized in building high-performance business applications. I help companies digitize their processes by creating custom, maintainable, and scalable solutions.",
        text2:
          "Technical expertise: JavaScript ecosystem (Vue.js, React, Svelte, Next.js), PHP/Laravel, database architecture (MySQL, PostgreSQL). Versatile in Java and C# as needed for projects.",
      },
      skills: {
        title: "SKILLS",
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
            skills: ["Problem-solving", "Adaptability", "Teamwork"],
          },
        ],
      },
      experiences: {
        title: "EXPERIENCES",
        items: [
          {
            title: "Web Developer",
            company: "Infofil",
            description:
              "Development of custom web applications mainly using Vue.js with Laravel, as well as React with Next.js.",
            date: "2022 - Present",
            tags: ["Vue", "Laravel", "React", "Next.js", "PHP", "MySQL"],
          },
        ],
      },
      projects: {
        title: "PROJECTS",
        items: [
          {
            title: "CSE Platform",
            description:
              "Full-stack application for managing a Social and Economic Committee: dashboard, inventory, and orders. Developed with Vue.js and Laravel.",
            tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "CRM & E-commerce",
            description:
              "Customer, order, and statistics management. Integrated e-commerce module. Stack: Vue.js, Laravel, and MySQL.",
            tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "Time Management",
            description:
              "Tracking hours, projects, and leave. Developed with Svelte and Laravel for simplified HR management.",
            tags: ["Svelte", "Laravel", "PHP", "MySQL"],
            github: "",
          },
          {
            title: "Learning App - Japanese",
            description:
              "Japanese learning application with flashcards and progress tracking. Stack: React, Next.js, and PostgreSQL.",
            tags: ["React", "NestJS", "Next.js", "PostgreSQL", "TypeScript"],
            github: "https://github.com/Fulcrum1/Learning-app",
          },
        ],
      },
      contact: {
        title: "CONTACT",
        text: "Interested in collaborating? Feel free to contact me!",
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        resume: "Resume",
      },
      footer: {
        rights: "All rights reserved",
        built: "Built with Next.js & TailwindCSS",
      },
    },
    portfolio: {
      experiences: [
        {
          period: "2022 - Present",
          company: "Infofil - Genlis",
          role: "Permanent - Fullstack Developer",
          description:
            "Design and development of tailored business web applications, independently or within a team, to streamline and digitalize internal processes for client companies.",
          tasks: {
            label: "Tasks",
            items: [
              "Functional analysis: requirements gathering, specification writing, and technical proposals.",
              "Development of advanced features: management modules, dashboards, REST APIs, automation tools.",
              "Software architecture contribution: performance optimization, modular design, backend & frontend best practices.",
              "Production deployment: server setup, deployment pipelines, monitoring, incident response.",
              "Agile methodology: short iterations, client interactions, continuous improvement.",
            ],
          },
        },
        {
          period: "April - June 2021",
          company: "Sidel Packing Solution - Corcelles-lès-Cîteaux",
          role: "Developer Intern",
          description:
            "Immersion in an international industrial environment to modernize a core software component.",
          mission:
            "Migration of an outdated PHP library to a modern and fully compatible alternative.",
          skills: {
            label: "Skills obtained",
            items: [
              "Comparative technical analysis: documentation review, testing, and benchmarking.",
              "Creation of an automated testing environment to secure the migration process.",
              "Technical documentation and regular communication with the engineering team.",
              "Final presentation of the solution and knowledge transfer.",
            ],
          },
        },
        {
          period: "June - August 2018 to 2022",
          company: "Côte-d'Or",
          role: "Seasonal Worker",
          description:
            "Seasonal vineyard work across multiple estates (pruning, bud removal, lifting, etc.). ",
          skills: {
            label: "Skills obtained",
            items: [
              "This physically demanding job developed my discipline, precision, and ability to maintain high standards over long periods—skills directly transferable to quality- focused software development.",
            ],
          },
        },
      ],
      projects: [
        {
          title: "CSE Platform",
          description:
            "Full-stack application dedicated to managing a Social and Economic Committee: dashboard, inventory, orders, and employee benefits. Developed with Vue.js and Laravel.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
          type: "Professional",
          github: "",
        },
        {
          title: "CRM & E-commerce",
          description:
            "Complete solution for customer, order, product catalog, and statistics management, including an e-commerce module. Stack: Vue.js, Laravel, and MySQL.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
          type: "Professional",
          github: "",
        },
        {
          title: "Time Management",
          description:
            "HR application for tracking hours, projects, and leave: entry, validation, reporting. Developed with Svelte and Laravel.",
          tags: ["Svelte", "Laravel", "PHP", "MySQL"],
          type: "Professional",
          github: "",
        },
        {
          title: "Learning App - Japanese",
          description:
            "Japanese learning application with flashcard system and personalized progress tracking. Developed with React, Next.js, and PostgreSQL.",
          tags: ["React", "NestJS", "Next.js", "PostgreSQL", "TypeScript"],
          type: "Personnal",
          link: {
            title: "learning-app.guillaumetrapet.com",
            url: "https://learning-app.guillaumetrapet.com",
          },
          github: "https://github.com/Fulcrum1/Learning-app",
        },
        {
          title: "Portfolio",
          description:
            "Web Portfolio developed with React, Next.js and Tailwind CSS.",
          tags: ["React", "Next.js", "TypeScript"],
          type: "Personnel",
          link: {
            title: "guillaumetrapet.com",
            url: "https://guillaumetrapet.com",
          },
          github: "https://github.com/Fulcrum1/Portfolio",
        },
      ],
      skills: [
        { label: "Vue.js", url: "vue-js" },
        { label: "React", url: "react" },
        { label: "Svelte", url: "svelte" },
        { label: "Next.js", url: "next-js" },
        { label: "TypeScript", url: "typescript" },
        { label: "Laravel", url: "laravel" },
        { label: "PHP", url: "php" },
        { label: "NestJS", url: "nestjs" },
        { label: "Node.js", url: "node-js" },
        { label: "MySQL", url: "mysql" },
        { label: "PostgreSQL", url: "postgresql" },
        { label: "git", url: "git" },
        { label: "github", url: "github" },
        { label: "docker", url: "docker" },
      ],
      formations: [
        {
          period: "2019 - 2022",
          diploma: "Computer Science Degree (2-year technical program)",
          school: "University of Dijon",
          location: "Dijon, France",
          details: [
            "Program focused on software development, systems, networks, and databases.",
            "Hands-on experience in software architecture, advanced programming, testing, cybersecurity, and optimization.",
            "Completed a team-based project following agile methodology.",
          ],
        },
        {
          period: "2017 - 2019",
          diploma:
            "High School Diploma in Industry and Sustainable Development Science and Technology",
          school: "Eiffel High School",
          location: "Dijon, France",
          details: [
            "Developed strong foundations in electronics, digital technologies, development, and system modeling.",
            "Participated in collaborative technological projects fostering autonomy and creativity.",
          ],
        },
      ],
    },
  },
} as const;
