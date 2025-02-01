import { getUser } from "@/actions/read";
import { auth } from "@/auth";
import CreateListingMainForm from "@/components/createEditListing/AddItem/CreateListingMainForm";
import { redirect } from "next/navigation";


export default async function page() {
  const session = await auth();
  const user = await getUser();
  if (!user?.address || !user.city || !user.country || !user.phoneNumber) {
    return redirect("/account/profile");
  }
  return (
    <>
      <CreateListingMainForm session={session} />
    </>
  );
}
