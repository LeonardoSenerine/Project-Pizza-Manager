import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'
import { registerRestaurantsMock } from './register-restaurant-mocks'
import { getDaysOrdersAmountsMock } from './get-day-orders-amount-mock.ts'
import { getMonthOrdersAmountsMock } from './get-month-orders-amount-mock.ts'
import { getMonthRevenueMock } from './get-month-revenue-mock.ts'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock.ts'
import { GetPopularProductsMock } from './get-popular-products-mock.ts'
import { getMounthCanceledOrdersAmountsMock } from './get-month-canceled-orders-amout-mock.ts'
import { getManagedProfileMock } from './get-managed-restaurants-mock.ts'
import { getProfileMock } from './get-profile-mock.ts'
import { updateProfileMock } from './update-profile-mock.ts'
import { getOrdersMock } from './get-orders-mock.ts'
import { getOrdersDetailsMock } from './get-orders-details-mock.ts'
import { aproveOrdersMock } from './approve-order-mock.ts'
import { dispatchOrdersMock } from './dispatch-order-mock.ts'
import { deliverOrdersMock } from './deliver-order-mock.ts'
import { cancelOrdersMock } from './cancel-order-mock.ts'


export const worker = setupWorker(aproveOrdersMock, dispatchOrdersMock, deliverOrdersMock, cancelOrdersMock, getProfileMock, getOrdersDetailsMock, getOrdersMock, updateProfileMock, getManagedProfileMock, getProfileMock, GetPopularProductsMock, getMounthCanceledOrdersAmountsMock, getDailyRevenueInPeriodMock, signInMock, getMonthRevenueMock, registerRestaurantsMock, getDaysOrdersAmountsMock, getMonthOrdersAmountsMock)

export async function enableMSW() {
    if (env.MODE != 'test') {
        return
    }
    await worker.start()
}