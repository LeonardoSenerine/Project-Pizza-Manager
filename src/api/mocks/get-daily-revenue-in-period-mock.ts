import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'


export const getDailyRevenueInPeriodMock = http.get<never, never, GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', () => {

    return HttpResponse.json([
        { date: "10/03/2025", receipt: 800 },
        { date: "10/03/2025", receipt: 900 },
        { date: "10/03/2025", receipt: 50 },
        { date: "10/03/2025", receipt: 1000 },
        { date: "10/03/2025", receipt: 200 },
        { date: "10/03/2025", receipt: 9 },
    ])
})
