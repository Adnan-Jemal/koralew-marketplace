import { auth } from "@/auth";
import MainForm from "@/components/create-listing/MainForm";

export default async function page() {
  const session = await auth()
  return (
    <>
      <MainForm session={session} />
    </>
  );
}
