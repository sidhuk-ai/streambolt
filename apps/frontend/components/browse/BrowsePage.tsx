import Header from "@/components/Navbar"
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
      {/* <Header /> */}
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          {/* <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Browse Streams</h1>
            <p className="text-muted-foreground">Discover live streams from creators around the world</p>
          </div> */}

          <TagCarousel tags={tags} />
          <StreamList />
        </div>
      </main>
      <Footer />
    </div>
  )
}

