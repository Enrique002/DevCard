import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InteractiveTerminal } from '../components/InteractiveTerminal';
import { defaultProfile } from '../data/profile';

describe('InteractiveTerminal Component', () => {
  it('renders welcome message and input prompt', () => {
    render(
      <InteractiveTerminal
        profile={defaultProfile}
        theme="dark"
        onToggleTheme={vi.fn()}
        onCopyInfo={vi.fn()}
      />
    );

    expect(screen.getByText(/¡Bienvenido a DevCard CLI/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/escribe 'help'/i)).toBeInTheDocument();
  });

  it('executes command when typed and submitted with Enter', () => {
    render(
      <InteractiveTerminal
        profile={defaultProfile}
        theme="dark"
        onToggleTheme={vi.fn()}
        onCopyInfo={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/escribe 'help'/i);
    fireEvent.change(input, { target: { value: 'skills' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('⚡ Tecnologías y Especialidades:')).toBeInTheDocument();
  });

  it('executes quick command when shortcut button clicked', () => {
    render(
      <InteractiveTerminal
        profile={defaultProfile}
        theme="dark"
        onToggleTheme={vi.fn()}
        onCopyInfo={vi.fn()}
      />
    );

    const aboutButton = screen.getByRole('button', { name: 'about' });
    fireEvent.click(aboutButton);

    expect(screen.getByText(`👤 ${defaultProfile.name} (@${defaultProfile.handle})`)).toBeInTheDocument();
  });

  it('clears terminal history when clear button is clicked', () => {
    render(
      <InteractiveTerminal
        profile={defaultProfile}
        theme="dark"
        onToggleTheme={vi.fn()}
        onCopyInfo={vi.fn()}
      />
    );

    const clearButton = screen.getByRole('button', { name: /limpiar terminal/i });
    fireEvent.click(clearButton);

    expect(screen.queryByText(/¡Bienvenido a DevCard CLI/i)).not.toBeInTheDocument();
  });
});
