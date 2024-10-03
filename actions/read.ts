"use server"

import { db } from "@/db/db"
import { SelectUser, users } from "@/db/schema"
import { eq } from "drizzle-orm";


export async function getUserById(id: SelectUser['id']) {
  const user = db.select().from(users).where(eq(users.id, id));
  return (await user).length > 0 ? (await user).at(0) : null;
  
}
