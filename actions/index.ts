"use server"

import { signIn, signOut } from "@/auth"

export const logOut = async(redirect?:string) => {
    await signOut({redirectTo:redirect});
}
export const signInGithub = async(redirect?:string) => {
    await signIn("github",{redirectTo:redirect});
}
export const signInGoogle = async(redirect?:string) => {
    await signIn("google",{redirectTo:redirect})
}

