import React from 'react';
import { render, screen } from '@testing-library/react';
import ServicesSection from '../../../components/landingPage/ServicesSection/ServicesSection.js';

// Mock image imports to prevent test errors
vi.mock('../../../assets/images/landingPage/house1.jpeg', () => ({
  default: 'house1.jpeg',
}));
vi.mock('../../../assets/images/landingPage/house2.jpg', () => ({
  default: 'house2.jpg',
}));

describe('ServicesSection component', () => {
  it('renders the main section headline', () => {
    render(<ServicesSection />);
    // Checks for the main section heading
    expect(
      screen.getByText(/Optimisez la gestion de vos biens immobiliers avec nos services/i)
    ).toBeInTheDocument();
  });

  it('renders the small image with correct alt text', () => {
    render(<ServicesSection />);
    // Checks for the small service image
    expect(
      screen.getByAltText('Gestion immobilière')
    ).toBeInTheDocument();
  });

  it('renders the large image with correct alt text', () => {
    render(<ServicesSection />);
    // Checks for the large service image
    expect(
      screen.getByAltText('Gestion locative')
    ).toBeInTheDocument();
  });

  it('renders both service description paragraphs', () => {
    render(<ServicesSection />);
    // Checks both service description texts
    expect(
      screen.getByText(/Nous proposons une solution complète pour gérer vos biens/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Notre plateforme intuitive vous permet de gérer vos biens en toute simplicité/i)
    ).toBeInTheDocument();
  });

  it('renders the call-to-action button', () => {
    render(<ServicesSection />);
    // Checks for the presence of the main action button
    expect(
      screen.getByRole('button', { name: /Commencez à gérer vos biens dès maintenant/i })
    ).toBeInTheDocument();
  });
});
