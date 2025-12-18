import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { ContactFilters, ContactSort } from "../types";
import type { Pagination } from "@/types/pagination";

interface ContactsContextType {
    pagination: Pagination;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    sorting: ContactSort;
    setSorting: React.Dispatch<React.SetStateAction<ContactSort>>;
    filters: ContactFilters;
    setFilters: React.Dispatch<React.SetStateAction<ContactFilters>>;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const ContactsProvider = ({ children }: { children: ReactNode }) => {
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        itemsPerPage: 5,
    });

    const [sorting, setSorting] = useState<ContactSort>({
        key: "name",
        direction: "asc",
    });

    const [filters, setFilters] = useState<ContactFilters>({
        name: "",
    });

    return (
        <ContactsContext.Provider
            value={{
                pagination,
                setPagination,
                sorting,
                setSorting,
                filters,
                setFilters,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};

export const useContactsContext = () => {
    const context = useContext(ContactsContext);
    if (context === undefined) {
        throw new Error("useContactsContext must be used within a ContactsProvider");
    }
    return context;
};
