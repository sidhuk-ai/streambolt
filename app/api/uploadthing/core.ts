import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const self = await auth();
      return { self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.stream.update({
        where: {
          userId: metadata?.self?.user?.id,
        },
        data: {
          thumbnailUrl: file.ufsUrl,
        },
      });
      return { fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
