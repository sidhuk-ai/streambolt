import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-0">
                <CardHeader className="text-center flex justify-center items-center flex-col space-y-2 pb-6">
                    <div className="mx-auto">
                        <Skeleton className="size-12 rounded-full" />
                    </div>
                    <Skeleton className="w-2/3 h-5" />
                    <Skeleton className="w-3/4 h-5" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="w-15 h-5" />
                        <Skeleton className="w-full h-7"/>
                        <Skeleton className="w-1/4 h-2" />
                        <div className="flex flex-col gap-2 my-4">
                            <Skeleton className="w-1/2 h-4" />
                            <Skeleton className="w-1/2 h-4" />
                            <Skeleton className="w-1/2 h-4" />
                            <Skeleton className="w-1/2 h-4" />
                        </div>
                    </div>
                    <div>
                        <Skeleton className="w-full h-10" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}