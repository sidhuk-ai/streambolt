import CategoryCard from "@/components/categories/CategoryCard"

// Mock data for categories
const mockCategories = [
  { id: "gaming", name: "Gaming", viewers: 245000, image: "/placeholder.svg?height=400&width=400&text=Gaming" },
  { id: "music", name: "Music", viewers: 120000, image: "/placeholder.svg?height=400&width=400&text=Music" },
  {
    id: "irl",
    name: "Just Chatting",
    viewers: 180000,
    image: "/placeholder.svg?height=400&width=400&text=Just+Chatting",
  },
  { id: "art", name: "Art", viewers: 45000, image: "/placeholder.svg?height=400&width=400&text=Art" },
  { id: "sports", name: "Sports", viewers: 85000, image: "/placeholder.svg?height=400&width=400&text=Sports" },
  { id: "education", name: "Education", viewers: 35000, image: "/placeholder.svg?height=400&width=400&text=Education" },
  {
    id: "technology",
    name: "Technology",
    viewers: 65000,
    image: "/placeholder.svg?height=400&width=400&text=Technology",
  },
  {
    id: "cooking",
    name: "Food & Drink",
    viewers: 55000,
    image: "/placeholder.svg?height=400&width=400&text=Food+%26+Drink",
  },
  {
    id: "travel",
    name: "Travel & Outdoors",
    viewers: 40000,
    image: "/placeholder.svg?height=400&width=400&text=Travel",
  },
  { id: "asmr", name: "ASMR", viewers: 30000, image: "/placeholder.svg?height=400&width=400&text=ASMR" },
  { id: "podcasts", name: "Podcasts", viewers: 50000, image: "/placeholder.svg?height=400&width=400&text=Podcasts" },
  { id: "animals", name: "Animals", viewers: 25000, image: "/placeholder.svg?height=400&width=400&text=Animals" },
  { id: "science", name: "Science", viewers: 20000, image: "/placeholder.svg?height=400&width=400&text=Science" },
  { id: "beauty", name: "Beauty", viewers: 35000, image: "/placeholder.svg?height=400&width=400&text=Beauty" },
  { id: "fitness", name: "Fitness", viewers: 45000, image: "/placeholder.svg?height=400&width=400&text=Fitness" },
  { id: "dance", name: "Dance", viewers: 30000, image: "/placeholder.svg?height=400&width=400&text=Dance" },
]

export default function CategoryCarousel() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

