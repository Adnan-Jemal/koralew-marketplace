"use server";

import { auth } from "@/auth";
import { addItemFormSchema } from "@/components/createEditListing/AddItemForm";
import { db } from "@/db/db";
import { products } from "@/db/schema/products";
import { SelectUser, users } from "@/db/schema/users";
import { firestore } from "@/firebase";
import { ItemStatusType } from "@/lib/types";
import { and, eq } from "drizzle-orm";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export async function updateItem(
  formValues: z.infer<typeof addItemFormSchema>,
  itemId: number
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/");
  }
  await db
    .update(products)
    .set({
      title: formValues.title,
      category: formValues.category,
      description: formValues.description,
      price: formValues.price,
      condition: formValues.condition,
    })
    .where(and(eq(products.userId, session.user.id), eq(products.id, itemId)));
}

export async function updateItemStatus(
  itemId: number,
  newStatus: ItemStatusType
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/");
  }
  await db
    .update(products)
    .set({
      status: newStatus,
    })
    .where(and(eq(products.userId, session.user.id), eq(products.id, itemId)));
  await updateItemStatusForChat(itemId, newStatus);
}

export async function updateItemStatusForChat(
  itemId: number,
  newStatus: ItemStatusType
) {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/");
  }
  try {
    const chatsRef = collection(firestore, "chats");
    const q = query(
      chatsRef,
      where("productId", "==", itemId),
      where("sellerId", "==", session.user.id)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnap) => {
      await updateDoc(docSnap.ref, {
        "itemSnapshot.status": newStatus.toString(),
      });
    });
  } catch (e) {
    console.error("Error updating item status: ", e);
  }
}
