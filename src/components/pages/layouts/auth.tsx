import { Outlet } from "react-router-dom";
import { Pizza } from 'lucide-react'
export function AuthLayout() {
    return (
        <div className="min-h-screen antialised grid grid-cols-2" >

            <div className="h-full border-r bg-zinc-500  border-foreground/5  p-10 text-mute-foreground flex flex-col justify-between" >
                <div className="flex items-center gap-3 text-lg font-medium text-foreground" >
                    <Pizza className="h-5 w-5" />
                    <span className="font-semibold" >pizza.shop</span>
                </div>
                <footer className="text-sm" >
                    Direitos autorais
                    &copy;pizza.shop - {new Date().getFullYear()}
                </footer>
            </div>

            <div className="flex flex-col items-center justify-center relative">
                <Outlet />
            </div>
        </div>
    )
}