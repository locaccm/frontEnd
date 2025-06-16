import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactSection from '../../../components/landingPage/ContactSection/ContactSection.js';

// Mock the logo import to avoid issues with images during testing
vi.mock('../../../assets/images/landingPage/ddloca.png', () => ({
  default: 'mock-logo.png'
}));

describe('ContactSection', () => {
  beforeEach(() => {
    // Reset all mocks before each test to avoid state leakage
    vi.resetAllMocks();
  });

  it('renders the title and submit button', () => {
    render(<ContactSection />);
    // Check if the contact section title is rendered
    expect(screen.getByText(/Contactez-nous/i)).toBeInTheDocument();
    // Check if the submit button is present
    expect(screen.getByRole('button', { name: /Soumettre/i })).toBeInTheDocument();
  });

  it('renders all input fields in the form', () => {
    render(<ContactSection />);
    // Check all input fields by their exact label
    expect(screen.getByLabelText(/^Prénom$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nom$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Téléphone$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Message$/i)).toBeInTheDocument();
  });

  it('shows the success message after form submission', async () => {
    // Mock fetch to simulate a successful submission (status ok)
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    render(<ContactSection />);
    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/^Prénom$/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/^Nom$/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/^Téléphone$/i), { target: { value: '0600000000' } });
    fireEvent.change(screen.getByLabelText(/^Message$/i), { target: { value: 'Hello world!' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Soumettre/i }));

    // Wait for the success message to appear
    await waitFor(() =>
      expect(screen.getByText(/votre message a bien été envoyé/i)).toBeInTheDocument()
    );
  });

  it('shows an error message if fetch fails', async () => {
    // Mock fetch to simulate a failed submission (status not ok)
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    render(<ContactSection />);
    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/^Prénom$/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/^Nom$/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/^Téléphone$/i), { target: { value: '0600000000' } });
    fireEvent.change(screen.getByLabelText(/^Message$/i), { target: { value: 'Hello world!' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Soumettre/i }));

    // Wait for the error message to appear
    await waitFor(() =>
      expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument()
    );
  });
});
