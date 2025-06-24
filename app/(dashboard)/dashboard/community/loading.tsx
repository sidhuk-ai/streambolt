import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityLoading() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <Skeleton className="h-10 w-52 rounded-xl" />
            <div className="w-full">
                <Skeleton className="h-7 w-2/6 mb-4 mt-6" />
                <div className="border rounded-md border-muted">
                    <div className="flex border-b p-4 border-b-muted justify-between">
                        <Skeleton className="h-7 md:w-36 w-20" />
                        <Skeleton className="h-7 md:w-36 w-20" />
                        <Skeleton className="h-7 md:w-36 w-20" />
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        {
                            Array.from({ length: 5}).map((_,i) => (
                                <div key={i} className="flex justify-between">
                                    <Skeleton className="h-7 md:w-36 w-20" />
                                    <Skeleton className="h-7 md:w-36 w-20" />
                                    <Skeleton className="h-7 md:w-36 w-20" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <Skeleton className="w-14 h-7" />
                <Skeleton className="w-14 h-7" />
            </div>
        </div>
    )
}