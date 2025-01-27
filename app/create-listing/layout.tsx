import AddItemHeader from "@/components/createEditListing/AddEditItemHeader";

export default function CreateListingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AddItemHeader />
      {children}
    </>
  );
}
