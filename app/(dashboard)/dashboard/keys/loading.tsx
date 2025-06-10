import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StreamSettingsSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Skeleton className="h-10 w-52 rounded-xl" />
      <Skeleton className="h-10 w-52 rounded-xl" />
      <div className="w-full">
        <div className="space-y-4">
          {/* STREAM CONFIGURATION CARD */}
          <Card>
            <CardHeader className="flex md:flex-row justify-between">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-48  " />
                <Skeleton className="h-4 w-64  " />
              </div>
              <Skeleton className="h-9 w-32 rounded-md  " />
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Stream Key Section */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32  " />
                <div className="flex w-full flex-row gap-2">
                  <Skeleton className="h-10 w-full rounded-md" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-20 not-md:w-15 rounded-md" />
                    <Skeleton className="h-10 w-20 not-md:w-15 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-3 w-64" />
              </div>

              {/* Stream URL Section */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Auto-record Toggle */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-40" />
                  <Skeleton className="h-7 w-64" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>

              {/* Conditional Quality Dropdown (always shown in skeleton) */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-36 rounded-md" />
            </CardFooter>
          </Card>

          {/* STREAM CUSTOMIZATION CARD */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Title Template */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-60" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Description Template */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-[100px] w-full rounded-md" />
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-8 w-24 rounded-md" />
                  ))}
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-36 rounded-md" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
