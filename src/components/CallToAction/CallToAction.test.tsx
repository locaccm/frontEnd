import { render, screen } from '@testing-library/react';
import CallToAction from './CallToAction';

test('renders CallToAction title', () => {
  render(<CallToAction />);
  expect(screen.getByText(/Optimisez la gestion de vos biens/i)).toBeInTheDocument();
});
