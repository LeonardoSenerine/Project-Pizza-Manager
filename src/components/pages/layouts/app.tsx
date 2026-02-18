
import { Header } from "@/components/header";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {

    const navigate = useNavigate() //função quie apenas muda para outra pagina caso seja chamada

    useEffect(() => {
        const interceptorId = api.interceptors.response.use( //basicamente é um interceptador de resposta que faz a ação sempre que conversamos com o back end, ele capta esta respota, tipo uma blitz
            (response) => response,//caso fique deboa ele so passa a resposta sem mudar nada
            (error) => { //tratamento de erro
                if (isAxiosError /*função do proprio axios para ter certeza de que é erro dele*/(error)) {
                    const status = error.response?.status
                    const code = error.response?.data.code

                    if (status === 401 && code === 'UNHAUTORIZED') {
                        navigate('/sign-in', { replace: true })
                    } else {
                        throw error
                    }
                }
            },
        )
        return () => {
            api.interceptors.response.eject(interceptorId)
        }
    }, [navigate])

    return (
        <div className="flex antialised min-h-scream flex-col " >
            <Header />

            <div className="flex flex-col flex-1 gap-4 p-8 " >
                <Outlet />
            </div>
        </div>
    )
}