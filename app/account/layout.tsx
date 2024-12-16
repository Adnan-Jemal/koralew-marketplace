import AccountHeader from "@/components/layouts/nav/AccountHeader";
import Sidebar from "@/components/layouts/nav/Sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="flex">
        <Sidebar />

        <div className="w-full h-full">
          <AccountHeader />
          {children}
        </div>
      </div>
    </div>
  );
}
