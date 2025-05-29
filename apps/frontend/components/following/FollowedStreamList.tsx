import StreamCard from "@/components/browse/StreamCard"

// Filter mock streams to only show those from creators the user follows
// For demo purposes, we'll show streams with odd indices
const followedStreams = Array.from({ length: 12 }).map((_, i) => ({
  id: `followed-stream-${i}`,
  title: ["Epic Gameplay", "Music Session", "Just Chatting", "Art Creation", "Cooking Stream"][i % 5] + ` #${i + 1}`,
  username: `Creator${i * 2 + 1}`, // Match with creator IDs from CreatorCarousel
  category: ["Gaming", "Music", "IRL", "Art", "Food"][i % 5],
  viewers: Math.floor(Math.random() * 10000),
  thumbnail: `/placeholder.svg?height=720&width=1280&text=Stream+${i + 1}`,
  avatar: `/placeholder.svg?height=200&width=200&text=C${i * 2 + 1}`,
  tags: [
    ["English", "FPS", "Competitive"],
    ["Live", "Concert", "Original"],
    ["English", "Talk Show", "Q&A"],
    ["Creative", "Digital Art", "Commission"],
    ["Recipe", "Baking", "Tutorial"],
  ][i % 5],
}))

export default function FollowedStreamList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {followedStreams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  )
}

