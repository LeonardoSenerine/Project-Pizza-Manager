import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrders } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { approveOrders } from "@/api/approve-order";
import { deliverOrders } from "@/api/deliver-order";
import { dispatchOrders } from "@/api/dispatch-order";
export interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const queryClient = useQueryClient()

    function upDateOrderStatusOnCache(orderId: string, status: OrderStatus) {
        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders'],
        })
        ordersListCache.forEach(([cacheKey, cacheData]) => {
            if (!cacheData) {
                return
            }
            queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                ...cacheData,
                orders: cacheData.orders.map(order => {
                    if (order.orderId === orderId) {
                        return { ...order, status }
                    }
                    return order
                }
                ),
            })
        })
    }

    const { mutateAsync: cancelOrdersFn, isPending: isCancelingOrder } = useMutation({
        mutationFn: cancelOrders,
        async onSuccess(_, { orderId }) {
            upDateOrderStatusOnCache(orderId, 'canceled')
        },
    })
    const { mutateAsync: deliverOrdersFn, isPending: isDeliveredOrder } = useMutation({
        mutationFn: deliverOrders,
        async onSuccess(_, { orderId }) {
            upDateOrderStatusOnCache(orderId, 'delivered')
        },
    })
    const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
        mutationFn: approveOrders,
        async onSuccess(_, { orderId }) {
            upDateOrderStatusOnCache(orderId, 'processing')
        },
    })
    const { mutateAsync: dispatchOrdersFn, isPending: isDispatchingOrder } = useMutation({
        mutationFn: dispatchOrders,
        async onSuccess(_, { orderId }) {
            upDateOrderStatusOnCache(orderId, 'delivering')
        },
    })

    return (

        <TableRow className="hover:border-b-violet-600" >
            <TableCell className="p-5 ">
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild >
                        <Button variant="outline" className="hover:bg-violet-500" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only" >Detalhes do pedido </span>

                        </Button>
                    </DialogTrigger>
                    <DialogContent  ><OrderDetails open={isDetailsOpen} orderId={order.orderId} /></DialogContent>
                </Dialog>
            </TableCell>

            <TableCell className="font-mono text-xs font-medium" >{order.orderId}</TableCell>

            <TableCell className="text-muted-foreground" >{formatDistanceToNow(order.createdAt, {
                locale: ptBR,
                addSuffix: true
            })}</TableCell>

            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>

            <TableCell className="font-bold" >{order.customerName}</TableCell>

            <TableCell className="font-bold" >{(order.total / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</TableCell>

            <TableCell>
                {order.status === 'pending' && (
                    <Button disabled={isApprovingOrder} onClick={() => approveOrderFn({ orderId: order.orderId })} className="hover:bg-violet-500" variant="outline" size="xs" >
                        <ArrowRight className="h-3 w-3 mr-2" />
                        Aprovar
                    </Button>
                )}


                {order.status === 'processing' && (
                    <Button disabled={isDispatchingOrder} onClick={() => dispatchOrdersFn({ orderId: order.orderId })} className="hover:bg-violet-500" variant="outline" size="xs" >
                        <ArrowRight className="h-3 w-3 mr-2" />
                        Em entrega
                    </Button>
                )}


                {order.status === 'delivering' && (
                    <Button disabled={isDeliveredOrder} onClick={() => deliverOrdersFn({ orderId: order.orderId })} className="hover:bg-violet-500" variant="outline" size="xs" >
                        <ArrowRight className="h-3 w-3 mr-2" />
                        Entregue
                    </Button>
                )}
            </TableCell>

            <TableCell>
                <Button onClick={() => cancelOrdersFn({ orderId: order.orderId })} disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder} className="hover:bg-violet-500 " variant="outline" size="xs" >
                    <X className="h-3 w-3 mr-2" />
                    Cancelar</Button>
            </TableCell>
        </TableRow >

    )
}