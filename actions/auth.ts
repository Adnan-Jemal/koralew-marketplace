"use server";

import { signIn, signOut } from "@/auth";

export const signInGithub = async (redirect?: string) => {
  await signIn("github", { redirectTo: redirect });
};
export const signInGoogle = async (redirect?: string) => {
  await signIn("google", { redirectTo: redirect });
};
export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};
