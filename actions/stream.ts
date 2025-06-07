import { prisma } from "@/lib/db";
import { Stream } from "@/lib/generated/prisma";

export const updateStream = async (values: Partial<Stream>) => {
    // TODO: Rewrite whole logic
    try {
        const selfStream = await prisma.stream.findUnique({
            where:{
                id: values.id
            }
        });
        return selfStream;
    } catch (error) {
        
    }
}