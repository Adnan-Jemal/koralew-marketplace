"use server"
import { auth } from '@/auth';
import { db } from '@/db/db';
import { SelectUser, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {storage} from '@/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { File } from 'buffer';

import { revalidatePath } from 'next/cache';




export async function updateUser(id: SelectUser['id'], data: Partial<Omit<SelectUser, 'id'>>) {
  await db.update(users).set(data).where(eq(users.id, id));
}
export async function updateUserPhoto(userId: SelectUser['id'], imgUrl: string) {
  try {
    await db.update(users).set({ image: imgUrl }).where(eq(users.id, userId));
    revalidatePath('/account/profile')
  } catch (error) {
    console.log(error);
  }
  
  // const session = await auth();
  // if (!session) {
  //   console.error("You need to be logged in");
  //   return;
  // }

  // const userId = session?.user?.id;
  // if(!userId){
  //   console.error("The user does not exist")
  //   return
  // }

 
  // if (!image) {
  //   console.error("No image found");
  //   return;
  // }
  
  // const newImageRef = ref(storage, `images/users/${userId}`);
  // await uploadBytesResumable(newImageRef, image as Blob);
  // const imgUrl = await getDownloadURL(newImageRef);
  // try {
  //   await db.update(users).set({ image: imgUrl }).where(eq(users.id, userId));
  
  //   revalidatePath("/account/profile");
      
  // } catch (error) {
  //   console.error(error)
  // }
 
}




export async function clgImag(formdata:FormData) {
  const image = formdata.get('profileImg');
  console.log(image)
 
}
