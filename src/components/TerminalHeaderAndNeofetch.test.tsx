import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TerminalHeader } from '../components/TerminalHeader';
import { NeofetchCard } from '../components/NeofetchCard';
import { defaultProfile } from '../data/profile';

describe('TerminalHeader Component', () => {
  it('renders title and buttons correctly', () => {
    const onToggleTheme = vi.fn();
    const onCopyInfo = vi.fn();

    render(
      <TerminalHeader
        title="test-title"
        theme="dark"
        onToggleTheme={onToggleTheme}
        onCopyInfo={onCopyInfo}
        copied={false}
      />
    );

    expect(screen.getByText('test-title')).toBeInTheDocument();

    const copyBtn = screen.getByRole('button', { name: /copiar resumen/i });
    fireEvent.click(copyBtn);
    expect(onCopyInfo).toHaveBeenCalledTimes(1);

    const themeBtn = screen.getByRole('button', { name: /cambiar a tema claro/i });
    fireEvent.click(themeBtn);
    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });
});

describe('NeofetchCard Component', () => {
  it('renders developer profile and system specs', () => {
    render(<NeofetchCard profile={defaultProfile} />);

    expect(screen.getByText(defaultProfile.name)).toBeInTheDocument();
    expect(screen.getByText(`@${defaultProfile.handle}`)).toBeInTheDocument();
    expect(screen.getByText(defaultProfile.role)).toBeInTheDocument();
  });
});
