import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactsContent } from "../components/ContactsClient";

import { useContactsContext } from "../context/ContactsContext";


export default function ContactsPage() {
  const { filters, setFilters, setPagination } = useContactsContext();

  return (
    <ScrollArea>
      <div className="flex flex-col justify-center items-center gap-5 w-full max-w-4xl mx-auto p-5">
        <h1 className="text-2xl font-bold text-center">Contacts</h1>

        <div className="w-full flex items-center justify-between gap-4">
          <Input
            placeholder="Search by name..."
            value={filters.name}
            onChange={(e) => {
              setFilters({ ...filters, name: e.target.value });
              setPagination((prev) => ({ ...prev, currentPage: 1 }));
            }}
            className="max-w-sm"
          />
        </div>

        <Suspense fallback={<LoadingContacts />}>
          <ContactsContent />
        </Suspense>
      </div>
    </ScrollArea>
  )
}



const LoadingContacts = () => {
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
      {[1, 2, 3, 4, 5].map((i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="h-4 w-4 mx-auto" /></TableCell>
          <TableCell><Skeleton className="h-4 w-32 mx-auto" /></TableCell>
          <TableCell><Skeleton className="h-4 w-24 mx-auto" /></TableCell>
          <TableCell className="flex gap-2 items-center justify-center">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
}
