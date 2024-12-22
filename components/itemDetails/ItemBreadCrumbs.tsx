
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  
  BreadcrumbSeparator,
} from "../ui/breadcrumb";


export default function ItemBreadCrumbs({ category }: { category: string }) {
  return (
    
      <Breadcrumb>
        <BreadcrumbList className=" text-gray-500 dark:text-gray-400">
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
   
  );
}
