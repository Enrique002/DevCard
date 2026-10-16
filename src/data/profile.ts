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
    level?: string; // e.g. "Avanzado", "Intermedio"
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
  name: "Alex Dev",
  handle: "alexdev",
  role: "Senior Frontend Engineer & UI Specialist",
  bio: "Desarrollador enfocado en construir experiencias web accesibles, rápidas y con excelente dirección de arte. Apasionado por las herramientas de desarrollo, CLI, React y TypeScript.",
  location: "Madrid, España (Remoto)",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  email: "alex.dev@example.com",
  statusText: "Construyendo interfaces web modernas",
  systemSpecs: {
    os: "Arch Linux x86_64",
    host: "ThinkPad X1 Carbon Gen 10",
    kernel: "6.8.9-arch1-1",
    uptime: "42 días, 13 horas",
    shell: "zsh 5.9",
    terminal: "DevCard v1.0.0",
  },
  socialLinks: [
    {
      platform: "GitHub",
      label: "github.com/alexdev",
      url: "https://github.com",
    },
    {
      platform: "LinkedIn",
      label: "linkedin.com/in/alexdev",
      url: "https://linkedin.com",
    },
    {
      platform: "Portfolio",
      label: "alexdev.dev",
      url: "https://github.com",
    },
    {
      platform: "Twitter / X",
      label: "@alexdev_ui",
      url: "https://x.com",
    },
  ],
  skillCategories: [
    {
      category: "Frontend Core",
      skills: [
        { name: "TypeScript", level: "Avanzado" },
        { name: "React 19", level: "Avanzado" },
        { name: "Next.js", level: "Intermedio-Alto" },
        { name: "Tailwind CSS", level: "Avanzado" },
        { name: "HTML5 / CSS3 Semántico", level: "Avanzado" },
      ],
    },
    {
      category: "Arquitectura & Calidad",
      skills: [
        { name: "Accesibilidad (WCAG 2.1)", level: "Avanzado" },
        { name: "Vitest / Testing Library", level: "Avanzado" },
        { name: "Design Systems", level: "Avanzado" },
        { name: "Vite / Tooling", level: "Intermedio" },
      ],
    },
    {
      category: "Herramientas & Entorno",
      skills: [
        { name: "Git / GitHub Actions", level: "Avanzado" },
        { name: "Linux / Zsh", level: "Intermedio" },
        { name: "Neovim / VS Code", level: "Avanzado" },
        { name: "Figma", level: "Intermedio" },
      ],
    },
  ],
  projects: [
    {
      id: "terminal-portfolio",
      title: "DevCard - Terminal Card",
      description: "Tarjeta interactiva para desarrolladores inspirada en la estética de terminal y neofetch. Altamente personalizable y accesible.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com",
      demoUrl: "https://github.com",
      featured: true,
    },
    {
      id: "ui-component-library",
      title: "Pixel-CLI Component System",
      description: "Biblioteca de componentes de interfaz inspirada en interfaces modo texto y editores de código con soporte de accesibilidad.",
      tags: ["TypeScript", "Tailwind", "Radix Primitives"],
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "git-commit-analyzer",
      title: "CommitFlow Analyzer",
      description: "Herramienta CLI para analizar la frecuencia de commits, hábitos de código y calidad de mensajes en repositorios Git.",
      tags: ["Node.js", "CLI", "TypeScript"],
      githubUrl: "https://github.com",
      featured: false,
    },
  ],
  stats: [
    {
      label: "Años de Experiencia",
      value: "6+",
      description: "Desarrollo frontend profesional",
    },
    {
      label: "Proyectos Destacados",
      value: "14",
      description: "Aplicaciones web e iniciativas Open Source",
    },
    {
      label: "Contribuciones (Demostración)",
      value: "1,240+",
      description: "Commits y PRs anuales (Dato de ejemplo)",
      isExample: true,
    },
    {
      label: "Puntuación Lighthouse",
      value: "100%",
      description: "Rendimiento y Accesibilidad",
    },
  ],
};
