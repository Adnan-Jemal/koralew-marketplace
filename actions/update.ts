"use server"
import { db } from '@/db/db';
import { SelectUser, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { Url } from 'url';

export async function updateUser(id: SelectUser['id'], data: Partial<Omit<SelectUser, 'id'>>) {
  await db.update(users).set(data).where(eq(users.id, id));
}
export async function updateUserPhoto(id: SelectUser['id'], formdata:FormData) {
  await db.update(users).set({image:formdata.get()}).where(eq(users.id, id));
}
