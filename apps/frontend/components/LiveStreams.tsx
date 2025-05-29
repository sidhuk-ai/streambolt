import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LiveStreams() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tighter">Live Now</h2>
            <p className="text-muted-foreground">Check out the most popular streams happening right now</p>
          </div>
          <Tabs defaultValue="all" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="gaming">Gaming</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="irl">IRL</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Link key={i} href="#" className="group">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=720&width=1280&text=Stream+${i + 1}`}
                    width={1280}
                    height={720}
                    alt={`Stream ${i + 1}`}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 backdrop-blur">
                    <Badge variant="secondary" className="gap-1 bg-red-500 text-white hover:bg-red-500/90">
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                      LIVE
                    </Badge>
                    <span className="text-xs font-medium">{(Math.random() * 10).toFixed(1)}K</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=80&width=80&text=U${i + 1}`}
                        width={80}
                        height={80}
                        alt="User avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium leading-none line-clamp-1">
                        {["Epic Gameplay", "Music Session", "Just Chatting", "Art Creation"][i % 4]} #{i + 1}
                      </h3>
                      <p className="text-xs text-muted-foreground">StreamUser{i + 1}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Badge variant="outline" className="rounded-sm px-1 py-0 text-[10px]">
                          {["Gaming", "Music", "IRL", "Art"][i % 4]}
                        </Badge>
                        <Badge variant="outline" className="rounded-sm px-1 py-0 text-[10px]">
                          {["English", "Spanish", "Japanese", "Korean"][i % 4]}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="gap-1">
            View More <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

