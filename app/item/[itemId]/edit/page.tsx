
import { getItemImgs, getItemWithOutImgs } from "@/actions/read";
import { auth } from "@/auth";
import AddEditItemHeader from "@/components/createEditListing/AddEditItemHeader";
import EditListingMain from "@/components/createEditListing/EditItem/EditListingMain";

export default async function ItemEditPage(props: {
  params: Promise<{ itemId: string }>;
}) {
  const params = await props.params;
  const session = await auth();
  const itemImgs = await getItemImgs(parseInt(params.itemId));
  const item = await getItemWithOutImgs(parseInt(params.itemId))
  return (
    <>
      <AddEditItemHeader />
      <EditListingMain item={item} session={session} itemImgs={itemImgs} />
    </>
  );
}
