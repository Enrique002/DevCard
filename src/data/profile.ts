
import avatarImage from '../assets/avatar.jpg';

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Array<{
    name: string;
    level?: string;
    icon?: string;
  }>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface DeveloperStat {
  label: string;
  value: string | number;
  description?: string;
  isExample?: boolean;
}

export interface DeveloperProfile {
  name: string;
  handle: string;
  role: string;
  bio: string;
  location?: string;
  avatarUrl?: string;
  email?: string;
  statusText?: string;
  systemSpecs?: {
    os?: string;
    host?: string;
    kernel?: string;
    uptime?: string;
    shell?: string;
    terminal?: string;
  };
  socialLinks: SocialLink[];
  skillCategories: SkillCategory[];
  projects: Project[];
  stats: DeveloperStat[];
}

export const defaultProfile: DeveloperProfile = {
  name: "Enrique Navarrete-Amado Sánchez",
  handle: "Enrique002",
  role: "Desarrollador de Software | Java · Python · Web",
  bio: "Desarrollador orientado al desarrollo de software y aplicaciones web. Experiencia práctica con Java, mantenimiento y mejora de aplicaciones, y desarrollo de pequeños proyectos con Spring Boot y Python. Actualmente ampliando mis conocimientos mediante proyectos personales, APIs, bases de datos y desarrollo web.",
  location: "España · Disponible para trabajo remoto",
  avatarUrl: avatarImage,
  email: undefined,
  statusText: "Desarrollando proyectos y ampliando mi portfolio",

  systemSpecs: {
    os: "Windows 11 x86_64",
    shell: "PowerShell",
    terminal: "DevCard",
  },

  socialLinks: [
    {
      platform: "GitHub",
      label: "github.com/Enrique002",
      url: "https://github.com/Enrique002",
    },
    {
      platform: "Portfolio",
      label: "Mi portfolio",
      url: "https://enrique002.github.io/Portfolio/",
    },
  ],

  skillCategories: [
    {
      category: "Desarrollo Backend",
      skills: [
        {
          name: "Java",
          level: "Experiencia profesional",
        },
        {
          name: "Programación orientada a objetos",
          level: "Experiencia práctica",
        },
        {
          name: "Spring Boot",
          level: "Proyectos prácticos",
        },
        {
          name: "APIs REST",
          level: "Experiencia práctica",
        },
        {
          name: "Python",
          level: "Proyectos personales",
        },
      ],
    },
    {
      category: "Desarrollo Web",
      skills: [
        {
          name: "HTML5",
          level: "Proyectos prácticos",
        },
        {
          name: "CSS3",
          level: "Proyectos prácticos",
        },
        {
          name: "JavaScript",
          level: "Desarrollo web",
        },
        {
          name: "React",
          level: "Proyectos prácticos",
        },
        {
          name: "GitHub Pages",
          level: "Despliegue de proyectos",
        },
      ],
    },
    {
      category: "Bases de Datos y Herramientas",
      skills: [
        {
          name: "SQL",
          level: "Experiencia práctica",
        },
        {
          name: "Operaciones CRUD",
          level: "Experiencia práctica",
        },
        {
          name: "Git",
          level: "Control de versiones",
        },
        {
          name: "GitHub",
          level: "Repositorios y colaboración",
        },
        {
          name: "GitHub Actions",
          level: "Automatización de despliegues",
        },
        {
          name: "PowerShell",
          level: "Entorno Windows",
        },
      ],
    },
  ],

  projects: [
    {
      id: "portfolio",
      title: "Portfolio Personal",
      description:
        "Portfolio web para presentar mi perfil profesional, mis conocimientos y mis proyectos de desarrollo. Publicado mediante GitHub Pages.",
      tags: [
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "GitHub Pages",
      ],
      githubUrl: "https://github.com/Enrique002/Portfolio",
      demoUrl: "https://enrique002.github.io/Portfolio/",
      featured: true,
    },
    {
      id: "devcard",
      title: "DevCard",
      description:
        "Tarjeta de presentación interactiva para desarrolladores, con información personal, tecnologías, enlaces y proyectos. Diseñada para personalizarse y publicarse en GitHub Pages.",
      tags: [
        "TypeScript",
        "React",
        "Vite",
        "GitHub Actions",
      ],
      featured: true,
    },
    {
      id: "port-manager",
      title: "Gestor de Puertos",
      description:
        "Pequeña aplicación desarrollada con Java y Spring Boot para facilitar la identificación y el cierre de procesos que mantienen puertos ocupados en el equipo.",
      tags: [
        "Java",
        "Spring Boot",
        "APIs REST",
        "Gestión de procesos",
      ],
      featured: true,
    },
    {
      id: "python-automation",
      title: "Scripts de Automatización",
      description:
        "Pequeños scripts en Python para automatizar tareas cotidianas en Windows, como la apertura de aplicaciones desde el escritorio.",
      tags: [
        "Python",
        "Automatización",
        "Windows",
        "Scripting",
      ],
      featured: false,
    },
  ],

  stats: [
    {
      label: "Lenguaje principal",
      value: "Java",
      description:
        "Utilizado profesionalmente en mantenimiento y mejora de aplicaciones.",
    },
    {
      label: "Área de desarrollo",
      value: "Full Stack",
      description:
        "Interés y práctica en backend, frontend y bases de datos.",
    },
    {
      label: "Proyectos personales",
      value: "En desarrollo",
      description:
        "Aplicaciones y herramientas para seguir ampliando mi experiencia.",
    },
    {
      label: "Despliegue",
      value: "GitHub Pages",
      description:
        "Publicación de proyectos web y automatización con GitHub Actions.",
    },
  ],
};
