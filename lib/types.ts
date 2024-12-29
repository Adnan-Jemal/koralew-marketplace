import { SelectProductImages } from "@/db/schema/productImages";

export type ItemWithImages = {
    id: number;
    title: string;
    description: string;
    userId: string;
    category: string;
    condition: "New" | "Slightly Used" | "Used" | "Refurbished";
    price: string;
    views: number;
    createdAt: Date;
    images: SelectProductImages[];
  };