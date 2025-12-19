import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { ControlledInput } from "@/components/ControlledInput"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/AuthProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateContact } from "../hooks"
import { ContactSchema, type Contact } from "../types"
import { ContactForm } from "./ContactForm"

export const NewContactDialog = ({ children }: { children: React.ReactNode }) => {
    const user = useAuth();
    const { mutate: create, isPending } = useCreateContact();
    const form = useForm<Contact>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            userId: user?.id,
            name: "",
            phoneNumber: "",
        },
    });

    const onSubmit = (data: Contact) => {
        create(data);
        form.reset();
    }

    return <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                    Fill in the details below to add a new contact to your list.
                </DialogDescription>
            </DialogHeader>
            <ContactForm.Form form={form} onSubmit={onSubmit}>
                <ContactForm.Content>
                    <ControlledInput name="name" placeholder="Enter Contact Name" label="Name" className="p-5" />
                    <ControlledInput name="phoneNumber" placeholder="Enter phone number (e.g., +201234567890)" label="Phone Number" className="p-5" />
                </ContactForm.Content>
                <ContactForm.Footer>
                    <Button type="submit" className="bg-blue-500" disabled={isPending}>
                        {isPending ? "Adding..." : "Add Contact"}
                    </Button>
                </ContactForm.Footer>
            </ContactForm.Form>
        </DialogContent>
    </Dialog>
}