
import { getUser } from "@/actions/read";
import DeleteAccount from "@/components/profile/DeleteAccount";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileView from "@/components/profile/ProfileView";


export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="w-[90%] mx-auto flex flex-col  gap-14  my-10">
      <ProfileView userName={user?.name} userImg = {user?.image} userId={user?.id} />

      <ProfileForm userData={user} />

      <DeleteAccount />
    </div>
  );
}
