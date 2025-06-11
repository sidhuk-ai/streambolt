import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KeysContent from "@/app/(dashboard)/_components/keys-content";
import { prisma } from "@/lib/db";
import { getSelf } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function KeysPage() {
    const self = await getSelf();
    if(!self) redirect('/login');
    const streamKeys = await prisma.stream.findUnique({
        where:{
            userId: self.id
        },
        select:{
            streamKey: true,
            serverUrl: true
        }
    });
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <DashboardHeader heading="Keys & URLs" text="Generate stream keys and urls" />
            <div className="w-full">
                <KeysContent keys={streamKeys} />
            </div>
        </div>
    );
}