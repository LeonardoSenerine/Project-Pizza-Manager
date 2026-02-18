import { getMounthOrdersAmount } from "@/api/get-month-orders-amount";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthOrdersAmount() {
    const { data: monthOrdersAmount } = useQuery({
        queryKey: ['metrics', 'month-orders-amount'],
        queryFn: getMounthOrdersAmount,
    })
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2" >
                <CardTitle className="text-base font-semibold" >
                    Pedidos (mês)
                </CardTitle>
                <Utensils className="h-4 w-4" />
            </CardHeader>
            <CardContent className="space-y-1" >
                {monthOrdersAmount ? (
                    <>
                        <span className="text-2xl text-violet-500 font-bold  tracking-tight" >
                            {monthOrdersAmount.amount.toLocaleString('pt-BR')}
                        </span>

                        <p className="text-xs text-zinc-400" >
                            {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                                <>
                                    <span className="text-emerald-600" >+{monthOrdersAmount.diffFromLastMonth}%</span>{' '} em relação ao mês passado
                                </>
                            ) : (
                                <>
                                    <span className="text-red-600" >{monthOrdersAmount.diffFromLastMonth}%</span>{' '} em relação ao mês passado
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