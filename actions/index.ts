"use server"

import { signIn, signOut } from "@/auth"

export const logOut = async(redirect?:string) => {
    await signOut({redirectTo:redirect});
}
export const signInGithub = async() => {
    await signIn("github");
}
export const signInGoogle = async() => {
    
        await signIn("google")
  
    
    
}

