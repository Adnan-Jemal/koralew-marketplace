import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fromDashedToCapitalizedWord(text:string|null){
  if(!text)
    return
  return text.split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
  .join(' '); 
}