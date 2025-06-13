import { getUserById } from "@/actions/user";
import StreamPlayer from "@/components/StreamPlayer/stream-player";
import { isFollowingCreator } from "@/lib/follow-service";

export default async function StreamPage({
  params
}:{
  params: Promise<{id: string}>
}) {

  const { id } = await params;
  const isFollowing = await isFollowingCreator(id);
  const creator = await getUserById(id);

  return (
    <div className="flex flex-col min-h-screen m-4">
      <div>
        <StreamPlayer user={creator} isFollowing={isFollowing} />
      </div>
    </div>
  )
}