import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(){
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <Skeleton className="h-10 w-52 rounded-xl" />
            <Skeleton className="h-10 w-52 rounded-xl" />
            <div className="flex flex-col w-full gap-3">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
            </div>
        </div>
    )
}