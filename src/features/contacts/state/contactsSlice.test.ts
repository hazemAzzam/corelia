import reducer, { addContact, deleteContact } from './contactsSlice';
import type { Contact } from '../types';

describe('contactsSlice', () => {
    const mockContact: Contact = {
        id: Date.now().toString(),
        name: 'Hazem Azzam',
        phoneNumber: '01142221039',
        userId: '123'
    }

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();

        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-01'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return the initial state', () => {
        const state = reducer(undefined, { type: 'unknown' });
        expect(state.contacts).toEqual([]);
    });

    it('should handle addContact', () => {
        const newContact: Contact = mockContact;
        const action = addContact(newContact);
        const state = reducer(undefined, action);

        expect(state.contacts[0]).toStrictEqual({ ...newContact });
    });

    it('should handle deleteContact', () => {
        const initialState = {
            contacts: [mockContact],
        };
        const action = deleteContact(mockContact.id!);
        const state = reducer(initialState, action);

        expect(state.contacts).toHaveLength(0);
    });
});
