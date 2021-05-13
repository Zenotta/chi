import { render, fireEvent, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  test('renders a default Table with headers', async () => {
    let header = [
        { value: "Block Hash", isNumeric: false },
        { value: "Previous Hash", isNumeric: false },
        { value: "Block Number", isNumeric: true },
        { value: "Transactions", isNumeric: true },
    ];

    render(<Table header={header} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});