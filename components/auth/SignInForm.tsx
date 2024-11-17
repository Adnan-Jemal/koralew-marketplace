"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { signInGithub, signInGoogle } from "@/actions";
import { Ellipsis } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SignInForm() {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const googleSigning = async () => {
    try {
      setGoogleLoading(true);
      await signInGoogle(callbackUrl ?? undefined);
    } catch (error) {
      setGoogleLoading(false);
      console.log(error);
    }
  };
  const githubSigning = async () => {
    try {
      setGithubLoading(true);
      await signInGithub(callbackUrl ?? undefined);
    } catch (error) {
      setGithubLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="px-12 py-12 border-2  rounded-xl shadow-lg bg-primary-foreground flex flex-col justify-between gap-8 lg:w-[40%] sm:w-[60%]  items-center">
      <Button
        onClick={googleSigning}
        disabled={googleLoading || githubLoading}
        variant={"outline"}
        className="w-full text-md py-6 shadow-lg "
      >
        {googleLoading ? (
          <Ellipsis className="text-4xl animate-bounce" />
        ) : (
          <span className="flex gap-2">Continue With Google</span>
        )}
      </Button>

      <Button
        onClick={githubSigning}
        disabled={googleLoading || githubLoading}
        variant={"outline"}
        className="w-full text-md py-6 shadow-lg"
      >
        {githubLoading ? (
          <Ellipsis className="text-4xl animate-bounce" />
        ) : (
          <span className="flex gap-2">Continue With Github</span>
        )}
      </Button>
    </div>
  );
}
