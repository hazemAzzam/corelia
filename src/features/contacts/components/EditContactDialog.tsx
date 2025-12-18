import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ContactForm } from "./ContactForm"
import { useForm } from "react-hook-form"
import { ControlledInput } from "@/components/ControlledInput"
import { Button } from "@/components/ui/button"
import { useUpdateContactMutation } from "../hooks"
import { useAuth } from "@/components/AuthProvider"
import type { Contact } from "../types"
import { useEffect } from "react"

export const EditContactDialog = ({ children, contact }: { children: React.ReactNode, contact: Contact }) => {
    const user = useAuth();
    const { mutate: update, isPending } = useUpdateContactMutation();
    const form = useForm();

    useEffect(() => {
        form.reset(contact);
    }, [contact]);

    const onSubmit = (data: Contact) => {
        update({ id: contact.id, contact: data });
        form.reset();
    }

    return <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Contact</DialogTitle>
                <DialogDescription>
                    Update the contact information below.
                </DialogDescription>
            </DialogHeader>
            <ContactForm.Form form={form} onSubmit={onSubmit}>
                <ContactForm.Content>
                    <ControlledInput name="userId" value={user?.id} hidden />
                    <ControlledInput name="name" placeholder="Enter Contact Name" label="Name" className="p-5" />
                    <ControlledInput name="phoneNumber" placeholder="Enter phone number (e.g., +201234567890)" label="Phone Number" className="p-5" />
                </ContactForm.Content>
                <ContactForm.Footer>
                    <Button type="submit" className="bg-blue-500" disabled={isPending}>
                        {isPending ? "Updating..." : "Update Contact"}
                    </Button>
                </ContactForm.Footer>
            </ContactForm.Form>
        </DialogContent>
    </Dialog>
}