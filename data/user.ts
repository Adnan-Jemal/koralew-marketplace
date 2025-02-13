import "server-only";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { SelectUser, users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));
    return user.at(0);
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get user");
  }
}
export async function getItemSeller(userId: string) {
  const seller = await db.select().from(users).where(eq(users.id, userId));
  return seller[0] as SelectUser;
}
