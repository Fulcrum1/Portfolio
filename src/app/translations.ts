export type Language = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
    },
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
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      name: "Guillaume TRAPET",
      role: "Full-Stack Developer",
      description:
        "Passionate about creating innovative and performant digital experiences. Specialized in modern technologies and software architecture.",
    },
    about: {
      title: "ABOUT",
      text1:
        "Full-stack developer specializing in creating performant business applications. I help companies digitalize their workflows by building custom, maintainable, and scalable solutions.",
      text2:
        "Technical expertise: JavaScript ecosystem (Vue.js, React, Svelte, Next.js), PHP/Laravel, database architecture (MySQL, PostgreSQL). Additional versatility in Java and C# based on project requirements.",
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
        // {
        {
          category: "Soft Skills",
          skills: [
            "Problem-solving",
            "Adaptability",
            "Teamwork",
          ],
        },
      ],
    },
    projects: {
      title: "PROJECTS",
      items: [
        {
          title: "CSE Platform",
          description:
            "Full-stack application for managing a Social and Economic Committee: dashboard, inventory, and orders. Built with Vue.js and Laravel.",
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
      text: "Interested in working together? Feel free to contact me!",
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
} as const;
