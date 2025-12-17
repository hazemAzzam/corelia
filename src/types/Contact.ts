export type Contact = {
    id: string;
    name: string;
    phoneNumber: string;
    userId: string;
};

export type ContactFilters = Partial<Contact>;