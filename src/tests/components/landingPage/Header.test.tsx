import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../../components/landingPage/Header/Header.js';

// Mock the logo image to avoid errors during tests
vi.mock('../../../assets/images/landingPage/ddloca.png', () => ({
  default: 'logo.png',
}));

describe('Header component', () => {
  it('renders the logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // Check if the logo image is rendered with the correct alt text
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('renders the Contact link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // Check if the anchor with the Contact label exists
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    // And its href points to #contact
    expect(screen.getByText(/Contact/i).closest('a')).toHaveAttribute('href', '#contact');
  });

  it('renders the Connectez-vous link with router', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // There should be a link to "/signin"
    const loginLink = screen.getByText(/Connectez-vous/i).closest('a');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/signin');
  });
});
