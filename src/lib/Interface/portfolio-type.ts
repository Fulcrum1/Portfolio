interface Skill {
  category: string;
  skills: string[];
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  type: string;
  link?: { title: string; url: string };
  github?: string;
}

interface Formation {
  diploma: string;
  school: string;
  location: string;
  period: string;
  details: string[];
}

interface Experience {
  period: string;
  company: string;
  role: string;
  description: string;
  tech?: string[];
  tasks?: { label: string; items: string[] };
  mission?: string;
  skills?: { label: string; items: string[] };
}

export type { Skill, Project, Formation, Experience };