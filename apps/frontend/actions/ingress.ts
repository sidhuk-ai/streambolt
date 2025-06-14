"use server";
import {
    IngressAudioEncodingPreset,
    IngressInput,
    IngressClient,
    RoomServiceClient,
    IngressVideoEncodingPreset,
    type CreateIngressOptions,
    IngressVideoOptions,
    IngressAudioOptions
} from "livekit-server-sdk"
import { TrackSource } from "livekit-server-sdk"
import { getSelf } from "./user";
import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);
const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity:string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    })

    const rooms = await roomService.listRooms([hostIdentity])

    for(const room of rooms){
        await roomService.deleteRoom(room.name)
    }

    for(const ingress of ingresses){
        if(ingress.ingressId){
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
}

export const createIngress = async (ingressType:IngressInput) => {
    const self = await getSelf();

    // Previous Ingress saare delete kardo aur naya ingress banado
    await resetIngresses(self?.id as string)

    const options: CreateIngressOptions = {
        name: self?.name as string,
        roomName: self?.id,
        participantName: self?.username as string,
        participantIdentity: self?.id as string
    }

    if(ingressType === IngressInput.WHIP_INPUT){
        options.enableTranscoding = false
    }else{
        options.video = new IngressVideoOptions({
            source: TrackSource.CAMERA,
            encodingOptions:{
                case: 'preset',
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
            },

        })
        options.audio = new IngressAudioOptions({
            source: TrackSource.MICROPHONE,
            encodingOptions: {
                case: 'preset',
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
            }
        })
    }

    const ingress = await ingressClient.createIngress(
        ingressType,
        options,
    );
    if(!ingress || !ingress.streamKey || !ingress.url){
        throw new Error("Failed to create ingress.")
    }

    await prisma.stream.update({
        where:{
            userId: self?.id
        },
        data:{
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey
        }
    });
    revalidatePath('/dashboard/keys');
    return ingress;
}