import AddEditItemHeader from "@/components/createEditListing/AddEditItemHeader";
import React from "react";

const EditAddItemLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {" "}
      <AddEditItemHeader /> {children}
    </>
  );
};

export default EditAddItemLayout;
