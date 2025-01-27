import { auth } from "@/auth";
import CreateListingMainForm from "@/components/createEditListing/CreateListingMainForm";

export default async function page() {
  const session = await auth();
  return (
    <>
      <CreateListingMainForm session={session} />
    </>
  );
}
