import TagCarousel from "@/components/browse/TagCarousel"
import StreamList from "@/components/browse/StreamList"
import Footer from "@/components/Footer"

export default function BrowsePage() {
  // Mock tags for filtering
  const tags = [
    "All",
    "Gaming",
    "Music",
    "IRL",
    "Creative",
    "Esports",
    "Talk Shows",
    "Sports",
    "Food & Drink",
    "Science & Technology",
    "Travel & Outdoors",
    "ASMR",
    "Podcasts",
    "Animals",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <TagCarousel tags={tags} />
          <StreamList />
        </div>
      </main>
      <Footer />
    </div>
  )
}

