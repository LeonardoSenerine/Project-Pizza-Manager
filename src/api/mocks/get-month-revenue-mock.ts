import { http, HttpResponse } from 'msw'
import { GetMonthRevenueOrdersAmounthResponse } from '../get-month-revenue'


export const getMonthRevenueMock = http.get<never, never, GetMonthRevenueOrdersAmounthResponse>('/metrics/month-receipt', () => {

    return HttpResponse.json({
        receipt: 100000000000000000,
        diffFromLastMonth: 10,
    })

})
