import { useState, useEffect } from 'react';
import { defaultProfile } from './data/profile';
import { formatProfileSummary } from './utils/terminalEngine';
import { TerminalHeader } from './components/TerminalHeader';
import { NeofetchCard } from './components/NeofetchCard';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StatsAndContact } from './components/StatsAndContact';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { GithubIcon } from './components/BrandIcons';
import { Heart, Code2 } from 'lucide-react';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('devcard_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('devcard_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCopyInfo = async () => {
    const textToCopy = formatProfileSummary(defaultProfile);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] py-6 px-3 sm:px-6 md:px-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Marco principal de ventana estilo Terminal */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-2xl overflow-hidden">
          {/* Cabecera de la Ventana */}
          <TerminalHeader
            title={`${defaultProfile.handle.toLowerCase()}@devcard ~ zsh`}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onCopyInfo={handleCopyInfo}
            copied={copied}
          />

          {/* Contenido Interior */}
          <main className="p-4 sm:p-6 space-y-6">
            {/* Bloque Neofetch / Tarjeta de Perfil */}
            <NeofetchCard profile={defaultProfile} />

            {/* Terminal Interactiva integrada */}
            <InteractiveTerminal
              profile={defaultProfile}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              onCopyInfo={handleCopyInfo}
            />

            {/* Stack Tecnológico */}
            <SkillsSection categories={defaultProfile.skillCategories} />

            {/* Proyectos Destacados */}
            <ProjectsSection projects={defaultProfile.projects} />

            {/* Métricas y Contacto */}
            <StatsAndContact
              stats={defaultProfile.stats}
              socialLinks={defaultProfile.socialLinks}
              email={defaultProfile.email}
            />
          </main>

          {/* Pie de Página Minimalista */}
          <footer className="px-6 py-4 bg-[var(--terminal-header)] border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--text-main)]">
            <div className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>
                DevCard &copy; {new Date().getFullYear()} — Desarrollado con React, TypeScript & Tailwind CSS
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>Hecho para desarrolladores</span>
              </span>
              <a
                href={defaultProfile.socialLinks.find((l) => l.platform.toLowerCase().includes('github'))?.url || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                aria-label="Ver repositorio en GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
