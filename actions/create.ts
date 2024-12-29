"use server"
import { addItemFormSchema } from "@/components/create-listing/AddItemForm"
import { db } from "@/db/db"
import { favorites } from "@/db/schema/favorites"
import { productImages } from "@/db/schema/productImages"
import { InsertProduct, products } from "@/db/schema/products"

import { z } from "zod"


export async function addItem(formValues:z.infer<typeof addItemFormSchema>,uID:string) {
    let newProduct:InsertProduct = { ...formValues, userId:uID}
    let addedProduct=await db.insert(products).values(newProduct).returning({newProductId:products.id})
    return addedProduct[0].newProductId
}
export async function addImage(productId:number,Url:string,index:number){
    try {
        await db.insert(productImages).values({productId:productId,imageUrl:Url,order:index})
        console.log("added to db")
    } catch (error) {
        console.error(error)
    }
  
}
export async function addToFavorites(productId:string, userId:string){
    try {
        let newFavorite = await db.insert(favorites).values({productId:productId,userId:userId,}).returning()
        return newFavorite
    } catch (error) {
        console.error(error)
        throw new Error('Unable to add to favorites');
    }
   
   

}