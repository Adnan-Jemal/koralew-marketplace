import "server-only";
import { auth } from "@/auth";
import { db } from "@/db/db";
import { favorites } from "@/db/schema/favorites";
import { productImages } from "@/db/schema/productImages";
import { products } from "@/db/schema/products";
import { SelectUser, users } from "@/db/schema/users";
import {
  firebaseChatType,
  firestoreChatTypeWithId,
  firestoreMessageTypeWithId,
  ItemWithImages,
} from "@/lib/types";
import { and, desc, eq, max, ne, sql } from "drizzle-orm";

import { redirect } from "next/navigation";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  or,
  orderBy,
  Query,
  query,
  where,
  and as fbAnd,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "@/firebase";

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

export async function getUserItems() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");
  try {
    const items = await db
      .select({
        id: products.id,
        title: products.title,
        condition: products.condition,
        price: products.price,
        status: products.status,
        images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${productImages.imageUrl},
          'order', ${productImages.order},
          'productId',${productImages.productId}
        )
      )
    `.as("images"),
      })
      .from(products)
      .innerJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(products.userId, session.user.id))
      .groupBy(products.id)
      .orderBy(sql`${products.createdAt} DESC`);
    return items as ItemWithImages[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCategoryItems(category: string) {
  const items = await db
    .select({
      id: products.id,
      title: products.title,
      condition: products.condition,
      price: products.price,
      images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${productImages.imageUrl},
          'order', ${productImages.order},
          'productId',${productImages.productId}
        )
      )
    `.as("images"),
    })
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(and(eq(products.category, category), eq(products.status, "Active")))
    .groupBy(products.id);

  return items as ItemWithImages[];
}

export async function getItem(id: number) {
  const item = await db
    .select({
      id: products.id,
      userId: products.userId,
      title: products.title,
      category: products.category,
      condition: products.condition,
      createdAt: products.createdAt,
      price: products.price,
      description: products.description,
      status: products.status,
      images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${productImages.imageUrl},
          'order', ${productImages.order},
          'productId',${productImages.productId}
        )
      )
    `.as("images"),
    })
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(eq(products.id, id))
    .groupBy(products.id);
  return item[0] as ItemWithImages;
}
export async function getItemSeller(userId: string) {
  const seller = await db.select().from(users).where(eq(users.id, userId));
  return seller[0] as SelectUser;
}

export async function getSimilarCategoryItems(
  category: string,
  productId: number
) {
  const items = await db
    .select({
      id: products.id,
      title: products.title,
      condition: products.condition,
      price: products.price,
      images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${productImages.imageUrl},
          'order', ${productImages.order},
          'productId',${productImages.productId}
        )
      )
    `.as("images"),
    })
    .from(products)
    .innerJoin(productImages, eq(products.id, productImages.productId))
    .where(and(eq(products.category, category), ne(products.id, productId)))
    .groupBy(products.id);

  return items as ItemWithImages[];
}

export async function isProductFavorited(productId: number) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");
  try {
    const result = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.productId, productId),
          eq(favorites.userId, session?.user?.id)
        )
      );
    return result.length > 0;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw error;
  }
}

export async function getFavoriteItems() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/signin");
  try {
    const items = await db
      .select({
        id: products.id,
        title: products.title,
        condition: products.condition,
        price: products.price,
        images: sql`
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'imageUrl', ${productImages.imageUrl},
          'order', ${productImages.order},
          'productId',${productImages.productId}
        )
      )
    `.as("images"),
      })
      .from(favorites)
      .innerJoin(products, eq(favorites.productId, products.id))
      .innerJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(favorites.userId, session.user.id))
      .groupBy(products.id, favorites.createdAt)
      .orderBy(desc(favorites.createdAt));
    return items as ItemWithImages[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getItemImgs(productId: number) {
  const productImgs = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, productId));
  return productImgs;
}

export async function getItemWithOutImgs(itemId: number) {
  const item = await db.select().from(products).where(eq(products.id, itemId));
  return item[0];
}
export async function getItemImgsMaxOrder(itemId: number) {
  const res = await db
    .select({ maxImgOrder: max(productImages.order) })
    .from(productImages)
    .where(eq(productImages.productId, itemId));
  return res[0].maxImgOrder;
}
export async function getChat(sellerId: string, itemId: number) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const buyerId = session.user.id;
  try {
    const chatsRef = collection(firestore, "chats");
    const chatQuery = query(
      chatsRef,
      where("productId", "==", itemId),
      where("sellerId", "==", sellerId),
      where("buyerId", "==", buyerId),
      where(
        "chatId",
        "==",
        itemId.toString() +
          "-" +
          sellerId.slice(0, 4) +
          "-" +
          buyerId.slice(0, 4)
      )
    );
    const querySnapshot = await getDocs(chatQuery);

    if (!querySnapshot.empty) {
      // Return the first matching chat's id
      return querySnapshot.docs[0].id;
    }
    // Return null if no chat is found
    return null;
  } catch (e) {
    console.error("Error querying chat: ", e);
    throw e;
  }
}
export async function getSellingChats() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const chatsRef = collection(firestore, "chats");
    const chatQuery = query(
      chatsRef,
      where("sellerId", "==", session.user.id),
      where("itemSnapshot.status", "!=", "Removed"),
      orderBy("lastMessageAt", "desc")
    ) as Query<firebaseChatType>;
    const querySnapshot = await getDocs(chatQuery);

    // Convert documents to usable data
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        lastMessageAt: data.lastMessageAt?.toDate(),
        createdAt: data.createdAt?.toDate(),
      } as firestoreChatTypeWithId;
    });
  } catch (e) {
    console.error("Error querying chats: ", e);
    throw new Error("Failed to fetch selling chats"); // Better error message
  }
}

export async function getBuyingChats() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const chatsRef = collection(firestore, "chats");
    const chatQuery = query(
      chatsRef,
      where("buyerId", "==", session.user.id),
      where("itemSnapshot.status", "!=", "Removed"),
      orderBy("lastMessageAt", "desc")
    ) as Query<firebaseChatType>;
    const querySnapshot = await getDocs(chatQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        lastMessageAt: data.lastMessageAt?.toDate(),
        createdAt: data.createdAt?.toDate(),
      } as firestoreChatTypeWithId;
    });
  } catch (e) {
    console.error("Error querying chats: ", e);
    throw new Error("Failed to fetch buying chats");
  }
}
export async function getChatById(ChatId: string) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const chatRef = doc(firestore, "chats", ChatId);
    const docSnap = await getDoc(chatRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        lastMessageAt: docSnap.data().lastMessageAt?.toDate(),
        createdAt: docSnap.data().createdAt?.toDate(),
      } as firestoreChatTypeWithId;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error querying chat: ", e);
    throw e;
  }
}
export async function getMessages(chatId: string) {
  const session = await auth();
  if (!session?.user?.id) return redirect("/");

  try {
    const messagesRef = collection(firestore, "messages");
    const messagesQuery = query(
      messagesRef,
      fbAnd(
        where("chatId", "==", chatId),
        or(
          where("senderId", "==", session.user.id),
          where("receiverId", "==", session.user.id)
        )
      ),
      orderBy("sentAt", "asc")
    );
    const querySnapshot = await getDocs(messagesQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        sentAt: data.sentAt?.toDate(),
      } as firestoreMessageTypeWithId;
    });
  } catch (e) {
    console.error("Error querying messages: ", e);
    throw new Error("Failed to fetch messages");
  }
}

export async function getRealtimeMessages(
  chatId: string,
  callback: (messages: firestoreMessageTypeWithId[]) => void
) {
  try {
    // Get the current session.
    const session = await auth();
    if (!session?.user?.id) {
      console.warn(
        "No authenticated user; cannot subscribe to realtime messages."
      );
      return () => {};
    }

    // Reference to the messages subcollection inside the specific chat.
    const messagesRef = collection(firestore, "chats", chatId, "messages");

    // If your data is stored in the subcollection, you might not need to filter by chatId.
    // Otherwise, uncomment the where clause if necessary.
    const messagesQuery = query(
      messagesRef,
      // where("chatId", "==", chatId), // Possibly redundant in a subcollection.
      orderBy("sentAt", "asc") // Chronological order: oldest messages first.
    );

    // Set up the realtime listener.
    const unsubscribe = onSnapshot(
      messagesQuery,
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Convert Firestore Timestamp to JS Date.
            sentAt: data.sentAt?.toDate(),
          } as firestoreMessageTypeWithId;
        });
        callback(messages);
      },
      (error) => {
        console.error("Real-time messages error:", error);
      }
    );

    return unsubscribe; // Return the cleanup function.
  } catch (error) {
    console.error("Error setting up realtime messages:", error);
    return () => {};
  }
}
