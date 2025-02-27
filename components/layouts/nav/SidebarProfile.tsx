"use client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Form from "next/form";
import { logOut } from "@/actions/auth";
import { useSession } from "next-auth/react";

const SidebarProfile = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="mb-6  w-[90%] mx-auto flex flex-col gap-5 justify-end">
      <div className="flex  gap-2 px-3 py-4 shadow-sm  rounded-xl  border-secondary border-2">
        {/* profile image */}
        {session.status !== "loading" ? (
          <Avatar className="size-12 ">
            <AvatarImage
              className="object-cover"
              src={user?.image || undefined}
            />
            <AvatarFallback className="text-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Skeleton className="size-12 rounded-full" />
        )}
        {/* profile name */}
        <div className="grow overflow-hidden">
          <h2 className="text-md font-semibold truncate">
            {session.status !== "loading" ? (
              user?.name
            ) : (
              <Skeleton className="h-4 w-24 mt-1" />
            )}
          </h2>
          {session.status !== "loading" ? (
            <p className="text-muted-foreground text-sm truncate">
              {user?.email}
            </p>
          ) : (
            <Skeleton className="h-4 w-30 mt-2" />
          )}
        </div>
      </div>

      <Form action={logOut}>
        <Button variant={"ghost"} className="hover:text-red-500 gap-2">
          <LogOut className="text-sm" />
          Log Out
        </Button>
      </Form>
    </div>
  );
};

export default SidebarProfile;
