import type { Pagination } from "@/types/pagination";
import type { Contact, ContactFilters, ContactSort } from "../types";

export class ContactsService {
    static async getContacts({ pagination, sorting, filters }: { pagination: Pagination, sorting: ContactSort, filters: ContactFilters }): Promise<{ data: Contact[], totalItems: number }> {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) return { data: [], totalItems: 0 };

        const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");

        const userContacts = contacts.filter((contact: Contact) => contact.userId === user.id);

        const filteredContacts = userContacts
            .filter((contact: Contact) => {
                if (filters?.name) {
                    return contact.name.toLowerCase().includes(filters.name.toLowerCase());
                }
                return true;
            })
            .sort((a: Contact, b: Contact) => {
                const val1 = a[sorting.key];
                const val2 = b[sorting.key];

                if (sorting?.direction === "asc") {
                    return String(val1).localeCompare(String(val2));
                } else if (sorting?.direction === "desc") {
                    return String(val2).localeCompare(String(val1));
                }
                return 0;
            });

        const totalItems = filteredContacts.length;
        const slicedContacts = filteredContacts.slice(
            (pagination.currentPage - 1) * pagination.itemsPerPage,
            pagination.currentPage * pagination.itemsPerPage
        );

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: slicedContacts, totalItems });
            }, 500);
        });
    }

}

