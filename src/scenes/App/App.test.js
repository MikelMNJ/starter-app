import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders sample component.', () => {
  render(<App />);
  const linkElement = screen.getByText(/Component/i);
  expect(linkElement).toBeInTheDocument();
});
