import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton() {
    return (
        <>
            <Skeleton className=" bg-zinc-400 h-7 w-36 mt-1" />
            <Skeleton className=" bg-zinc-400 h-4 w-52" />
        </>
    )
}