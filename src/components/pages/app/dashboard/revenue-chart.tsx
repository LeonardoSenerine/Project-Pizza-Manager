import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import {
    ResponsiveContainer, LineChart, Line, YAxis,
    XAxis,
    CartesianGrid
} from 'recharts'
import colors from 'tailwindcss/colors'


export function RevenueChart() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    })
    const { data: dailyRevenueInPeriod } = useQuery({
        queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
        queryFn: () => getDailyRevenueInPeriod({
            from: dateRange?.from,
            to: dateRange?.to,
        })
    })
    //função que monitora a data {dailyRevenueInPeriod} e toda vez q ela alterar
    const chartData = useMemo(() => {
        return dailyRevenueInPeriod?.map/*como ele tem q passar a variavel, ele refaz ela com o map*/(chartItem /*variavel temporaria, pode ser qualquer nome*/ => {
            return {
                date: chartItem.date,
                receipt: chartItem.receipt / 100
            }
        })
    }, [dailyRevenueInPeriod])
    return (

        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8" >
                <div className="space-y-1" >
                    <CardTitle className="text-base font-medium" >
                        Receita no período
                    </CardTitle>
                    <CardDescription className="text-zinc-400" >
                        Receita diaria no periodo
                    </CardDescription>
                </div>

                <div className="flex items-center gap-3" >
                    <Label>
                        Periodo
                    </Label >
                    <DatePickerWithRange className="hover:bg-violet-500" date={dateRange} onDateChange={setDateRange} />
                </div>
            </CardHeader>
            <CardContent>
                {chartData ? (
                    <ResponsiveContainer width="100%" height={248} >
                        <LineChart data={chartData} style={{ fontSize: 12 }} >
                            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

                            <YAxis

                                axisLine={false}
                                tickLine={false}
                                width={80}
                                tickFormatter={(value: number) =>
                                    value.toLocaleString('pt-BR',
                                        {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }
                                    )
                                } />
                            <CartesianGrid vertical={false} className="stroke-gray-500" />
                            <Line
                                type="linear"
                                strokeWidth={2}
                                dataKey="receipt"
                                stroke={colors['violet']['500']}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-[240px] w-full items-center justify-center  " >
                        <Loader2 className="h-10 w-10 text-zinc-600 animate-spin" />
                    </div>
                )}
            </CardContent>
        </Card>

    )
}