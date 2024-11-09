import { BadgeCheck, Grid2x2 } from 'lucide-react'
import React from 'react'

export default function ItemInfo({category,condition}:{category:string,condition:string}) {
  return (
    <div className="flex flex-col py-3  gap-2 border-b border-t border-secondary">
            <div className="flex space-x-1  ">
              <Grid2x2 className="size-5" />
              <p>
                Category:
                <span className="font-semibold">{" " +category}</span>
              </p>
            </div>
            <div className="flex space-x-1">
              <BadgeCheck className="size-5" />
              <p>
                Condition:
                <span className="font-semibold">{" " +condition}</span>
              </p>
            </div>
          </div>
  )
}
