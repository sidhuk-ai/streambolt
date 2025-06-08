import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <>
      <div className="bg-background text-foreground flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden p-0 rounded-lg border border-border bg-card shadow-md">
              <div className="grid p-0 md:grid-cols-2">
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  {/* Heading */}
                  <div className="flex flex-col items-center text-center gap-2">
                    <Skeleton className="h-6 w-32 bg-muted-foreground" />
                    <Skeleton className="h-4 w-40 bg-muted-foreground" />
                  </div>

                  {/* Email Field */}
                  <div className="grid gap-3">
                    <Skeleton className="h-4 w-16 bg-muted-foreground" />
                    <Skeleton className="h-10 w-full bg-muted-foreground" />
                  </div>

                  {/* Password Field */}
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16 bg-muted-foreground" />
                      <Skeleton className="h-4 w-24 bg-muted-foreground" />
                    </div>
                    <Skeleton className="h-10 w-full bg-muted-foreground" />
                  </div>

                  {/* Login Button */}
                  <Skeleton className="h-10 w-full bg-primary/80" />

                  {/* Divider */}
                  <div className="relative text-center text-sm">
                    <Skeleton className="h-4 w-32 mx-auto bg-muted-foreground" />
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-10 w-full bg-muted-foreground" />
                    <Skeleton className="h-10 w-full bg-muted-foreground" />
                    <Skeleton className="h-10 w-full bg-muted-foreground" />
                  </div>

                  {/* Signup Link */}
                  <div className="text-center text-sm">
                    <Skeleton className="h-4 w-48 mx-auto bg-muted-foreground" />
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className="hidden md:block bg-muted relative">
                  <Skeleton className="absolute inset-0 h-full w-full bg-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Terms and Policy */}
            <div className="text-center text-xs">
              <Skeleton className="h-4 w-64 mx-auto bg-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
