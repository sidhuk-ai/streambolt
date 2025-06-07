import StreamCard from "@/components/browse/StreamCard"

// Mock data for streams
const mockStreams = Array.from({ length: 20 }).map((_, i) => ({
  id: `stream-${i}`,
  title: ["Epic Gameplay", "Music Session", "Just Chatting", "Art Creation", "Cooking Stream"][i % 5] + ` #${i + 1}`,
  username: `StreamUser${i + 1}`,
  category: ["Gaming", "Music", "IRL", "Art", "Food"][i % 5],
  viewers: Math.floor(Math.random() * 10000),
  thumbnail: `/placeholder.svg?height=720&width=1280&text=Stream+${i + 1}`,
  avatar: `/placeholder.svg?height=80&width=80&text=U${i + 1}`,
  tags: [
    ["English", "FPS", "Competitive"],
    ["Live", "Concert", "Original"],
    ["English", "Talk Show", "Q&A"],
    ["Creative", "Digital Art", "Commission"],
    ["Recipe", "Baking", "Tutorial"],
  ][i % 5],
}))

export default function StreamList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {mockStreams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  )
}

