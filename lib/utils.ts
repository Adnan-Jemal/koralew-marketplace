import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromDashedToCapitalizedWord(text: string | null) {
  if (!text) return;
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function copyURL() {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("Link Copied");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      toast.error("something went wrong");
    });
}



