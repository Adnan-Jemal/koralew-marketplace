import React from "react";
import { Button } from "../ui/button";
import { signIn } from "@/auth";

export default function SignInForm() {
  return (
    <div className="px-12 py-16 border-2  rounded-lg shadow-lg bg- flex flex-col gap-5 lg:w-[40%] sm:w-[60%]  items-center">
      
      <form className="w-full flex justify-center "
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button variant={"secondary"} className="w-full text-md py-6  " >Continue With Google</Button>
      </form>

      <form className="w-full flex justify-center "
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button variant={"secondary"} className="w-full text-md py-6">Continue With Github</Button>
      </form>
    </div>
  );
}
