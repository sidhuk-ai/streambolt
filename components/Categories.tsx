import Link from "next/link"
import Image from "next/image"
import { TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Categories() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Categories to Explore</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover streams based on your interests
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-4">
          {[
            { name: "Gaming", icon: <TrendingUp className="h-6 w-6" /> },
            { name: "Music", icon: <TrendingUp className="h-6 w-6" /> },
            { name: "Just Chatting", icon: <Users className="h-6 w-6" /> },
            { name: "Art", icon: <TrendingUp className="h-6 w-6" /> },
            { name: "Sports", icon: <TrendingUp className="h-6 w-6" /> },
            { name: "Education", icon: <TrendingUp className="h-6 w-6" /> },
            { name: "Technology", icon: <TrendingUp className="h-6 w-6" /> },
            { name: "Cooking", icon: <TrendingUp className="h-6 w-6" /> },
          ].map((category, i) => (
            <Link key={i} href="#" className="group">
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
                  <Image
                    src={`/placeholder.svg?height=400&width=400&text=${category.name}`}
                    width={400}
                    height={400}
                    alt={category.name}
                    className="h-full w-full object-cover opacity-80 transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-background/80 p-3 backdrop-blur">{category.icon}</div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-center font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

