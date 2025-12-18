import { useSuspenseQuery } from "@tanstack/react-query";
import { ContactsService } from "../services/contacts-services";
import type { ContactFilters, ContactSort } from "../types";
import type { Pagination } from "@/types/pagination";

export const useContacts = (params: {
    pagination: Pagination;
    sorting: ContactSort;
    filters: ContactFilters;
}) => {
    return useSuspenseQuery({
        queryKey: ["contacts", params],
        queryFn: () => ContactsService.getContacts(params),
    });
};

