import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "../types";

interface ContactsState {
    contacts: Contact[];
}

const getStoredContacts = (): Contact[] => {
    const stored = localStorage.getItem("contacts");
    if (!stored) return [];
    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const initialState: ContactsState = {
    contacts: getStoredContacts(),
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            const contact = action.payload;
            contact.id = Date.now().toString();
            state.contacts.push(contact);
        },
        updateContact: (state, action: PayloadAction<{ id: string, contact: Contact }>) => {
            const index = state.contacts.findIndex((c) => c.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload.contact;
            }
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter((c) => c.id !== action.payload);
        },
    },
});

export const {
    addContact,
    updateContact,
    deleteContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
