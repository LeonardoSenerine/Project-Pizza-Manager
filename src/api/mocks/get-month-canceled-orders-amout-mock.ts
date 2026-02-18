import { http, HttpResponse } from 'msw'
import { GetMonthCanceledOrdersAmounthResponse } from '../get-month-orders-canceled-amounth'

export const getMounthCanceledOrdersAmountsMock = http.get<never, never, GetMonthCanceledOrdersAmounthResponse>('/metrics/month-canceled-orders-amount', () => {

    return HttpResponse.json({
        amount: 1000000000000,
        diffFromLastMonth: -5,
    })

})
