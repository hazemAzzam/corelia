import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ContactForm } from "./ContactForm"
import { useForm } from "react-hook-form"
import { ControlledInput } from "@/components/ControlledInput"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { addContact } from "@/state/contacts/contactsSlice"
import { useAuth } from "@/components/AuthProvider"

export const NewContactDialog = ({ children }: { children: React.ReactNode }) => {
    const user = useAuth();
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            userId: user?.id,
            name: "",
            phoneNumber: "",
        },
    });

    const onSubmit = (data: any) => {
        dispatch(addContact(data));
        form.reset();
    }

    return <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
            </DialogHeader>
            <ContactForm.Form form={form} onSubmit={onSubmit}>
                <ContactForm.Content>
                    <ControlledInput name="name" placeholder="Enter Contact Name" label="Name" className="p-5" />
                    <ControlledInput name="phoneNumber" placeholder="Enter phone number (e.g., +201234567890)" label="Phone Number" className="p-5" />
                </ContactForm.Content>
                <ContactForm.Footer>
                    <Button type="submit" className="bg-blue-500">Add Contact</Button>
                </ContactForm.Footer>
            </ContactForm.Form>
        </DialogContent>
    </Dialog>
}