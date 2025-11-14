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
        "Développeur informatique avec une expérience en développement d'applications, gestion de projets, et travail en équipe.",
      text2: "Compétences en JavaScript, PHP, HTML/CSS, Java et C#.",
    },
    // skills: {
    //   title: "COMPÉTENCES",
    //   items: [
    //     {
    //       category: "Frontend",
    //       skills: ["Vue.js", "Svelte", "React", "Next.js", "TypeScript"],
    //     },
    //     {
    //       category: "Backend",
    //       skills: ["Node.js", "PHP", "Laravel", "API REST"],
    //     },
    //     {
    //       category: "Backend",
    //       skills: ["Node.js", "PHP", "PostgreSQL", "API REST"],
    //     },
    //     { category: "DevOps", skills: ["Docker", "Git", "CI/CD", "Cloud"] },
    //     {
    //       category: "Design",
    //       skills: ["UI/UX", "Figma", "Responsive", "Animations"],
    //     },
    //     {
    //       category: "Outils",
    //       skills: ["VS Code", "Postman", "Linux", "Agile"],
    //     },
    //     {
    //       category: "Soft Skills",
    //       skills: ["Créativité", "Rigueur", "Collaboration", "Curiosité"],
    //     },
    //   ],
    // },
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
        // {
        {
          category: "Soft Skills",
          skills: [
            "Résolution de problèmes",
            "Adaptabilité",
            "Travail d’équipe",
            "Mentorat & Revue de code",
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
        },
        {
          title: "CRM & E-commerce",
          description:
            "Gestion des clients, commandes et statistiques. Module e-commerce intégré. Stack : Vue.js, Laravel et MySQL.",
          tags: ["Vue.js", "Laravel", "PHP", "MySQL"],
        },
        {
          title: "Gestion des temps",
          description:
            "Suivi des heures, projets et congés. Développée avec Svelte et Laravel pour une gestion RH simplifiée.",
          tags: ["Svelte", "Laravel", "PHP", "MySQL"],
        },
        {
          title: "Learning App - Japonais",
          description:
            "Application d’apprentissage du japonais avec flashcards et suivi de progression. Stack : React, Next.js et PostgreSQL.",
          tags: ["React", "Next.js", "PostgreSQL", "TypeScript"],
        },
      ],
    },
    contact: {
      title: "CONTACT",
      text: "Intéressé par une collaboration ? N'hésitez pas à me contacter !",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
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
        "Computer developer with experience in application development, project management, and teamwork.",
      text2: "Skills in JavaScript, PHP, HTML/CSS, Java, C#, and databases.",
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
        // {
        {
          category: "Soft Skills",
          skills: [
            "Problem-solving",
            "Adaptability",
            "Teamwork",
            "Mentorship & Code review",
          ],
        },
      ],
    },
    projects: {
      title: "PROJECTS",
      items: [
        {
          title: "Project 1",
          description:
            "Full-stack web application with React and Node.js. Authentication system and interactive dashboard.",
          tags: ["React", "Node.js", "MongoDB"],
        },
        {
          title: "Project 2",
          description:
            "Modern e-commerce site with integrated payment and real-time inventory management.",
          tags: ["Next.js", "Stripe", "PostgreSQL"],
        },
        {
          title: "Project 3",
          description:
            "Performant REST API with Swagger documentation and automated tests.",
          tags: ["Python", "FastAPI", "Docker"],
        },
        {
          title: "Project 4",
          description:
            "Interactive portfolio with 3D animations and responsive design.",
          tags: ["Three.js", "React", "GSAP"],
        },
      ],
    },
    contact: {
      title: "CONTACT",
      text: "Interested in working together? Feel free to contact me!",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      rights: "All rights reserved",
      built: "Built with Next.js & TailwindCSS",
    },
  },
} as const;
