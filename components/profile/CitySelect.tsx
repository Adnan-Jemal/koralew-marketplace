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

type PropTypes = {
  form: UseFormReturn<
    {
      name: string;
      email: string;
      phoneNumber: string;
      city: string;
      region: string;
      address: string;
    },
    undefined
  >;
  field: {
    value: string;
  };
};
export function CitySelect({ form, field }: PropTypes) {
  const [open, setOpen] = useState(false);
  //get selected region
  const region = EthiopiaRegions.regions.find(
    (e) => e.name == form.getValues("region")
  );
  // Get the list of cities
  const cities = region?.cities.map((city) => ({
    value: city,
    label: city,
  }));

  const handleSelect = (city: string) => {
    form.setValue("city", city);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
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
              ? cities?.find((city) => city.value === field.value)?.label
              : "Select city"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandList>
            <CommandEmpty>Please select a region first.</CommandEmpty>
            <CommandGroup>
              {cities?.map((city) => (
                <CommandItem
                  value={city.label}
                  key={city.value}
                  onSelect={() => {
                    handleSelect(city.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      city.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
