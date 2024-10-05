import { getUserById } from "@/actions/read";
import { auth } from "@/auth";
import DeleteAccount from "@/components/profile/DeleteAccount";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileView from "@/components/profile/ProfileView";
export default async function page() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return <p>please log in</p>;
  }
  const user = await getUserById(session?.user?.id);
  if (!user) {
    return <p>No user found</p>;
  }
    

  return (
    <div className="w-[90%] mx-auto flex flex-col  gap-14  my-10">
      <ProfileView />

      <ProfileForm userData={user} />

      <DeleteAccount userId= {session.user.id} />
    </div>
  );
}
