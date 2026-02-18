import { http, HttpResponse } from 'msw'
import { GetMounthOrdersAmountResponse } from '../get-month-orders-amount'

export const getMonthOrdersAmountsMock = http.get<never, never, GetMounthOrdersAmountResponse>('/metrics/month-orders-amount', () => {

    return HttpResponse.json({
        amount: 213123,
        diffFromLastMonth: 10000
    })

})
