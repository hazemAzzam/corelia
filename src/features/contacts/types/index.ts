export type Contact = {
    id: string;
    name: string;
    phoneNumber: string;
    userId: string;
};

export type ContactFilters = Partial<Contact>;

export type ContactSort = {
    key: keyof Contact,
    direction: "asc" | "desc"
}