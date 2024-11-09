
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { ShareAndWishlistBtns } from "./ShareAndWishlistBtns";


export default function ItemBreadCrumbs({ category }: { category: string }) {
  return (
    <div className="max-w-6xl mx-auto flex justify-between items-center py-4 ">
      <Breadcrumb>
        <BreadcrumbList className="text-md text-gray-500 dark:text-gray-400">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/?category=${category.toLowerCase()}`}>
              {category}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ShareAndWishlistBtns/>
    </div>
  );
}
