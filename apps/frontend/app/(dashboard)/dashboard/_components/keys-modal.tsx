"use client";

import { createIngress } from '@/actions/ingress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IngressInput } from 'livekit-server-sdk';
import { Loader2Icon, TriangleAlert } from 'lucide-react';
import React, { ComponentRef, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner';

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP;

const KeysModal = () => {
    const closeRef = useRef<ComponentRef<"button">>(null);
    const [isPending,startTransition] = useTransition()
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
            .then(() => {
                toast.success("Ingress created")
                closeRef?.current?.click();
            })
            .catch(() => {toast.error("Something went wrong while creating Ingress")})
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Generate</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Select
                        disabled = {isPending}
                        value = {ingressType}
                        onValueChange = {(value) => setIngressType(value)}
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
                    <div className="flex gap-4 border rounded-xl border-yellow-200 p-4 text-yellow-200 text-sm">
                        <TriangleAlert className='h-5 w-5' />
                        <div className="flex flex-col gap-2">
                            <span>Warning!</span>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In sunt culpa id?</p>
                        </div>
                    </div>
                </div>
                <DialogFooter className='md:justify-between'>
                    <DialogClose ref={closeRef} asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button 
                        disabled = {isPending}
                        onClick={onSubmit}
                    >
                        {isPending ?
                            <>
                            <Loader2Icon className='animate-spin' />
                            Generating
                            </>
                            :
                            "Generate"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default KeysModal