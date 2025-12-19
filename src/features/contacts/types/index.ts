import z from "zod";

export const ContactSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    phoneNumber: z.string().min(11, "Phone number must be at least 11 characters long"),
});

export type Contact = z.infer<typeof ContactSchema>;

export type ContactFilters = Partial<Pick<Contact, "name">>;

export type ContactSort = {
    key: keyof Contact,
    direction: "asc" | "desc"
}