import StreamCard from "@/components/browse/StreamCard"
import { getFeedStreams } from "@/lib/feed-service"

// Mock data for streams

export default async function StreamList() {
  const streamService = await getFeedStreams();
  const mockStreams = streamService.map((f, i) => ({
    id: f.user.id,
    title: f.name,
    username: f.user.username,
    category: ["Gaming", "Music", "IRL", "Art", "Food"][i % 5],
    viewers: Math.floor(Math.random() * 10000),
    thumbnail: f.thumbnailUrl,
    avatar: f.user.imageUrl,
    tags: [
      ["English", "FPS", "Competitive"],
      ["Live", "Concert", "Original"],
      ["English", "Talk Show", "Q&A"],
      ["Creative", "Digital Art", "Commission"],
      ["Recipe", "Baking", "Tutorial"],
    ][i % 5],
    isLive: f.isLive
  }))
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {mockStreams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  )
}

