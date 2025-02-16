import Notice from "@/components/general/Notice";
import DeleteAccount from "@/components/profile/DeleteAccount";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileView from "@/components/profile/ProfileView";
import { getUser } from "@/data/user";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="w-[90%] mx-auto flex flex-col  gap-14  my-10">
      {(!user?.address || !user.city || !user.region || !user.phoneNumber) && (
        <Notice
          title="Complete Your Profile Information"
          message="Please complete your profile information to get started listing your items."
        />
      )}
      <ProfileView
        userName={user?.name}
        userImg={user?.image}
        userId={user?.id}
      />

      <ProfileForm userData={user} />

      <DeleteAccount />
    </div>
  );
}
