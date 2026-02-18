import { getOrdersDetails } from "@/api/get-order-details";
import { OrderStatus } from "@/components/order-status";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OrderDetailsSkeleton } from "./order-details-skeleton";
export interface OrderDetailsProps {
    orderId: string
    open: boolean
}
export function OrderDetails({ orderId, open }: OrderDetailsProps) {
    const { data: order } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrdersDetails({ orderId }),
        enabled: open,
    })

    return (
        <DialogContent className="border-zinc-700"  >
            <DialogHeader>
                <DialogTitle className="text-zinc-200 font-extrabold">Pedido: {orderId}</DialogTitle>
                <DialogDescription className="text-zinc-200">Detalhes do pedido</DialogDescription>
            </DialogHeader>
            {order ? (
                <div className="space-y-6   " >
                    <Table>
                        <TableBody className="  justify-between" >
                            <TableRow className="hover:bg-zinc-800 border-zinc-700">
                                <TableCell className="p-4 text-zinc-200" >Status :</TableCell>
                                <TableCell className=" justify-end flex " >
                                    <OrderStatus status={order.status} />
                                </TableCell>
                            </TableRow>

                            <TableRow className="p-4 border-zinc-700 hover:bg-zinc-800 ">
                                <TableCell className="p-4 text-zinc-200 " >Cliente :</TableCell>
                                <TableCell className="p-4 text-zinc-200 font-bold justify-end flex " >
                                    {order.customer.name}
                                </TableCell>
                            </TableRow>

                            <TableRow className=" border-zinc-700 hover:bg-zinc-800 ">
                                <TableCell className="p-4 text-zinc-200" >Telefone :</TableCell>
                                <TableCell className="p-4 text-zinc-200 font-bold justify-end flex " >
                                    {order.customer.phone ?? 'Não informado'}
                                </TableCell>
                                <Separator className=" bg-zinc-800 " />
                            </TableRow>


                            <TableRow className=" border-zinc-700 hover:bg-zinc-800 ">
                                <TableCell className="p-4 text-zinc-200" >E-mail :</TableCell>
                                <TableCell className="text-zinc-200 p-4 font-bold justify-end flex " >
                                    {order.customer.email}
                                </TableCell>
                            </TableRow>

                            <TableRow className="border-zinc-700 hover:bg-zinc-800 ">
                                <TableCell className="p-4 text-zinc-200" >Realizado há :</TableCell>
                                <TableCell className="p-4 font-bold text-zinc-200 justify-end flex " >
                                    {formatDistanceToNow(order.createdAt, {
                                        locale: ptBR,
                                        addSuffix: true
                                    })}
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

                            {order.orderItems.map(
                                item => {
                                    return (
                                        <TableRow key={item.id} className="border-zinc-700 hover:bg-zinc-800">
                                            <TableCell className="text-zinc-200 p-4 font-bold " >{item.product.name}</TableCell>
                                            <TableCell className="text-zinc-200 p-4 font-bold text-right" >
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell className="text-zinc-200 p-4 font-bold text-right" >
                                                {(item.priceInCents / 100).toLocaleString('pt-br', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </TableCell>
                                            <TableCell className="text-zinc-200 p-4 font-bold text-right" >
                                                {((item.priceInCents * item.quantity) / 100).toLocaleString('pt-br', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </TableCell>

                                        </TableRow>
                                    )
                                }
                            )}

                        </TableBody>
                        <TableFooter>
                            <TableRow className="border-zinc-700 bg-zinc-900" >
                                <TableCell colSpan={3} className="text-zinc-200 p-4 font-extrabold" >Total de pedido</TableCell>
                                <TableCell className=" text-zinc-200 p-4 text-right font-bold" >{(order.totalInCents / 100).toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                </div>
            ) : (
                <OrderDetailsSkeleton />
            )}
        </DialogContent>
    )
}