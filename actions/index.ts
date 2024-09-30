"use server"

import { signOut } from "@/auth"

export const logOut = async(redirect?:string) => {
    await signOut({redirectTo:redirect});
}