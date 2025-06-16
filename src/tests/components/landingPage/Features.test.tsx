import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from '../../../components/landingPage/Features/Features.js';

// Mock image imports to avoid errors in the test environment (Vitest syntax)
vi.mock('../../../assets/images/landingPage/houses.png', () => ({
  default: 'houses.png',
}));
vi.mock('../../../assets/images/landingPage/list.png', () => ({
  default: 'list.png',
}));
vi.mock('../../../assets/images/landingPage/graph.png', () => ({
  default: 'graph.png',
}));
vi.mock('../../../assets/images/landingPage/notif.png', () => ({
  default: 'notif.png',
}));

describe('Features component', () => {
  it('renders all feature cards', () => {
    render(<Features />);
    // Check if every feature title is rendered
    expect(screen.getByText(/Gestion des biens/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Calendriers/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });

  it('renders correct feature descriptions', () => {
    render(<Features />);
    // Check if every feature description is rendered
    expect(
      screen.getByText(/Organisez et suivez vos biens immobiliers/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Vue d’ensemble de vos propriétés et locataires/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Planifiez et gérez vos locations facilement/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Recevez des alertes instantanées/i)
    ).toBeInTheDocument();
  });

  it('renders exactly four feature cards', () => {
    render(<Features />);
    // All cards should have a role "heading" at level 4 (h4)
    const featureTitles = screen.getAllByRole('heading', { level: 4 });
    expect(featureTitles).toHaveLength(4);
  });

  it('renders feature icons with correct alt text', () => {
    render(<Features />);
    // Each icon should have an alt attribute matching the title
    expect(screen.getByAltText('Gestion des biens')).toBeInTheDocument();
    expect(screen.getByAltText('Dashboard')).toBeInTheDocument();
    expect(screen.getByAltText('Calendriers')).toBeInTheDocument();
    expect(screen.getByAltText('Notifications')).toBeInTheDocument();
  });
});
