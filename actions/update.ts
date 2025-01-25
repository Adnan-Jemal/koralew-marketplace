"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { SelectUser, users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUser(data: Partial<Omit<SelectUser, "id">>) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/signin");
  }

  const result = await db
    .update(users)
    .set(data)
    .where(eq(users.id, session.user.id));
  if (!result) {
    return {};
  }
}
export async function updateUserPhoto(imgUrl: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return redirect("/signin");
    await db
      .update(users)
      .set({ image: imgUrl })
      .where(eq(users.id, session.user.id));
    revalidatePath("/account/profile");
  } catch (error) {
    console.log(error);
    throw error;
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

// export async function clgImag(formdata:FormData) {
//   const image = formdata.get('profileImg');
//   console.log(image)

// }
