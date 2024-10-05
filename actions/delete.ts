"use server"
import SignOut from '@/components/SignOut';
import { db } from '@/db/db';
import { SelectUser, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
export async function deleteUser(id: SelectUser['id']) {
  await db.delete(users).where(eq(users.id, id)).then(()=>SignOut()).then(()=>redirect('/'));
}