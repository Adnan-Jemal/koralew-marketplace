import { getUserById } from "@/actions/read";
import { auth } from "@/auth";
import DeleteAccount from "@/components/profile/DeleteAccount";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileView from "@/components/profile/ProfileView";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    return <div>Please log in to access your profile.</div>;
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return <div>User profile not found.</div>;
  }
  return (
    <div className="w-[90%] mx-auto flex flex-col  gap-14  my-10">
      <ProfileView session={session} />

      <ProfileForm userData={user} />

      <DeleteAccount userId={session.user.id} />
    </div>
  );
}
