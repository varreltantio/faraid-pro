import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // Mencari elemen yang berisi teks 'learn react' secara case-insensitive
  expect(linkElement).toBeInTheDocument(); // Memastikan elemen tersebut ada di dalam dokumen
});