import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import UpdatePhotoBtn from "./UpdatePhotoBtn";

const ProfileView = async () => {
  const session = await auth();
  const user = session?.user;

  //   const [userData, userDataLoading,] = useDocumentData(
  //     user ? doc(db, "users", user.uid) : null
  //   );
  return (
    <div className="flex max-w-full items-center mx-auto gap-6 flex-wrap justify-center md:justify-start p-8 shadow-lg rounded-2xl dark:border dark:border-secondary  ">
      <Avatar className="size-32">
        <AvatarImage className="object-cover" src={user?.image||undefined} />
        <AvatarFallback className="text-5xl ">
          {user?.name?.charAt(0).toUpperCase()}
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
