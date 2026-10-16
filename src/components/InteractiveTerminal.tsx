import React, { useState, useRef, useEffect } from 'react';
import type { DeveloperProfile } from '../data/profile';
import { executeCommand, type TerminalOutputItem } from '../utils/terminalEngine';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, HelpCircle } from 'lucide-react';

interface InteractiveTerminalProps {
  profile: DeveloperProfile;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onCopyInfo: () => void;
}

interface CommandHistoryEntry {
  command: string;
  output: TerminalOutputItem[];
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  profile,
  theme,
  onToggleTheme,
  onCopyInfo,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      command: 'welcome',
      output: [
        { type: 'heading', content: `👋 ¡Bienvenido a DevCard CLI v1.0.0 (${profile.name})!` },
        {
          type: 'text',
          content: "Escribe 'help' para ver la lista de comandos disponibles o usa los botones rápidos de abajo.",
        },
      ],
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (typeof terminalEndRef.current?.scrollIntoView === 'function') {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleRunCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const result = executeCommand(trimmed, profile, theme);

    if (result.action === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command: trimmed, output: result.output }]);
      if (result.action === 'toggle-theme') {
        onToggleTheme();
      } else if (result.action === 'copy') {
        onCopyInfo();
      }
    }

    setPastCommands((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRunCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIdx = historyIndex === -1 ? pastCommands.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(pastCommands[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= pastCommands.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(pastCommands[nextIdx] || '');
        }
      }
    }
  };

  const quickCommands = ['help', 'about', 'skills', 'projects', 'contact', 'clear'];

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 shadow-lg flex flex-col font-mono text-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm text-[var(--text-bright)]">
            // Terminal Interactiva
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            type="button"
            className="flex items-center gap-1 text-[11px] text-[var(--text-main)] hover:text-red-400 transition-colors p-1 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
            title="Limpiar terminal"
            aria-label="Limpiar terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpiar</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded p-4 min-h-[220px] max-h-[360px] overflow-y-auto space-y-3 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            {entry.command !== 'welcome' && (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span>{profile.handle.toLowerCase()}@devcard:~$</span>
                <span className="text-[var(--text-bright)]">{entry.command}</span>
              </div>
            )}

            <div className="pl-2 space-y-1 text-[var(--text-main)]">
              {entry.output.map((out, itemIdx) => {
                if (out.type === 'heading') {
                  return (
                    <p key={itemIdx} className="font-bold text-[var(--text-bright)] text-emerald-400/90 pt-1">
                      {out.content}
                    </p>
                  );
                }
                if (out.type === 'key-value') {
                  return (
                    <div key={itemIdx} className="flex flex-wrap gap-1.5">
                      <span className="text-[var(--text-bright)] font-semibold">{out.key}:</span>
                      <span>{out.value}</span>
                    </div>
                  );
                }
                if (out.type === 'link') {
                  return (
                    <div key={itemIdx}>
                      <a
                        href={out.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline"
                      >
                        {out.content}
                      </a>
                    </div>
                  );
                }
                if (out.type === 'error') {
                  return (
                    <p key={itemIdx} className="text-red-400">
                      {out.content}
                    </p>
                  );
                }
                if (out.type === 'success') {
                  return (
                    <p key={itemIdx} className="text-emerald-400">
                      {out.content}
                    </p>
                  );
                }
                return <p key={itemIdx}>{out.content}</p>;
              })}
            </div>
          </div>
        ))}

        {/* Active Command Prompt Line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-semibold shrink-0">
            {profile.handle.toLowerCase()}@devcard:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="escribe 'help'..."
            aria-label="Entrada de comando de la terminal"
            className="flex-1 bg-transparent border-none outline-none text-[var(--text-bright)] font-mono caret-emerald-400 placeholder:text-[var(--text-main)] placeholder:opacity-50"
          />
          <button
            onClick={() => handleRunCommand(inputVal)}
            type="button"
            aria-label="Ejecutar comando"
            className="p-1 rounded text-emerald-400 hover:bg-emerald-500/10 focus:outline-none"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Shortcut Buttons */}
      <div className="pt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-[var(--text-main)] flex items-center gap-1 mr-1">
          <HelpCircle className="w-3 h-3 text-emerald-400" />
          Comandos rápidos:
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            type="button"
            className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--bg-main)] hover:bg-emerald-500/10 hover:text-emerald-400 border border-[var(--border-color)] text-[var(--text-main)] transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
