import { api } from "@/lib/axios";

export interface RegisterBody {
    email: string;
    restaurantName: string
    phone: string
    managerName: string
}
export async function registerRestaurants({
    email,
    managerName,
    phone,
    restaurantName
}: RegisterBody) {
    await api.post('/restaurants', {
        email,
        managerName,
        phone,
        restaurantName
    })
}