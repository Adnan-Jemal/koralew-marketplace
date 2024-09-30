import { auth } from "@/auth";
import SignInForm from "@/components/forms/SignInForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
export default async function Page() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
   
      <div className=" h-screen w-full flex items-center justify-center  flex-col gap-6 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary">
          Welcome to Koralew
        </h1>
        <h3 className="text-xl text-primary">Login or Sign up</h3>
        <SignInForm />
      </div>
    
  );
}
