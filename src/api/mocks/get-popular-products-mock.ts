import { http, HttpResponse } from 'msw'
import { GetPopularProductsResponse } from '../get-popular-products'



export const GetPopularProductsMock = http.get<never, never, GetPopularProductsResponse>('/metrics/popular-products', () => {

    return HttpResponse.json([
        { product: "Pizza 01", amount: 60 },
        { product: "Pizza 02", amount: 3 },
        { product: "Pizza 03", amount: 8 },
        { product: "Pizza 04", amount: 40 },
        { product: "Pizza 05", amount: 100 },
        { product: "Pizza 06", amount: 9 },
    ])
})
