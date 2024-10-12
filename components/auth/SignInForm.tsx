"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { signInGithub, signInGoogle } from "@/actions";

export default function SignInForm() {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);


  const googleSigning = async () => {
    try {
      setGoogleLoading(true);
      await signInGoogle();
    } catch (error) {
      setGoogleLoading(false);
      console.log(error);
    }
  };
  const githubSigning = async () => {
    try {
      setGithubLoading(true);
      await signInGithub();
    } catch (error) {
      setGithubLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="px-12 py-16 border-2  rounded-lg shadow-lg bg- flex flex-col gap-5 lg:w-[40%] sm:w-[60%]  items-center">
      <Button
        onClick={googleSigning}
        disabled={googleLoading || githubLoading}
        variant={"secondary"}
        className="w-full text-md py-6  "
      >
        {googleLoading ? (
          <span className="animate-bounce text-3xl">...</span>
        ) : (
          "Continue With Google"
        )}
      </Button>

      <Button
        onClick={githubSigning}
        disabled={googleLoading || githubLoading}
        variant={"secondary"}
        className="w-full text-md py-6"
      >
        {githubLoading ? (
          <span className="animate-bounce text-3xl">...</span>
        ) : (
          "Continue With Github"
        )}
      </Button>
    </div>
  );
}
