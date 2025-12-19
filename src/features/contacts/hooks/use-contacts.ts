import { useSuspenseQuery } from "@tanstack/react-query";
import { ContactsService } from "../services/contacts-services";
import type { ContactFilters, ContactSort } from "../types";
import type { Pagination } from "@/types/pagination";
import { useAuth } from "@/components/AuthProvider";

export const useContacts = (params: {
    pagination: Pagination;
    sorting: ContactSort;
    filters: ContactFilters;
}) => {
    const user = useAuth();
    return useSuspenseQuery({
        queryKey: ["contacts", user?.id, params.pagination, params.sorting, params.filters],
        queryFn: () => ContactsService.getContacts({ ...params, userId: user?.id }),
    });
};

