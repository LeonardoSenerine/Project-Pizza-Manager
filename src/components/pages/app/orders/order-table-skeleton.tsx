
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"


import { Search } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

export function OrderTableSkeleton() {
    return Array.from({ length: 10 }).map((_, i) => {
        return (
            <TableRow key={i}>
                <TableCell className="p-5 ">

                    <Button disabled variant="outline" className="hover:bg-violet-500" size="xs">
                        <Search className="h-3 w-3" />
                        <span className="sr-only" >Detalhes do pedido </span>

                    </Button>


                </TableCell>

                <TableCell className="font-mono text-xs font-medium" ><Skeleton className=" bg-zinc-400 h-4 w-[172px]" /></TableCell>

                <TableCell className="text-muted-foreground" ><Skeleton className="bg-zinc-400 h-4 w-[140px]" /></TableCell>

                <TableCell>
                    <Skeleton className="bg-zinc-400 h-4 w-[110px]" />
                </TableCell>

                <TableCell className="font-bold" ><Skeleton className="bg-zinc-400 h-4 w-[200px]" /></TableCell>

                <TableCell className="font-bold" ><Skeleton className="bg-zinc-400 h-4 w-[64px]" /></TableCell>

                <TableCell>
                    <Skeleton className=" bg-zinc-400 h-4 w-[92px]" />
                </TableCell>

                <TableCell>
                    <Skeleton className="bg-zinc-400 h-4 w-[92px]" />
                </TableCell>
            </TableRow>
        )
    })
}