import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";
import { getDayOrdersAmount } from "@/api/get-day-orders-amount";

export function DayOrdersAmount() {
    const { data: dayOrdersAmount } = useQuery({
        queryKey: ['metrics', 'day-orders-amount'],
        queryFn: getDayOrdersAmount,
    })
    return (
        <Card  >
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2" >
                <CardTitle className="text-base font-semibold" >
                    Pedidos (dia)
                </CardTitle>
                <Utensils className="  h-4 w-4" />
            </CardHeader>
            <CardContent className="space-y-1" >
                {dayOrdersAmount ? (
                    <>
                        <span className="text-2xl text-violet-500 font-bold  tracking-tight" >
                            {dayOrdersAmount.amount.toLocaleString('pt-BR')}
                        </span>
                        <p className="text-xs text-zinc-400" >
                            {dayOrdersAmount.diffFromYesterday > 0 ? (
                                <>
                                    <span className="text-emerald-600">+{dayOrdersAmount.diffFromYesterday}% </span>{' '}
                                    em relação a ontem
                                </>
                            ) : (
                                <>
                                    <span className="text-red-600">{dayOrdersAmount.diffFromYesterday}%</span>{' '}
                                    em relação a ontem
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