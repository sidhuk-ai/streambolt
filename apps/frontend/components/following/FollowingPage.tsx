import CreatorCarousel from "@/components/following/CreatorCarousel"
import FollowedStreamList from "@/components/following/FollowedStreamList"
import Footer from "@/components/Footer"

export default function FollowingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">

          {
          /* <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Following</h1>
            <p className="text-muted-foreground">Streams from creators you follow</p>
          </div> */
          }

          <CreatorCarousel />
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

