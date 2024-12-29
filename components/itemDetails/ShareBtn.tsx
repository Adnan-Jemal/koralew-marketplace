"use client";
import { Button } from "../ui/button";
import { copyURL } from "@/lib/utils";
import { Share2 } from "lucide-react";

export default function ShareBtn() {
  return (
    <Button
      onClick={() => copyURL()}
      className="flex items-center justify-center gap-1"
      variant="ghost"
    >
      <Share2 className="size-5" />
      <span className="hidden sm:inline">Share</span>
    </Button>
  );
}
