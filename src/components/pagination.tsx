import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";

export interface PaginationProps {
    pageIndex: number;
    totalCount: number;
    perPage: number;
    onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({ pageIndex, onPageChange, perPage, totalCount }: PaginationProps) {

    const pages = Math.ceil(totalCount / perPage) || 1

    return (
        <div className="flex items-center justify-between" >
            <span className="text-sm font-bold text-muted-foreground" >
                Total de {totalCount} iten(s)
            </span>

            <div className="flex  items-center gap-6 lg:gap-8" >
                <div className="text-sm font-medium" >
                    Página {pageIndex + 1} de {pages}
                </div>

                <div className="flex border  hover:bg-zinc-400 items-center gap-2" >
                    <Button onClick={() => onPageChange(0)} disabled={pageIndex === 0} className="h-8 w-8 p-0" >
                        <ChevronsLeft className="h-4 w-4" />
                        <span className="sr-only" >Primeira página</span>
                    </Button>
                </div>

                <div className="flex border hover:bg-zinc-400 items-center gap-2" >
                    <Button onClick={() => onPageChange(pageIndex - 1)} disabled={pageIndex + 1 === 1} className="h-8 w-8 p-0" >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only" >Pagina anterior</span>
                    </Button>
                </div>

                <div className="flex border hover:bg-zinc-400 items-center gap-2" >
                    <Button onClick={() => onPageChange(pageIndex + 1)} disabled={pages <= pageIndex + 1} className="h-8 w-8 p-0" >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only" >Próxima página</span>
                    </Button>
                </div>

                <div className="flex border hover:bg-zinc-400 items-center gap-2" >
                    <Button onClick={() => onPageChange(pages - 1)} disabled={pages <= pageIndex + 1} className="h-8 w-8 p-0" >
                        <ChevronsRight className="h-4 w-4" />
                        <span className="sr-only" >Ultima pagina</span>
                    </Button>
                </div>

            </div>
        </div >
    )
}