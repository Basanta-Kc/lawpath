import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddressForm } from '../AddressForm';

describe('AddressForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the form fields', () => {
    render(<AddressForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    expect(screen.getByLabelText(/postcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/suburb/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /validate address/i })).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    render(<AddressForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    fireEvent.click(screen.getByRole('button', { name: /validate address/i }));

    await waitFor(() => {
      expect(screen.getByText(/postcode must be a 4-digit number/i)).toBeInTheDocument();
      expect(screen.getByText(/suburb must be at least 2 characters long/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a valid state/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    render(<AddressForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    fireEvent.change(screen.getByLabelText(/postcode/i), { target: { value: '2000' } });
    fireEvent.change(screen.getByLabelText(/suburb/i), { target: { value: 'Sydney' } });
    fireEvent.change(screen.getByLabelText(/state/i), { target: { value: 'NSW' } });

    fireEvent.click(screen.getByRole('button', { name: /validate address/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        postcode: '2000',
        suburb: 'Sydney',
        state: 'NSW',
      });
    });
  });

  it('disables the submit button when loading', () => {
    render(<AddressForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByRole('button', { name: /validating/i })).toBeDisabled();
  });
});

