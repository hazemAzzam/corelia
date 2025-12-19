import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../pages/Login/LoginPage';
import { renderWithProviders } from '@/test/test-utils';
import { ERRORS_CODE } from '../errors';

describe('LoginPage', () => {
    const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
    };

    const preloadedState = {
        auth: {
            users: [mockUser],
            activeUser: null,
            rememberedUser: null,
            isError: null,
            error: null,
        }
    };

    it('should login successfully with correct credentials', async () => {
        const user = userEvent.setup();
        const { store } = renderWithProviders(<LoginPage />, { preloadedState });

        const emailInput = screen.getByPlaceholderText(/email address/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const loginButton = screen.getByRole('button', { name: /log in/i });

        await user.type(emailInput, mockUser.email);
        await user.type(passwordInput, mockUser.password);
        await user.click(loginButton);

        await waitFor(() => {
            expect(store.getState().auth.activeUser).toEqual(mockUser);
        });
    });

    it('should show error message with invalid credentials', async () => {
        const user = userEvent.setup();
        const { store } = renderWithProviders(<LoginPage />, { preloadedState });

        const emailInput = screen.getByPlaceholderText(/email address/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const loginButton = screen.getByRole('button', { name: /log in/i });

        await user.type(emailInput, 'wrong@example.com');
        await user.type(passwordInput, 'wrongpass');
        await user.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText(ERRORS_CODE.USER_NOT_FOUND)).toBeInTheDocument();
            expect(store.getState().auth.activeUser).toBeNull();
        });
    });

    it('should set rememberedUser when Remember me is checked', async () => {
        const user = userEvent.setup();
        const { store } = renderWithProviders(<LoginPage />, { preloadedState });

        const emailInput = screen.getByPlaceholderText(/email address/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
        const loginButton = screen.getByRole('button', { name: /log in/i });

        await user.type(emailInput, mockUser.email);
        await user.type(passwordInput, mockUser.password);
        await user.click(rememberMeCheckbox);
        await user.click(loginButton);

        await waitFor(() => {
            expect(store.getState().auth.activeUser).toEqual(mockUser);
            expect(store.getState().auth.rememberedUser).toEqual(mockUser);
        });
    });
});
