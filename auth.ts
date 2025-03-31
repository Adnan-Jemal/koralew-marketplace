import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";
import github from "next-auth/providers/github";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "./firebase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google, github],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  events: {
    async createUser({ user }) {
      try {
        if (!user?.id) throw new Error("Missing user ID");

        await addDoc(collection(firestore, "notifications"), {
          receiver: user.id,
          type: "Welcome " + user.name + "!  🎉",
          message:
            "We're thrilled to have you on board and welcome you to Koralew! Start exploring listed items, connect with others, and begin selling your own items. እንኳን ደና መጡ።",
          link: "/",
          read: false,
          sentAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Notification creation failed:", error);
      }
    },
  },
});
