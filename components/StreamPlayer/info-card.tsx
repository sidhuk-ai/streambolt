"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChangeEvent, FormEvent, useRef, useState, useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface InfoCardProps {
  name: string;
  hostIdentity: string;
  viewerIdentity: string;
  thumbnailUrl: string | null | undefined;
}
interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null | undefined;
}

export default function InfoCard({
  name,
  hostIdentity,
  viewerIdentity,
  thumbnailUrl,
}: InfoCardProps) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) {
    return null;
  }

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="lg:text-lg text-sm font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image fill src={thumbnailUrl} alt={name} className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoModal = ({ initialName, initialThumbnailUrl }: InfoModalProps) => {
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onRemove = () => {
    startTransition(() => {
        updateStream({ thumbnailUrl:null }).then(() => {
            toast.success("Thumbnail removed")
            setThumbnailUrl("");
            buttonRef?.current?.click();
        }).catch(() => {
            toast.error("Something went wrong.")
        })
    })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated");
        })
        .catch(() => {
          toast.error("Something went wrong.");
        });
    });
    buttonRef?.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                    <div className="absolute top-2 right-2 z-10">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" disabled={isPending} onClick={onRemove} className="h-auto w-auto p-1.5">
                                    <Trash2 className="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Remove thumbnail
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Image src={thumbnailUrl} alt="thumbnail" fill className="object-cover" />
                </div>
            ) : (
                <div className="rounded-xl dark:border dark:border-dashed outline-muted">
                <UploadDropzone
                    endpoint={"thumbnailUploader"}
                    appearance={{
                    label: { color: "#FFFFF" },
                    allowedContent: { color: "#FFFFFF" },
                    }}
                    onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.ufsUrl);
                    router.refresh();
                    buttonRef?.current?.click();
                    }}
                />
                </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button ref={buttonRef} type="button" variant={"ghost"}>
                Close
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
