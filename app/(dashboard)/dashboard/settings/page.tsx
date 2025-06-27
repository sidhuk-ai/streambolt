import { getSelf, getUserById } from "@/actions/user";
import Settings from "@/components/dashboard/Settings";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function SettingsPage() {
  const self = await getSelf();
  if (!self) redirect("/login");
  const user = await getUserById(self.id);
  return <Settings user={user} />;
}
