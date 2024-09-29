import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db/db"
import github from "next-auth/providers/github"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google,github],
  pages:{
    signIn:'/signin'
  },
  callbacks: {
    authorized: async ({ auth }) => {
    // Logged in users are authenticated, otherwise redirect to login page
    return !!auth
  },}
})