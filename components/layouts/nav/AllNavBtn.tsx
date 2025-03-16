'use client'

import { LayoutGrid } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const AllNavBtn = () => {
    const searchParams = useSearchParams();
    const router = useRouter()
  
    if (!searchParams.get('category')) {
        return (
          
            <button
              className={`flex flex-col items-center cursor-pointer w-full group  transition-opacity hover:opacity-100 `}
            >
              <LayoutGrid />
              <p className="text-[.85rem] font-medium mt-1">All</p>
              <div
                className={`h-[2px] w-full bg-primary transition-colors ease-in rounded-full mt-2 `}
              ></div>
            </button>
         
        );
      }
    
      return (
        
        <button
          onClick={()=>router.push('/')}
          className={`flex flex-col items-center cursor-pointer w-full group  transition-opacity hover:opacity-100 `}
        >
          <LayoutGrid />
          <p className="text-[.85rem] font-medium mt-1">All</p>
          <div
            className={`h-[2px] w-full  group-hover:bg-brand transition-colors ease-in rounded-full mt-2 `}
          ></div>
        </button>
      );
    }
    
  


export default AllNavBtn