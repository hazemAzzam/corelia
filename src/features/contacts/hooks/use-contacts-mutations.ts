import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addContact, updateContact, deleteContact } from "../state/contactsSlice";
import type { Contact } from "../types";
import { toast } from "sonner";

export const useCreateContact = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newContact: Omit<Contact, "id">) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return newContact;
        },
        onSuccess: (data) => {
            const contactWithId = { ...data, id: Date.now().toString() } as Contact;
            dispatch(addContact(contactWithId));

            queryClient.invalidateQueries({ queryKey: ["contacts"] });

            toast.success("Contact added successfully");
        },
        onError: () => {
            toast.error("Failed to add contact");
        },
    });
};

export const useUpdateContactMutation = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, contact }: { id: string; contact: Contact }) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return { id, contact };
        },
        onSuccess: ({ id, contact }) => {
            dispatch(updateContact({ id, contact }));

            queryClient.invalidateQueries({ queryKey: ["contacts"] });

            toast.success("Contact updated successfully");
        },
        onError: () => {
            toast.error("Failed to update contact");
        },
    });
};

export const useDeleteContactMutation = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return id;
        },
        onSuccess: (id) => {
            dispatch(deleteContact(id));

            queryClient.invalidateQueries({ queryKey: ["contacts"] });

            toast.success("Contact deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete contact");
        },
    });
};
