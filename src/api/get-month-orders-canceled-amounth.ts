import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmounthResponse {
    amount: number
    diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmounth() {
    const response = await api.get<GetMonthCanceledOrdersAmounthResponse>(
        '/metrics/month-canceled-orders-amount',
    )
    return response.data
}