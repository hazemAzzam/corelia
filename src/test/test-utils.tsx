import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../features/authentication/state/authSlice';
import contactsReducer from '../features/contacts/state/contactsSlice';

// Create a function to set up a fresh store for each test
export const setupStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            auth: authReducer,
            contacts: contactsReducer,
        },
        preloadedState,
    });
};

// Create a unique QueryClient for each test to avoid cache pollution
const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: any;
    store?: ReturnType<typeof setupStore>;
}

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    const queryClient = createTestQueryClient();

    function Wrapper({ children }: { children: React.ReactNode }): ReactElement {
        return (
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <MemoryRouter>
                        {children}
                    </MemoryRouter>
                </Provider>
            </QueryClientProvider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
