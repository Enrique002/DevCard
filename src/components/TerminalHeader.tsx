import React from 'react';
import { Terminal, Sun, Moon, Copy, Check, ShieldCheck } from 'lucide-react';

interface TerminalHeaderProps {
  title?: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onCopyInfo: () => void;
  copied: boolean;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  title = 'devcard@terminal ~ zsh',
  theme,
  onToggleTheme,
  onCopyInfo,
  copied,
}) => {
  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-3 bg-[var(--terminal-header)] border-b border-[var(--border-color)] rounded-t-xl select-none">
      {/* Window Controls */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/40" title="Close" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block border border-yellow-600/40" title="Minimize" />
        <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block border border-green-600/40" title="Maximize" />
        <div className="ml-3 hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-main)] opacity-75">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono tracking-tight">{title}</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onCopyInfo}
          type="button"
          aria-label="Copiar resumen del perfil"
          title="Copiar resumen del perfil"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-bright)] transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copiar Perfil</span>
            </>
          )}
        </button>

        <button
          onClick={onToggleTheme}
          type="button"
          aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          className="p-1.5 rounded bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-bright)] transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500" />
          )}
        </button>

        <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span>v1.0.0</span>
        </div>
      </div>
    </header>
  );
};
