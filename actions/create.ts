"use server"

import { addItemFormSchema } from "@/components/create-listing/AddItemForm"
import { db } from "@/db/db"
import { InsertProduct, products } from "@/db/schema"
import { Session } from "next-auth"
import { conditionEnum } from "@/db/schema";
import { z } from "zod"


export async function addItem(formValues:z.infer<typeof addItemFormSchema>,uID:string) {
    let newProduct:InsertProduct = { ...formValues, userId:uID}
    await db.insert(products).values(newProduct)
}