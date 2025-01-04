import { Navbar } from "@/components/layouts/nav/Navbar";
import React from "react";

export const layout = ({
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

export default layout;
