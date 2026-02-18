import { api } from '@/lib/axios'

export interface CancelOrdersParams {
    orderId: string
}

export async function cancelOrders({ orderId }: CancelOrdersParams) {
    await api.patch(`/orders/${orderId}/cancel`)

}