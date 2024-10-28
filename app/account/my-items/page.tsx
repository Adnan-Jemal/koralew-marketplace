import {  getUserItems} from "@/actions/read";

import ItemCard from "@/components/ItemCard/ItemCard";


import React from "react";



export default async function page() {
  
  const userItems = await getUserItems();
  


  if(!userItems) {
    return (<div>No Items Found</div>)
  }


  return (
    <div className="p-10 gap-10 flex flex-col">
      <h1 className="text-4xl capitalize font-semibold text-center sm:text-start">Your Listed Items</h1>
      <div className="flex flex-wrap gap-8 items-center justify-around ">
       
        {userItems?.map((item) => {
          let image = item.images as string[];
          return (
            <ItemCard
            key={item.id}
              title={item.title}
              imageUrl={image[0]}
              price={parseFloat(item.price)}
              condition={item.condition}
            />
          );
        })}
        {/* {userItems?.rows.map((item) => {
          let image = item.images as string[];
          return (
            <ItemCard
              title={item.title as string}
              imageUrl={image[0] as string}
              price={parseFloat(item.price as string)}
              condition={item.condition as string}
            />
          );
        })} */}

        <ItemCard
        title="rolex luxury men's watch"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1004%2Fimage_0?alt=media&token=237e1622-b3ad-4cab-8b31-2a99c97d31b9"
        price={10}
        condition="NEW"
      />
      <ItemCard
        title="rolex luxury men's watch"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1004%2Fimage_0?alt=media&token=237e1622-b3ad-4cab-8b31-2a99c97d31b9"
        price={200}
        condition="Refurbished"
      />
      <ItemCard
        title="rolex luxury men's watch and shoes for outdoors"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1004%2Fimage_0?alt=media&token=237e1622-b3ad-4cab-8b31-2a99c97d31b9"
        price={2000}
        condition="NEW"
      />
      <ItemCard
        title="rolex luxury men's watch"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/koralew-fb48a.appspot.com/o/images%2Fproducts%2F1004%2Fimage_0?alt=media&token=237e1622-b3ad-4cab-8b31-2a99c97d31b9"
        price={600000}
        condition="Slightly Used"
      />
      </div>
    </div>
  );
}
