import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { FormProvider } from "react-hook-form"
import type { Contact } from "../types"

export const ContactForm = {
    Form: ({ children, form, onSubmit }: { children: React.ReactNode, form: any, onSubmit: (data: Contact) => void }) => {
        return <FormProvider {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {children}
            </form>
        </FormProvider>
    },
    Content: ({ children }: { children: React.ReactNode }) => {
        return <div className="space-y-5">{children}</div>
    },
    Footer: ({ children }: { children: React.ReactNode }) => {
        return <div className="flex justify-end gap-2">
            <DialogClose asChild>
                <Button variant={"secondary"}>Close</Button>
            </DialogClose>
            {children}
        </div>
    }
}