interface Skill {
  category: string;
  skills: string[];
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
}

interface Formation {
  diploma: string;
  school: string;
  location: string;
  period: string;
}

interface Experience {
  period: string;
  company: string;
  role: string;
  description: string;
  tech?: string[];
  tasks?: string[];
  projects?: string[];
  mission?: string;
  skills?: string[];
}

export type { Skill, Project, Formation, Experience };