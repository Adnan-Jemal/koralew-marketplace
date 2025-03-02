"use client";
import React from "react";

import { useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { BadgeAlert, BadgeCheck, BadgeHelp, BadgeMinus } from "lucide-react";
import { conditionType } from "@/lib/types";
import { conditionsObj } from "@/lib/conditions";

type propType = {
  updateURL: (category: string, condition: conditionType[]) => void;
};

const ConditionFilter = ({ updateURL }: propType) => {
  const params = useSearchParams();
  const category = params.get("category") ?? "All";

  const handelValueChange = (value: conditionType[]) => {
    updateURL(category, value ?? []);
  };

  return (
    <div className=" w-full space-y-2 mb-4">
      <h3 className="text-xl mb-2 ">Condition</h3>{" "}
      <ToggleGroup
        type="multiple"
        onValueChange={(value: conditionType[]) => handelValueChange(value)}
        value={params.get("condition")?.split(",") ?? []}
        size={"sm"}
        variant={"outline"}
        className=" bg-secondary  rounded-2xl w-full h-fit py-4 gap-2 flex flex-wrap"
      >
        {conditionsObj.map((condition) => (
          <ToggleGroupItem
            key={condition.key}
            value={condition.value}
            className="flex items-center p-4 rounded-lg bg-background cursor-pointer hover:bg-primary-foreground data-[state=on]:bg-primary-foreground data-[state=on]:border data-[state=on]:border-primary   "
          >
            {condition.value === "New" ? (
              <BadgeCheck className="size-5" />
            ) : condition.value === "Used" ? (
              <BadgeAlert className="size-5" />
            ) : condition.value === "Refurbished" ? (
              <BadgeHelp />
            ) : (
              <BadgeMinus className="size-5" />
            )}
            <p>{condition.value}</p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ConditionFilter;
