"use server"

import { addItemFormSchema } from "@/components/create-listing/AddItemForm"
import { db } from "@/db/db"
import { InsertProduct, productImages, products } from "@/db/schema"
import { Session } from "next-auth"
import { conditionEnum } from "@/db/schema";
import { z } from "zod"
import { UUID } from "crypto"


export async function addItem(formValues:z.infer<typeof addItemFormSchema>,uID:string) {
    let newProduct:InsertProduct = { ...formValues, userId:uID}
    let addedProduct=await db.insert(products).values(newProduct)
    return addedProduct.rows[0]
}

export async function addImage(productId:number,Url:string){
    await db.insert(productImages).values({productId:productId,imageUrl:Url})
}