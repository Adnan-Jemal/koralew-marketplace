import { auth } from "@/auth";
import SignInForm from "@/components/auth/SignInForm";
import { redirect } from "next/navigation";

import React from "react";
export default async function Page() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[url('../public/signin-bg.jpg')] bg-cover bg-center flex-col gap-6 ">
      <h1 className="text-4xl sm:text-5xl font-bold text-white">
        Welcome to Koralew
      </h1>
      <h3 className="text-xl text-white">Login or Sign up</h3>
      <SignInForm />
    </div>
  );
}
