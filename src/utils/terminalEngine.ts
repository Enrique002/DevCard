import type { DeveloperProfile } from '../data/profile';

export interface TerminalOutputItem {
  type: 'text' | 'success' | 'warning' | 'error' | 'heading' | 'link' | 'list' | 'key-value';
  content: string;
  key?: string;
  value?: string;
  url?: string;
}

export interface TerminalResult {
  command: string;
  output: TerminalOutputItem[];
  action?: 'clear' | 'toggle-theme' | 'copy';
}

export function executeCommand(
  rawCommand: string,
  profile: DeveloperProfile,
  currentTheme: 'dark' | 'light' = 'dark'
): TerminalResult {
  const trimmed = rawCommand.trim().toLowerCase();
  const args = trimmed.split(' ').filter(Boolean);
  const command = args[0] || '';

  if (command === 'clear') {
    return {
      command: rawCommand,
      output: [],
      action: 'clear',
    };
  }

  if (command === 'help') {
    return {
      command: rawCommand,
      output: [
        { type: 'heading', content: 'Comandos disponibles en DevCard CLI:' },
        { type: 'key-value', key: 'about', value: 'Muestra información personal y perfil profesional', content: 'about - Muestra información personal y perfil profesional' },
        { type: 'key-value', key: 'skills', value: 'Muestra las tecnologías y habilidades organizadas por categoría', content: 'skills - Muestra las tecnologías y habilidades organizadas por categoría' },
        { type: 'key-value', key: 'projects', value: 'Lista los proyectos destacados y enlaces', content: 'projects - Lista los proyectos destacados y enlaces' },
        { type: 'key-value', key: 'stats', value: 'Muestra métricas y estadísticas clave', content: 'stats - Muestra métricas y estadísticas clave' },
        { type: 'key-value', key: 'contact', value: 'Lista enlaces sociales y correo de contacto', content: 'contact - Lista enlaces sociales y correo de contacto' },
        { type: 'key-value', key: 'theme', value: 'Alterna o muestra el tema visual (dark/light)', content: 'theme - Alterna o muestra el tema visual (dark/light)' },
        { type: 'key-value', key: 'copy', value: 'Copia el resumen de la tarjeta al portapapeles', content: 'copy - Copia el resumen de la tarjeta al portapapeles' },
        { type: 'key-value', key: 'clear', value: 'Limpia el historial de la pantalla de terminal', content: 'clear - Limpia el historial de la pantalla de terminal' },
      ],
    };
  }

  if (command === 'about') {
    const items: TerminalOutputItem[] = [
      { type: 'heading', content: `👤 ${profile.name} (@${profile.handle})` },
      { type: 'key-value', key: 'Rol', value: profile.role, content: `Rol: ${profile.role}` },
      { type: 'text', content: profile.bio },
    ];
    if (profile.location) {
      items.push({ type: 'key-value', key: 'Ubicación', value: profile.location, content: `Ubicación: ${profile.location}` });
    }
    if (profile.email) {
      items.push({ type: 'key-value', key: 'Contacto', value: profile.email, content: `Contacto: ${profile.email}` });
    }
    return {
      command: rawCommand,
      output: items,
    };
  }

  if (command === 'skills') {
    const items: TerminalOutputItem[] = [
      { type: 'heading', content: '⚡ Tecnologías y Especialidades:' },
    ];

    profile.skillCategories.forEach((cat) => {
      const skillList = cat.skills.map((s) => `${s.name}${s.level ? ` (${s.level})` : ''}`).join(', ');
      items.push({
        type: 'key-value',
        key: cat.category,
        value: skillList,
        content: `${cat.category}: ${skillList}`,
      });
    });

    return {
      command: rawCommand,
      output: items,
    };
  }

  if (command === 'projects') {
    const items: TerminalOutputItem[] = [
      { type: 'heading', content: '🚀 Proyectos Destacados:' },
    ];

    profile.projects.forEach((proj) => {
      items.push({
        type: 'heading',
        content: `• ${proj.title}${proj.featured ? ' [DESTACADO]' : ''}`,
      });
      items.push({ type: 'text', content: `  ${proj.description}` });
      items.push({ type: 'text', content: `  Tecnologías: ${proj.tags.join(', ')}` });
      if (proj.githubUrl) {
        items.push({ type: 'link', content: `  Repo: ${proj.githubUrl}`, url: proj.githubUrl });
      }
      if (proj.demoUrl) {
        items.push({ type: 'link', content: `  Demo: ${proj.demoUrl}`, url: proj.demoUrl });
      }
    });

    return {
      command: rawCommand,
      output: items,
    };
  }

  if (command === 'stats') {
    const items: TerminalOutputItem[] = [
      { type: 'heading', content: '📊 Estadísticas de Desarrollo:' },
    ];

    profile.stats.forEach((st) => {
      const valStr = `${st.value}${st.description ? ` - ${st.description}` : ''}`;
      items.push({
        type: 'key-value',
        key: st.label,
        value: valStr,
        content: `${st.label}: ${valStr}`,
      });
    });

    return {
      command: rawCommand,
      output: items,
    };
  }

  if (command === 'contact') {
    const items: TerminalOutputItem[] = [
      { type: 'heading', content: '📬 Contacto & Redes:' },
    ];

    if (profile.email) {
      items.push({ type: 'key-value', key: 'Email', value: profile.email, content: `Email: ${profile.email}` });
    }

    profile.socialLinks.forEach((link) => {
      items.push({
        type: 'link',
        content: `• ${link.platform}: ${link.url}`,
        url: link.url,
      });
    });

    return {
      command: rawCommand,
      output: items,
    };
  }

  if (command === 'theme') {
    if (args[1] === 'toggle' || args[1] === 'dark' || args[1] === 'light') {
      return {
        command: rawCommand,
        output: [{ type: 'success', content: 'Cambiando tema visual...' }],
        action: 'toggle-theme',
      };
    }
    return {
      command: rawCommand,
      output: [
        { type: 'text', content: `Tema actual: ${currentTheme}` },
        { type: 'text', content: "Usa 'theme toggle' para alternar entre oscuro y claro." },
      ],
      action: 'toggle-theme',
    };
  }

  if (command === 'copy') {
    return {
      command: rawCommand,
      output: [{ type: 'success', content: 'Resumen del perfil copiado al portapapeles.' }],
      action: 'copy',
    };
  }

  return {
    command: rawCommand,
    output: [
      {
        type: 'error',
        content: `Comando no reconocido: "${rawCommand}". Escribe 'help' para ver los comandos disponibles.`,
      },
    ],
  };
}

export function formatProfileSummary(profile: DeveloperProfile): string {
  const lines: string[] = [
    `DevCard Profile: ${profile.name} (@${profile.handle})`,
    `Rol: ${profile.role}`,
    `Bio: ${profile.bio}`,
  ];
  if (profile.location) lines.push(`Ubicación: ${profile.location}`);
  if (profile.email) lines.push(`Email: ${profile.email}`);

  lines.push('\nRedes:');
  profile.socialLinks.forEach((s) => lines.push(`- ${s.platform}: ${s.url}`));

  lines.push('\nHabilidades principales:');
  profile.skillCategories.forEach((cat) => {
    lines.push(`- ${cat.category}: ${cat.skills.map((s) => s.name).join(', ')}`);
  });

  return lines.join('\n');
}
