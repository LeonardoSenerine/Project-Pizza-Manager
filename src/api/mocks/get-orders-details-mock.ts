import { http, HttpResponse } from 'msw'
import { GetOrdersDetailsParams, GetOrdersDetailsResponse } from '../get-order-details'


export const getOrdersDetailsMock = http.get<GetOrdersDetailsParams, never, GetOrdersDetailsResponse>('/orders/:orderId', ({ params }) => {

    return HttpResponse.json({
        id: params.orderId,
        createdAt: new Date().toISOString(),
        totalInCents: 699669966969,
        customer: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1231231231'
        },
        orderItems: [
            {
                id: 'order-item-1',
                priceInCents: 1092103,
                quantity: 12,
                product: {
                    name: 'Pau de borracha'
                },
            }
            , {
                id: 'order-item-312',
                priceInCents: 103,
                quantity: 112312312,
                product: {
                    name: 'Pau de latex'
                },
            },
            {
                id: 'order-item-112',
                priceInCents: 1092,
                quantity: 1132,
                product: {
                    name: 'Pau de desodarante'
                },
            }
        ],
        status: 'pending'
    })

})
