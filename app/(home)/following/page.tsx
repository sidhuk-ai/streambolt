import { auth } from "@/auth"
import FollowingPage from "@/components/following/FollowingPage"
import UnauthenticatedPage from "@/components/UnauthenticatedPage";

export default async function Following() {
  const session = await auth();

  if(!session?.user) return <UnauthenticatedPage />
  
  return <FollowingPage />
}

