"use client";
import { ItemWithImages } from "@/lib/types";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ItemCard from "../ItemCard/ItemCard";
import { toast } from "sonner";

const InfiniteScrollOffset = 5;

type InfiniteItemListProps = {
  initialItems: ItemWithImages[];
  url: string;
};

export default function InfiniteItemList({
  initialItems,
  url,
}: InfiniteItemListProps) {
  const [items, setItems] = useState(initialItems);
  const [offset, setOffset] = useState(InfiniteScrollOffset);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  // Reset state when url or initialItems change
  useEffect(() => {
    setItems(initialItems);
    setOffset(InfiniteScrollOffset);
    setAllItemsLoaded(false);
  }, [initialItems, url]);


  useEffect(() => {
    async function loadMoreItems() {
      try {
        setIsLoading(true);
        const response = await fetch(url + `&offset=${offset}`);

        if (!response.ok) {
          toast.error('Something Went Wrong')
          throw new Error("Network response was not ok");
        }
        const newItems = await response.json();

        if (newItems.length === 0) {
          setAllItemsLoaded(true);
        } else {
          setItems((prev) => [...prev, ...newItems]);
          setOffset((prev) => prev + InfiniteScrollOffset);
        }
      } catch (error) {
        toast.error('Something Went Wrong')
        console.error("Error loading more items:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (inView && !allItemsLoaded && !isLoading) {
      loadMoreItems();
    }
  }, [inView, allItemsLoaded, isLoading]);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-10 items-center justify-evenly ">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          title={item.title}
          imageUrl={
            item.images.find((img) => img.order === 1)?.imageUrl ||
            item.images[0].imageUrl
          }
          price={parseFloat(item.price)}
          condition={item.condition}
        />
      ))}

      {/* Loading skeletons */}
      {!allItemsLoaded && (
        <>
          <div ref={ref}>
            <Skeleton className="bg-primary-foreground w-72 h-80 rounded-2xl shadow-md cursor-pointer" />
          </div>
          <Skeleton className="bg-primary-foreground w-72 h-80 rounded-2xl shadow-md cursor-pointer" />
          <Skeleton className="bg-primary-foreground w-72 h-80 rounded-2xl shadow-md cursor-pointer" />
          <Skeleton className="bg-primary-foreground w-72 h-80 rounded-2xl shadow-md cursor-pointer" />
        </>
      )}
    </div>
  );
}
