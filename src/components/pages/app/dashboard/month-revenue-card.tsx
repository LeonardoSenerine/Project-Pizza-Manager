import { getMonthRevenueOrdersAmounth } from "@/api/get-month-revenue";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthRevenue() {

    const { data: monthRevenueOrdersAmounth } = useQuery({
        queryKey: ['metrics', 'month-revenue'],
        queryFn: getMonthRevenueOrdersAmounth,
    })
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2" >
                <CardTitle className="text-base font-semibold" >
                    Receita total (mês)
                </CardTitle>
                <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent className="space-y-1" >
                {monthRevenueOrdersAmounth ? (
                    <>
                        <span className="text-2xl text-violet-500 font-bold  tracking-tight" >
                            {(monthRevenueOrdersAmounth?.receipt / 100).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })}
                        </span>
                        <p className="text-xs text-zinc-400" >
                            {monthRevenueOrdersAmounth.diffFromLastMonth >= 0 ? (
                                <>
                                    <span className="text-emerald-400" >{monthRevenueOrdersAmounth.diffFromLastMonth}%</span>{' '} em relação ao mês passado
                                </>
                            ) : (
                                <>
                                    <span className="text-red-500" >{monthRevenueOrdersAmounth.diffFromLastMonth}%%</span>{' '} em relação ao mês passado
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