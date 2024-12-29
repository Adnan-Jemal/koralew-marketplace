import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdatePhotoBtn from "./UpdatePhotoBtn";
import { Session } from "next-auth";

const ProfileView = async ({ session }: { session: Session }) => {
  const user = session?.user;
  if (!user?.name) {
    return <div>No user Found</div>;
  }

  return (
    <div className="flex max-w-full items-center mx-auto gap-6 flex-wrap justify-center md:justify-start p-8 shadow-lg rounded-2xl dark:border dark:border-secondary  ">
      <Avatar className="size-32">
        <AvatarImage className="object-cover" src={user.image || undefined} />
        <AvatarFallback className="text-5xl ">
          {user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="text-3xl flex items-center font-semibold gap-2 justify-center  md:justify-start flex-wrap">
            <p className=" sm:text-3xl text-2xl text-center">{user?.name}</p>
          </div>
        </div>

        <UpdatePhotoBtn session={session} />
      </div>
    </div>
  );
};

export default ProfileView;
