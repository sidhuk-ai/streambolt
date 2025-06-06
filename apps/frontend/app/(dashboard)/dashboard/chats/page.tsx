import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ToggleCard from "../_components/toggle-card";
import { getSelf } from "@/actions/user";
import { prisma } from "@repo/db";

export default async function ChatPage() {
  const self = await getSelf();

  const stream = await prisma.stream.findFirst({
    where: {
      userId: self?.id,
    },
  });
  return (
    <div className="">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <DashboardHeader
                heading="Chat Settings"
                text="Toggle your chat preferences"
            />
            <div className="flex flex-col w-full gap-3">
                <ToggleCard
                    field={"isChatEnabled"}
                    label="Enable chat"
                    value={stream?.isChatEnabled as boolean}
                />
                <ToggleCard
                    field={"isChatDelayed"}
                    label="Delay the chat"
                    value={stream?.isChatDelayed as boolean}
                />
                <ToggleCard
                    field={"isChatFollowersOnly"}
                    label="Enable chat only for followers"
                    value={stream?.isChatFollowersOnly as boolean}
                />
            </div>
        </div>
    </div>
  );
}
