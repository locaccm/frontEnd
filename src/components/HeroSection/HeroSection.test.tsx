import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  test('renders the hero title correctly', () => {
    render(<HeroSection />);
    const heading = screen.getByText(/la gestion efficace des biens/i);
    expect(heading).toBeInTheDocument();
  });
});
