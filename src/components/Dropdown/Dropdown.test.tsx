import { render, fireEvent, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  test('renders a default Dropdown with headers', async () => {
    let header = [
        { value: "Block Hash", isNumeric: false },
        { value: "Previous Hash", isNumeric: false },
        { value: "Block Number", isNumeric: true },
        { value: "Transactions", isNumeric: true },
    ];

    render(<Dropdown dropdownMethod="click" listItems={[{ value: 1 }]} />);

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });
});