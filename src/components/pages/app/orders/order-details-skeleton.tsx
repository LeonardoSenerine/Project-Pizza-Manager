import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@radix-ui/react-separator"

export function OrderDetailsSkeleton() {
    return (
        <div className="space-y-6   " >
            <Table>
                <TableBody className="  justify-between" >
                    <TableRow className="hover:bg-zinc-800 border-zinc-700">
                        <TableCell className="p-4 text-zinc-200" >Status :</TableCell>
                        <TableCell className=" justify-end flex " >
                            <Skeleton className="bg-zinc-400 h-5 w-20" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="p-4 border-zinc-700 hover:bg-zinc-800 ">
                        <TableCell className="p-4 text-zinc-200 " >Cliente :</TableCell>
                        <TableCell className="p-4 text-zinc-200 font-bold justify-end flex " >
                            <Skeleton className="bg-zinc-400 h-5 w-[164px]" />
                        </TableCell>
                    </TableRow>

                    <TableRow className=" border-zinc-700 hover:bg-zinc-800 ">
                        <TableCell className="p-4 text-zinc-200" >Telefone :</TableCell>
                        <TableCell className="p-4 text-zinc-200 font-bold justify-end flex " >
                            <Skeleton className="bg-zinc-400 h-5 w-[140px]" />
                        </TableCell>
                        <Separator className=" bg-zinc-800 " />
                    </TableRow>


                    <TableRow className=" border-zinc-700 hover:bg-zinc-800 ">
                        <TableCell className="p-4 text-zinc-200" >E-mail :</TableCell>
                        <TableCell className="text-zinc-200 p-4 font-bold justify-end flex " >
                            <Skeleton className="bg-zinc-400 h-5 w-[200px]" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-zinc-700 hover:bg-zinc-800 ">
                        <TableCell className="p-4 text-zinc-200" >Realizado há :</TableCell>
                        <TableCell className="p-4 font-bold text-zinc-200 justify-end flex " >
                            <Skeleton className="bg-zinc-400 h-5 w-[148px]" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table>
                <TableHeader>
                    <TableRow className="border-zinc-700" >
                        <TableHead className="text-zinc-200 p-4" >Produto</TableHead>
                        <TableHead className="text-zinc-200 text-right p-4" >Qtd.</TableHead>
                        <TableHead className="text-zinc-200 text-right p-4" >Preço</TableHead>
                        <TableHead className="text-zinc-200 text-right p-4" >Subtotal</TableHead>
                    </TableRow>

                </TableHeader>
                <TableBody>

                    {Array.from({ length: 2 }).map((_, i) => {
                        return (
                            <TableRow key={i} className="border-zinc-700 hover:bg-zinc-800">
                                <TableCell className="text-zinc-200 p-4 font-bold " ><Skeleton className="bg-zinc-400 h-5 w-[140px] ml-auto " /></TableCell>
                                <TableCell className="text-zinc-200 p-4 font-bold text-right" >
                                    <Skeleton className="bg-zinc-400 h-5 w-3 ml-auto " />
                                </TableCell>
                                <TableCell className="text-zinc-200 p-4 font-bold text-right" >
                                    <Skeleton className="bg-zinc-400 h-5 w-12 ml-auto" />
                                </TableCell>
                                <TableCell className="text-zinc-200 p-4 font-bold text-right" >
                                    <Skeleton className="bg-zinc-400 h-5 w-12 ml-auto" />
                                </TableCell>

                            </TableRow>
                        )
                    }
                    )}

                </TableBody>
                <TableFooter>
                    <TableRow className="border-zinc-700 bg-zinc-900" >
                        <TableCell colSpan={3} className="text-zinc-200 p-4 font-extrabold" >Total de pedido</TableCell>
                        <TableCell className=" text-zinc-200 p-4 text-right font-bold" ><Skeleton className="bg-zinc-400 h-5 w-20" /></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </div>
    )
}