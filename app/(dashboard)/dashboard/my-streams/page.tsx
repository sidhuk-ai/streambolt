import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MyStreams from "@/components/dashboard/MyStreams";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MyStreamsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader
        heading="My Streams"
        text="Manage your live, past, and scheduled streams"
      >
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          New Stream
        </Button>
      </DashboardHeader>
      <MyStreams />
    </div>
  );
}
