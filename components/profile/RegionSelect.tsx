"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { EthiopiaRegions } from "@/lib/ethiopiaRegions";
import { useState } from "react";

// Get the list of regions

type PropTypes = {
  form: UseFormReturn<
    {
      name: string;
      email: string;
      phoneNumber: string;
      region: string;
      city: string;
      address: string;
    },
    undefined
  >;
  field: {
    value: string;
  };
};
export function RegionSelect({ form, field }: PropTypes) {
  const [open, setOpen] =useState(false);
  const regions = EthiopiaRegions.regions.map((region) => ({
    value: region.name,
    label: region.name,
  }));
  const handelSelect = (region: string) => {
    form.setValue("region", region);
    form.setValue("city", "");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? regions.find((region) => region.value === field.value)?.label
              : "Select region"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search region..." />
          <CommandList>
            <CommandEmpty>No region found.</CommandEmpty>
            <CommandGroup>
              {regions.map((region) => (
                <CommandItem
                  value={region.label}
                  key={region.value}
                  onSelect={() => handelSelect(region.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      region.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {region.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
