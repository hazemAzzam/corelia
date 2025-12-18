import { TableHead, TableRow } from "./ui/table"
import { ArrowUpDown } from "lucide-react";

export const SortableHeaders = ({ headers, sort, setSort }: { headers: string[], sort: { key: string, direction: "asc" | "desc" }, setSort: (sort: { key: string, direction: "asc" | "desc" }) => void }) => {
    return <TableRow>
        {headers.map((header, index) => <TableHead key={index} onClick={() => setSort({ key: header, direction: sort.key === header ? (sort.direction === "asc" ? "desc" : "asc") : "asc" })}>
            {header}
            {sort.key === header ? <ArrowUpDown /> : null}
        </TableHead>)}
    </TableRow>
}