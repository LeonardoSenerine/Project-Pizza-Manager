import { api } from "@/lib/axios";

export interface GetMonthRevenueOrdersAmounthResponse {
    receipt: number
    diffFromLastMonth: number
}

export async function getMonthRevenueOrdersAmounth() {
    const response = await api.get<GetMonthRevenueOrdersAmounthResponse>(
        '/metrics/month-receipt',
    )
    return response.data
}