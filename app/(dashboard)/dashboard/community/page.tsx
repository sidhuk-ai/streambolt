import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { columns } from "@/app/(dashboard)/_components/columns";
import { DataTable } from "@/app/(dashboard)/_components/data-table";
import { getBlockedUsers } from "@/lib/block-service";
import { format } from "date-fns";


export default async function CommunityPage() {
    const blockedUsers = await getBlockedUsers();

    const formattedData = blockedUsers.map((block) => ({
        ...block,
        userId: block.blocked.id,
        imageUrl: block.blocked.imageUrl,
        username: block.blocked.username,
        createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy"),
        name: block.blocked.name
    }))
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <DashboardHeader heading="Community Settings" />
            <main>
                <DataTable columns={columns} data={formattedData} />
            </main>
        </div>
    )
}