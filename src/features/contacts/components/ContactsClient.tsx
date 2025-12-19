import type { Contact } from "../types";


import { useContacts, useDeleteContactMutation } from "../hooks";

import { Button } from "@/components/ui/button";
import { CirclePlus, Pen, Trash, UserX } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { AppPagination } from "@/components/AppPagination";
import { useContactsContext } from "../context/ContactsContext";
import { NewContactDialog } from "./NewContactDialog";
import { EditContactDialog } from "./EditContactDialog";

export const ContactsContent = () => {
    const { pagination, setPagination, sorting, filters } = useContactsContext();

    const { data: { data: contacts, totalItems } } = useContacts({
        pagination,
        sorting,
        filters,
    });

    return (
        <div className="flex flex-col gap-5 w-full">
            <ContactControls contactsLength={totalItems} />
            {contacts && contacts.length > 0 ? (
                <>
                    <ContactsTable contacts={contacts} />
                    <AppPagination
                        currentPage={pagination.currentPage}
                        totalItems={totalItems}
                        itemsPerPage={pagination.itemsPerPage}
                        onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
                        onItemsPerPageChange={(itemsPerPage) => setPagination(prev => ({ ...prev, itemsPerPage, currentPage: 1 }))}
                    />

                </>
            ) : (
                <EmptyContacts />
            )}
        </div>
    )
}




const ContactControls = ({ contactsLength }: { contactsLength: number }) => {
    return <div className="flex items-center justify-between w-full">
        <p className="bg-muted h-full px-5 py-2">You have {contactsLength} contacts</p>
        <NewContactDialog>
            <Button className="bg-blue-500">
                <CirclePlus />
                Add Contact
            </Button>
        </NewContactDialog>
    </div>
}

const ContactsTable = ({ contacts }: { contacts: Contact[] }) => {
    const { mutate: deleteContact, isPending: isDeleting } = useDeleteContactMutation();
    const { sorting, setSorting } = useContactsContext();

    const handleSort = (key: keyof Contact) => {
        setSorting((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    return <Table className="**:text-center border">
        <TableHeader>
            <TableRow className="bg-muted *:font-bold">
                <TableHead>#</TableHead>
                <TableHead
                    className="cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("name")}
                >
                    <div className="flex items-center justify-center gap-1">
                        Name
                        {sorting.key === "name" && (
                            <span className="text-xs">{sorting.direction === "asc" ? "↑" : "↓"}</span>
                        )}
                    </div>
                </TableHead>
                <TableHead
                    className="cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => handleSort("phoneNumber")}
                >
                    <div className="flex items-center justify-center gap-1">
                        Phone
                        {sorting.key === "phoneNumber" && (
                            <span className="text-xs">{sorting.direction === "asc" ? "↑" : "↓"}</span>
                        )}
                    </div>
                </TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {contacts.map((contact, index) => (
                <TableRow key={contact.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                    <TableCell className="flex gap-2 items-center justify-center">
                        <EditContactDialog contact={contact}>
                            <Button variant={"ghost"}>
                                <Pen className="text-blue-500" />
                            </Button>
                        </EditContactDialog>
                        <Button
                            variant={"ghost"}
                            onClick={() => deleteContact(contact.id)}
                            disabled={isDeleting}
                        >
                            <Trash className={isDeleting ? "text-gray-400" : "text-red-500"} />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}



const EmptyContacts = () => {
    return (
        <Empty className="w-full border-2 border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <UserX />
                </EmptyMedia>
                <EmptyTitle>No contacts found</EmptyTitle>
                <EmptyDescription>
                    You haven't added any contacts yet. Start by clicking "Add Contact".
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}