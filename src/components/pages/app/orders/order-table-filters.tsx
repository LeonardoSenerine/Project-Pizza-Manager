import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
const orderFiltersSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional()
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>
export function OrderTableFilters() {

    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    const { register, handleSubmit, control, reset } = useForm<OrderFiltersSchema>({
        resolver: zodResolver(orderFiltersSchema),
        defaultValues: {
            orderId: orderId ?? '',
            customerName: customerName ?? '',
            status: status ?? 'all',
        }
    })

    function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
        setSearchParams(state => {
            if (orderId) {
                state.set('orderId', orderId)
            } else {
                state.delete('orderId')
            }
            if (customerName) {
                state.set('customerName', customerName)
            } else {
                state.delete('customerName')
            }
            if (status) {
                state.set('status', status)
            } else {
                state.delete('status')
            }
            state.set('page', '1')
            return state
        })


    }
    function handleClearFilters() {
        setSearchParams((state) => {
            state.delete('orderId')
            state.delete('customerName')
            state.delete('status')
            state.delete('page', '1')
            return state
        })
        reset({
            orderId: '',
            customerName: '',
            status: '',
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
                <span className="text-sm font-semibold" >Filtros</span>
                <Input
                    placeholder="ID do pedido"
                    className="h-8 w-auto "
                    {...register('orderId')}
                />
                <Input
                    placeholder="Nome do cliente"
                    className="h-8 w-[320px] "
                    {...register('customerName')}
                />
                <Controller
                    name="status"
                    control={control}
                    render={({ field: { name, onChange, value, disabled } }) => {
                        return (
                            <Select defaultValue="all" name={name} onValueChange={onChange} disabled={disabled} value={value} >
                                <SelectTrigger className="h-8 w-[180px] " >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="text-foreground bg-current font-bold"  >
                                    <SelectItem className="border bg-zinc-400 hover:opacity-80 " value="all" >Todos os status</SelectItem>
                                    <SelectItem className="border bg-zinc-400 mt-1.5 hover:opacity-80 " value="pending" >Pendente</SelectItem>
                                    <SelectItem className="border  bg-zinc-400 mt-1.5 hover:opacity-80 " value="canceled" >Cancelado</SelectItem>
                                    <SelectItem className="border bg-zinc-400 mt-1.5 hover:opacity-80 " value="processing" >Em Preparo</SelectItem>
                                    <SelectItem className="border bg-zinc-400 mt-1.5 hover:opacity-80 " value="delivering" >Em Entrega</SelectItem>
                                    <SelectItem className="border bg-zinc-400 mt-1.5 hover:opacity-80 " value="delivered" >Entregue</SelectItem>
                                </SelectContent>
                            </Select>
                        )
                    }}
                />



                <Button className="hover:bg-violet-400" type="submit" variant='secondary' size="xs" >
                    <Search className="h-4 w-4 mr-2" />
                    Filtrar resultados
                </Button>
                <Button onClick={handleClearFilters} className="hover:bg-violet-400" type="button" variant='outline' size="xs" >
                    <X className="h-4 w-4 mr-2" />
                    Remover filtros
                </Button>
            </form>
        </div>
    )
}