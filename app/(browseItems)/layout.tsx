import { Navbar } from "@/components/layouts/nav/Navbar";
import React from "react";

const browseItemsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default browseItemsLayout;
