import AccountHeader from "@/components/layouts/nav/AccountHeader";
import Sidebar from "@/components/layouts/nav/Sidebar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="flex">
        <SessionProvider>
          <Sidebar />
        </SessionProvider>

        <div className="w-full h-full">
          <AccountHeader />
          {children}
          
        </div>
      </div>
    </div>
  );
}
