import { render, fireEvent, screen } from '@testing-library/react';
import { Notification } from './Notification';

describe('Notification', () => {
  test('renders a default Notification', async () => {
    render(<Notification type="info">This is important info</Notification>);
    expect(screen.getByTestId('notification')).toBeInTheDocument();
  });
});