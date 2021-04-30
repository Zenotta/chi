import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders a default button with text', async () => {
    render(<Button label="Click me" />);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  test('handles onClick', async () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick} label="Click me" />);
    fireEvent.click(screen.getByText('Click me'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});