import { render, fireEvent, screen } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  test('renders a default TextInput', async () => {
    render(<TextInput type="text" onSubmit={(e: string) => console.log(e)} />);
    expect(screen.getByTestId('textInputContainer')).toBeInTheDocument();
  });
});