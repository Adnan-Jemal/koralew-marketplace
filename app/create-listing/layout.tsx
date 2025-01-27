import AddItemHeader from "@/components/createEditListing/AddItemHeader";

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
