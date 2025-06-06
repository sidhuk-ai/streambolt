import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="font-brand tracking-wide">Stream</span> Live to the World
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Start your live stream in seconds and connect with viewers around the globe. Share your passion, build
                your community.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1.5 cursor-pointer">
                <Play className="h-4 w-4" />
                Start Streaming
              </Button>
              <Link href={'/browse'}>
              <Button variant="outline" className="cursor-pointer bg-gray-300" size="lg">
                Browse Streams
              </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center">
            <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                width={1280}
                height={720}
                priority
                alt="StreamBolt Preview"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                  <Play className="h-6 w-6" />
                  <span className="sr-only">Play video</span>
                </Button>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur">
                <Badge variant="secondary" className="gap-1 bg-red-500 text-white hover:bg-red-500/90">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  LIVE
                </Badge>
                <span className="text-xs font-medium">12.4K viewers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

