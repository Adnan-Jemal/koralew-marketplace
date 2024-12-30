import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdatePhotoBtn from "./UpdatePhotoBtn";

type propType = {
  userName: string | null | undefined;
  userImg: string | null | undefined;
  userId: string | undefined;
};

const ProfileView = ({ userName, userImg, userId }: propType) => {
  return (
    <div className="flex max-w-full items-center mx-auto gap-6 flex-wrap justify-center md:justify-start p-8 shadow-lg rounded-2xl dark:border dark:border-secondary  ">
      <Avatar className="size-32">
        <AvatarImage
          className="object-cover"
          src={userImg || undefined}
        />
        <AvatarFallback className="text-5xl ">
          {userName?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="text-3xl flex items-center font-semibold gap-2 justify-center  md:justify-start flex-wrap">
            <p className=" sm:text-3xl text-2xl text-center">{userName}</p>
          </div>
        </div>

        <UpdatePhotoBtn userId={userId} />
      </div>
    </div>
  );
};

export default ProfileView;
