"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import UnblockButton from "./unblock-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUser = {
  id: string;
  userId: string;
  imageUrl: string | null;
  username: string | null;
  createdAt: string;
  name: string | null;
};

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button 
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Username
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <Avatar>
          <AvatarImage src={row.original.imageUrl as string} />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span>{row.original.name}</span>
          <span className="text-muted-foreground">
            @{row.original.username}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button 
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date Blocked
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
  },
];
