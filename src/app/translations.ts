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
      text2:
        "Compétences en JavaScript, PHP, HTML/CSS, Java, C#, et bases de données.",
    },

    skills: {
      title: "COMPÉTENCES",
    },
    projects: {
      title: "PROJETS",
      items: [
        {
          title: "Projet 1",
          description:
            "Application web full-stack avec React et Node.js. Système d'authentification et dashboard interactif.",
          tags: ["React", "Node.js", "MongoDB"],
        },
        {
          title: "Projet 2",
          description:
            "Site e-commerce moderne avec paiement intégré et gestion de stock en temps réel.",
          tags: ["Next.js", "Stripe", "PostgreSQL"],
        },
        {
          title: "Projet 3",
          description:
            "API REST performante avec documentation Swagger et tests automatisés.",
          tags: ["Python", "FastAPI", "Docker"],
        },
        {
          title: "Projet 4",
          description:
            "Portfolio interactif avec animations 3D et design responsive.",
          tags: ["Three.js", "React", "GSAP"],
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
      text2:
        "Skills in JavaScript, PHP, HTML/CSS, Java, C#, and databases.",
    },
    skills: {
      title: "SKILLS",
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
