import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "./ui/skeleton";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "./ui/dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { signUp } from "@/api/sign-up";
import { useNavigate } from "react-router-dom";


export function AccountMenu() {

    const navigate = useNavigate()


    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity,
    })
    // serve para buscar dados e manter o estado desses dados atualizado (com cache e revalidação inteligente).
    //O useQuery é usado para buscar dados (GET request) de forma assíncrona. Ele gerencia o estado de carregamento, erro e dados, e facilita a revalidação de dados na aplicação.
    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managedRestaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,
    })
    // serve para executar ações que modificam o estado dos dados no servidor, como enviar formulários ou deletar recursos.
    //é utilizado para ações que alteram dados (geralmente com POST, PUT, DELETE) e não são apenas leituras.
    const { mutateAsync: signUpFn, isPending: isSigningOut } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            navigate('/sign-in', { replace: true })
        }
    })

    return (


        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild >

                    <Button variant={"outline"} className=" hover:bg-violet-500 flex items-center gap-2 select-none"  >
                        {isLoadingManagedRestaurant ? (
                            <Skeleton className=" bg-zinc-500  h-4 w-40" />
                        ) : managedRestaurant?.name
                        }
                        <ChevronDown className="w-4 h-4" />


                    </Button>

                </DropdownMenuTrigger>

                <DropdownMenuContent className=" bg-black border-2 mt-2   p-2 w-56" align="end"  >


                    <DropdownMenuLabel className="flex flex-col" >
                        {isLoadingProfile ? (
                            <div className="space-y-1.5" >
                                <Skeleton className=" bg-violet-500 h-4 w-32" />
                                <Skeleton className=" bg-violet-500 h-3 w-32" />

                            </div>
                        ) : (
                            <>
                                <span className=" font-bold text-violet-500" >{profile?.name}</span>
                                <span className="text-xs font-normal text-zinc-50" >{profile?.email}</span>
                            </>
                        )}
                    </DropdownMenuLabel>
                    <DialogTrigger asChild >
                        <DropdownMenuItem className="text-zinc-50   border mt-2 hover:text-violet-500  hover:bg-zinc-300" >
                            <Building className="w-4 h-4 mr-2 " />
                            <span className="font-bold  " >Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem disabled={isSigningOut} asChild className="text-rose-400 hover:text-rose-500  border mt-2 hover:bg-zinc-300" >
                        <button className="w-full" onClick={() => signUpFn()} >
                            <LogOut className="w-4 h-4 mr-2 " />
                            <span className="font-bold" >Sair</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <StoreProfileDialog />
        </Dialog>
    )
}