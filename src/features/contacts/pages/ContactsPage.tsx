import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { RootState } from "@/state/store";
import type { Contact } from "@/types/Contact";
import { CirclePlus, Pen, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NewContactDialog } from "../components/NewContactDialog";
import { useAuth } from "@/components/AuthProvider";
import { deleteContact } from "@/state/contacts/contactsSlice";
import { EditContactDialog } from "../components/EditContactDialog";

export default function ContactsPage() {
  const user = useAuth();
  const { contacts } = useSelector((state: RootState) => state.contacts);

  const filteredContacts = contacts.filter((contact) => contact.userId === user?.id)

  return (
    <ScrollArea>
      <div className="flex flex-col justify-center items-center gap-5 w-full">
        <h1 className="text-lg font-bold text-center">Contacts</h1>
        <ContactControls contactsLength={filteredContacts.length} />
        <ContactsTable contacts={filteredContacts} />
      </div>
    </ScrollArea>
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
  const user = useAuth();
  const dispatch = useDispatch();

  return <Table className="**:text-center border">
    <TableHeader>
      <TableRow className="bg-muted *:font-bold">
        <TableHead>#</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {contacts.filter((contact) => contact.userId === user?.id).map((contact, index) => (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{contact.name}</TableCell>
          <TableCell>{contact.phoneNumber}</TableCell>
          <TableCell className="flex gap-2 items-center justify-center">
            <EditContactDialog contact={contact}>
              <Button variant={"ghost"}>
                <Pen className="text-blue-500" />
              </Button>
            </EditContactDialog>
            <Button variant={"ghost"} onClick={() => dispatch(deleteContact(contact.id))}>
              <Trash className="text-red-500" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
}