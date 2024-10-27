"use server"
import { addItemFormSchema } from "@/components/create-listing/AddItemForm"
import { db } from "@/db/db"
import { InsertProduct, productImages, products } from "@/db/schema"
import { z } from "zod"


export async function addItem(formValues:z.infer<typeof addItemFormSchema>,uID:string) {
    let newProduct:InsertProduct = { ...formValues, userId:uID}
    let addedProduct=await db.insert(products).values(newProduct).returning({newProductId:products.id})
    return addedProduct[0].newProductId
}
export async function addImage(productId:number,Url:string,index:number){
    await db.insert(productImages).values({productId:productId,imageUrl:Url,order:index})
    console.log("added to db")
}