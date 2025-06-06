import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CallToAction(){
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Ready to start your streaming journey?
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join thousands of creators who are building their audience and sharing their passion with the world.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
          <Button size="lg" className="gap-1.5 font-brand">
            <Play className="h-4 w-4" />
            Start Streaming
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

export function CallToActionSkeleton(){
  return (
    <>
    
    </>
  )
}

