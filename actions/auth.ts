"use server";

import { signIn } from "@/auth";

export const signInGithub = async (redirect?: string) => {
  await signIn("github", { redirectTo: redirect });
};
export const signInGoogle = async (redirect?: string) => {
  await signIn("google", { redirectTo: redirect });
};
