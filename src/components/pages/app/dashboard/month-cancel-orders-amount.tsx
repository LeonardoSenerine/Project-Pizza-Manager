import { getMonthCanceledOrdersAmounth } from "@/api/get-month-orders-canceled-amounth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthCancelOrders() {
    const { data: monthCanceledOrdesAmounth } = useQuery({
        queryKey: ['metrics', 'canceled-mounth-orders-amount'],
        queryFn: getMonthCanceledOrdersAmounth,
    })
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2" >
                <CardTitle className="text-base font-semibold" >
                    Cancelamento (mês)
                </CardTitle>
                <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent className="space-y-1" >
                {monthCanceledOrdesAmounth ? (
                    <>
                        <span className="text-2xl text-violet-500 font-bold  tracking-tight" >
                            {monthCanceledOrdesAmounth?.amount.toLocaleString('pt-BR')}
                        </span>
                        <p className="text-xs text-zinc-400" >
                            {monthCanceledOrdesAmounth.diffFromLastMonth < 0 ? (
                                <>
                                    <span className="text-emerald-400" >{monthCanceledOrdesAmounth?.diffFromLastMonth}%</span>{' '} em relação ao mês passado
                                </>
                            ) : (
                                <>
                                    <span className="text-red-600" >+{monthCanceledOrdesAmounth?.diffFromLastMonth}%</span>{' '} em relação ao mês passado
                                </>
                            )}
                        </p>
                    </>
                ) : (
                    <MetricCardSkeleton />
                )}
            </CardContent>
        </Card>
    )
}