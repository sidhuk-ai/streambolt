import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KeysContent from "../_components/keys-content";

export default async function KeysPage(){
    return(
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <DashboardHeader heading="Keys & URLs" text="Generate stream keys and urls" />
            <div className="w-full">
                <KeysContent />
            </div>
        </div>
    )
}