"use client"

import { updateStream } from "@/actions/stream";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface PageProps {
    field: FieldTypes;
    label: string;
    value: boolean
}
export default function ToggleCard({field,label,value = false}:PageProps){
    const [isPending,startTransition] = useTransition();

    const onChange = () => {
        startTransition(()=>{
            updateStream({[field]:!value})
            .then(() => {toast.success("Updated successfully.")})
            .catch(() => {toast.error("Error occured while updating.")})
        })
    }
    return(
        <div className=" p-6 bg-muted rounded-xl">
            <div className="flex items-center justify-between">
                <Label htmlFor={field}>{label}</Label>
                <Switch id={field} disabled={isPending} onCheckedChange={onChange} checked={value}>
                    {value ? "On" : "Off"}
                </Switch>
            </div>
        </div>
    )
}