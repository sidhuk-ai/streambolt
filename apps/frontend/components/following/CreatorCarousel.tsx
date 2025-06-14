"use client"

import { useRef, useEffect, useState, useTransition } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CreatorCard from "@/components/following/CreatorCard"
import { getFollowedCreators } from "@/actions/follow"
import { Skeleton } from "@/components/ui/skeleton"
import { User,Follow } from "@repo/db"

interface Creator extends Follow {
  following: User
}

export default function CreatorCarousel() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isPending, startTransition] = useTransition();

  const carouselRef = useRef<HTMLDivElement>(null);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    startTransition(()=>{
      getFollowedCreators().then((data) => {
        setCreators([...data])
      });
    })
    
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const mockCreators = creators.map((creator, i) => ({
    id: creator.following.id,
    username: `${creator.following.name}`,
    isLive: i % 3 === 0,
    avatar: `${creator.following.imageUrl ?? `/placeholder.svg?height=200&width=200&text=C${i + 1}`}`,
    category: ["Gaming", "Music", "IRL", "Art", "Food"][i % 5],
  }));

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      // Check buttons after scrolling
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Followed Creators</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto py-2 scrollbar-hide"
        onScroll={checkScrollButtons}
      >
        {isPending ? 
          <aside className="flex gap-4 overflow-x-visible">
          {Array.from({length: 15}).map((_,i)=>{
            return(
              <Skeleton className="h-20 w-20 rounded-full" key={i} />
            )
          })}
          </aside>
          :
          mockCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        }
      </div>
    </div>
  );
}
