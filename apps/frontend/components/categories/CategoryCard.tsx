import Link from "next/link"
import Image from "next/image"
import { Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  category: {
    id: string
    name: string
    viewers: number
    image: string
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { name, viewers, image } = category

  // Format viewer count
  const formatViewers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <Link href="#" className="group">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
          <Image
            src={image || "/placeholder.svg"}
            width={400}
            height={400}
            alt={name}
            className="h-full w-full object-cover opacity-90 transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Users className="h-3 w-3" />
            <span>{formatViewers(viewers)} viewers</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

