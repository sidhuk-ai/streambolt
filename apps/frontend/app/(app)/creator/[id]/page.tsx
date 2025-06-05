import { Suspense } from "react";
import Loading from "./loading";
import { isFollowingCreator } from "@/lib/follow-service";
import { CreatorHeader } from "@/components/creator/Creator-header";
import { getUserById } from "@/actions/user";
import Footer from "@/components/Footer";
import { isBlockedByUser } from "@/lib/block-service";

export default async function Creator({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isFollowing = await isFollowingCreator(id);
  const isBlocked = await isBlockedByUser(id);
  const creator = await getUserById(id);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <div className="pb-6 mb-3">
            <CreatorHeader creator={creator} isFollowing={isFollowing} isBlocked={isBlocked} creatorId={creator.id} />
          </div>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
