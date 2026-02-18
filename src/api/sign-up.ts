import { api } from "@/lib/axios";

export async function signUp() {
    await api.post('/sign-out')

}