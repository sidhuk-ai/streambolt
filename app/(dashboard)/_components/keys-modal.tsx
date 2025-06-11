"use client";

import { createIngress } from "@/actions/ingress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon, TriangleAlert } from "lucide-react";
import React, { ComponentRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = "RTMP_INPUT";
const WHIP = "WHIP_INPUT";
type IngressType = typeof RTMP | typeof WHIP;

const KeysModal = () => {
  const closeRef = useRef<ComponentRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(ingressType)
        .then(() => {
          toast.success("Ingress created");
          closeRef?.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong while creating Ingress");
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Select
            disabled={isPending}
            value={ingressType}
            onValueChange={(value: IngressType) => setIngressType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ingress Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value={RTMP}>RTMP</SelectItem>
                <SelectItem value={WHIP}>WHIP</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-3 bg-background z-50 max-w-[400px] rounded-md border p-4 shadow-lg">
            <TriangleAlert className="mt-0.5 shrink-0 text-amber-500 opacity-60" size={20} aria-hidden={true} />
            <div className="flex grow flex-col gap-3 space-y-1">
              <span className="text-sm font-medium">Warning!</span>
              <p className="text-muted-foreground text-sm">
                You will be disconnected from your current stream, by changing
                the type of Ingress. Continue at your own risk.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="md:justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit}>
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default KeysModal;
