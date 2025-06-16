import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsSection from '../../../components/landingPage/StatsSection/StatsSection.js';

// Mock the image import to avoid errors in test environment
vi.mock('../../../assets/images/landingPage/family.png', () => ({
  default: 'family.png',
}));

describe('StatsSection component', () => {
  it('renders the main image with correct alt text', () => {
    render(<StatsSection />);
    // Check if the image with the correct alt text is present
    expect(screen.getByAltText('Gestion immobilière')).toBeInTheDocument();
  });

  it('renders the main management headline', () => {
    render(<StatsSection />);
    // Check if the headline is present
    expect(
      screen.getByText(/Une gestion intelligente et transparente pour maximiser la valeur de vos biens/i)
    ).toBeInTheDocument();
  });

  it('renders all statistics items', () => {
    render(<StatsSection />);
    // Check for all three statistics blocks
    expect(screen.getByText('300+')).toBeInTheDocument();
    expect(screen.getByText('propriétés gérées')).toBeInTheDocument();

    expect(screen.getByText('60+')).toBeInTheDocument();
    expect(screen.getByText('locataires satisfaits')).toBeInTheDocument();

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/ans d'expertise/i)).toBeInTheDocument();
  });
});
