"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TagCarouselProps {
  tags: string[]
}

export default function TagCarousel({ tags }: TagCarouselProps) {
  const [activeTag, setActiveTag] = useState("All")
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const carouselRef = useRef<HTMLDivElement>(null)

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
      setTimeout(checkScrollButtons, 300)
    }
  }

  return (
    <div className="relative mb-6 w-full">
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4">
        <div className="relative flex items-center">
          {canScrollLeft && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 z-10 rounded-full shadow-md"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
          )}

          <div
            ref={carouselRef}
            className="flex gap-2 overflow-x-auto py-2 scrollbar-hide"
            onScroll={checkScrollButtons}
          >
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                className={cn(
                  "rounded-full whitespace-nowrap",
                  activeTag === tag ? "bg-primary text-primary-foreground" : "",
                )}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          {canScrollRight && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 z-10 rounded-full shadow-md"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

