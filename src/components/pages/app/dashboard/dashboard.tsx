
import { Helmet } from "react-helmet-async";
import { MonthRevenue } from "./month-revenue-card";
import { MonthOrdersAmount } from "./orders-amount-card";
import { DayOrdersAmount } from "./day-orders-amount-card";
import { MonthCancelOrders } from "./month-cancel-orders-amount";
import { RevenueChart } from "./revenue-chart";
import { PiePopular } from "./popular-products-chart";

export function Dashboard() {
    return (
        <>
            <Helmet title="Dashboard" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight text-violet-500 " >DashBoard</h1>

                <div className="grid grid-cols-4 gap-4">
                    <MonthRevenue />
                    <MonthOrdersAmount />
                    <DayOrdersAmount />
                    <MonthCancelOrders />
                </div>

                <div className="grid grid-cols-9 gap-4" >
                    <RevenueChart />
                    <PiePopular />
                </div>
            </div>
        </>
    )
}