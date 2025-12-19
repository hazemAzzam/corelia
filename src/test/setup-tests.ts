import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Runs a cleanup after each test case
afterEach(() => {
    cleanup();
});

// Mock ResizeObserver for Radix UI components
class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
