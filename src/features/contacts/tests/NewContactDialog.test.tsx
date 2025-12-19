import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewContactDialog } from './NewContactDialog';
import { renderWithProviders } from '@/test/test-utils';

describe('NewContactDialog Integration', () => {
    it('should open dialog and allow form submission', async () => {
        const user = userEvent.setup();

        renderWithProviders(
            <NewContactDialog>
                <button>Open Dialog</button>
            </NewContactDialog>,
            {
                preloadedState: {
                    auth: { activeUser: { id: 'theTester', name: 'Hazem The Tester' } }
                }
            }
        );

        // Open the dialog
        await user.click(screen.getByText(/open dialog/i));
        expect(screen.getByText(/add new contact/i)).toBeInTheDocument();

        const nameInput = screen.getByLabelText(/name/i);
        const phoneInput = screen.getByLabelText(/phone number/i);
        const submitButton = screen.getByRole('button', { name: /add contact/i });

        await user.type(nameInput, 'Hazem Azzam');
        await user.type(phoneInput, '+201142221039');

        await user.click(submitButton);

        // Form should reset after successful submission
        await waitFor(() => {
            expect(nameInput).toHaveValue('');
            expect(phoneInput).toHaveValue('');
        }, { timeout: 3000 });
    });

    it('should not submit if validation fails', async () => {
        const user = userEvent.setup();

        renderWithProviders(
            <NewContactDialog>
                <button>Open Dialog</button>
            </NewContactDialog>,
            {
                preloadedState: {
                    auth: { activeUser: { id: 'theTester', name: 'Hazem The Tester' } }
                }
            }
        );

        await user.click(screen.getByText(/open dialog/i));

        const nameInput = screen.getByLabelText(/name/i);
        const submitButton = screen.getByRole('button', { name: /add contact/i });

        await user.type(nameInput, 'Inv'); // Name too short (min 3 but this might actually be valid depending on zod setup, wait)
        // Schema says .min(3). So 'Inv' is 3 chars, it's valid.
        // Let's use 'In' for failure.
        await user.clear(nameInput);
        await user.type(nameInput, 'In');
        await user.click(submitButton);

        await waitFor(() => {
            expect(nameInput).toHaveValue('In');
        });
    });
});
