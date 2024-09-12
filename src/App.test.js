import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  //screen.debug(); // This will print the DOM to the console
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
