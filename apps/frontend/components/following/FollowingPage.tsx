import CreatorCarousel from "@/components/following/CreatorCarousel"
import FollowedStreamList from "@/components/following/FollowedStreamList"
import Footer from "@/components/Footer"

export default function FollowingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="p-3">
          <CreatorCarousel />
        </section>
        <div className="container px-4 py-6 md:px-6">
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Live Channels</h2>
            <FollowedStreamList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

