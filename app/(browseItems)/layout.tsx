import Footer from "@/components/general/Footer";
import { Navbar } from "@/components/layouts/nav/Navbar";
import React from "react";

const browseItemsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
};

export default browseItemsLayout;
