import { render, screen } from '@testing-library/react';
import Component from './Component';

test('Renders sample component.', () => {
  render(<Component />);
  const linkElement = screen.getByText(/Component/i);
  expect(linkElement).toBeInTheDocument();
});