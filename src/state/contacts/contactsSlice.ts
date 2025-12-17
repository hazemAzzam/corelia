import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Contact, ContactFilters } from "../../types/Contact";
import { useAuth } from "@/components/AuthProvider";

interface ContactsState {
    contacts: Contact[];
    searchQuery: string;
    filters: ContactFilters | null;
    currentPage: number;
    itemsPerPage: number;
}

const initialState: ContactsState = {
    contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
    searchQuery: "",
    filters: null,
    currentPage: 1,
    itemsPerPage: 5,
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            const contact = action.payload;
            contact.id = Date.now().toString();

            const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");

            contacts.push(contact);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            state.contacts = contacts;
        },
        updateContact: (state, action: PayloadAction<{ id: string, contact: Contact }>) => {
            const index = state.contacts.findIndex((c) => c.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload.contact;
            }

            localStorage.setItem("contacts", JSON.stringify(state.contacts));
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter((c) => c.id !== action.payload);

            localStorage.setItem("contacts", JSON.stringify(state.contacts));
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
});

export const {
    addContact,
    updateContact,
    deleteContact,
    setSearchQuery,
    setCurrentPage,
} = contactsSlice.actions;

export default contactsSlice.reducer;
