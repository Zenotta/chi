import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  test('renders a default loading icon', async () => {
    render(<Loading />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});