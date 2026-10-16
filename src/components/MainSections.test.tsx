import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { StatsAndContact } from '../components/StatsAndContact';
import { defaultProfile } from '../data/profile';

describe('Main Content Sections', () => {
  it('renders SkillsSection correctly', () => {
    render(<SkillsSection categories={defaultProfile.skillCategories} />);
    expect(screen.getByText('// Stack Tecnológico & Habilidades')).toBeInTheDocument();
    expect(screen.getByText(defaultProfile.skillCategories[0].category)).toBeInTheDocument();
  });

  it('renders ProjectsSection correctly with external links', () => {
    render(<ProjectsSection projects={defaultProfile.projects} />);
    expect(screen.getByText('// Proyectos Destacados')).toBeInTheDocument();
    expect(screen.getByText(defaultProfile.projects[0].title)).toBeInTheDocument();
  });

  it('renders StatsAndContact correctly', () => {
    render(
      <StatsAndContact
        stats={defaultProfile.stats}
        socialLinks={defaultProfile.socialLinks}
        email={defaultProfile.email}
      />
    );
    expect(screen.getByText('// Métricas & Estadísticas')).toBeInTheDocument();
    expect(screen.getByText('// Redes & Contacto')).toBeInTheDocument();
    if (defaultProfile.email) {
      expect(screen.getByText(defaultProfile.email)).toBeInTheDocument();
      }
  });
});
