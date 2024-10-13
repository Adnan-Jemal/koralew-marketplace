// "use client";

// import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { getNames } from "country-list"; // Import country-list functions
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// // Get the list of country names from country-list
// const countries = getNames().map((countryName) => ({
//   value: countryName.toLowerCase().replace(/\s+/g, "-"), // Generate a value from the name
//   label: countryName, // Label is the country name
// }));

// export function CountryInput() {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[200px] justify-between"
//         >
//           {value
//             ? countries.find((country) => country.value === value)?.label
//             : "Select country..."}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search country..." />
//           <CommandList>
//             <CommandEmpty>No country found.</CommandEmpty>
//             <CommandGroup>
//               {countries.map((country) => (
//                 <CommandItem
//                   key={country.value}
//                   value={country.value}
//                   onSelect={(currentValue) => {
//                     setValue(currentValue === value ? "" : currentValue);
//                     setOpen(false);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       value === country.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                   {country.label}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
"use client";

import * as React from "react";
import { getNames } from "country-list";
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

// Get the list of countries
const countries = getNames().map((country) => ({
  value: country.toLowerCase().replace(/\s+/g, "-"),
  label: country,
}));

type PropTypes = {
  form: UseFormReturn<
    {
      name: string;
      email: string;
      phoneNumber: string;
      country: string;
      city: string;
      address: string;
    },
    any,
    undefined
  >;
  field: {
    value: string;
  };
};
export function CountrySelect({ form, field }: PropTypes) {
  const [open, setOpen] = React.useState(false);

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
              ? countries.find((country) => country.value === field.value)
                  ?.label
              : "Select country"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  value={country.label}
                  key={country.value}
                  onSelect={() => {
                    form.setValue("country", country.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      country.value === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
