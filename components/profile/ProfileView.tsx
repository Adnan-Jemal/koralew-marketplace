
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/auth";
import UpdatePhotoBtn from "./UpdatePhotoBtn";


const ProfileView = async () => {
    const session = await auth();
    const user = session?.user;
  
//   const [userData, userDataLoading,] = useDocumentData(
//     user ? doc(db, "users", user.uid) : null
//   );
  return (
    <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start p-8 shadow-lg rounded-2xl dark:border dark:border-secondary  ">
      {/* {user ? (
        <Avatar className="size-32">
          <AvatarImage src={user.photoURL!} />
          <AvatarFallback className="text-5xl ">
            {userData?.name!.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Skeleton className="size-24 rounded-full" />
      )} */}
              <Avatar className="size-32">
          <AvatarImage src={user?.image!!} />
          <AvatarFallback className="text-5xl ">
            {user?.name!.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      <div className="flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="text-3xl flex items-center font-semibold gap-2 justify-center  md:justify-start truncate flex-wrap">
            <span className="font-light">Hey, </span>
           
            {/* {userDataLoading ? (
              <Skeleton className="h-4  w-24 mt-1" />
            ) : userData ? (
              <h2 className="truncate">{userData.name}</h2>
            ) : (
              <Skeleton className="h-4 w-24 mt-1" />
            )} */}
            <h2 className="truncate">{user?.name}</h2>
          </div>
        </div>
                <UpdatePhotoBtn/>
      </div>
    </div>
  );
};

export default ProfileView;