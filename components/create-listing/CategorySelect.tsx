
// "use client";

// import * as React from "react";
// import { getNames } from "country-list";
// import { Check, ChevronsUpDown } from "lucide-react";
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
// import { FormControl } from "@/components/ui/form";
// import { UseFormReturn } from "react-hook-form";
// import { categories, categoryType } from "../layouts/nav/NavCategories";



// type PropTypes = {
//   form: UseFormReturn<
//     {
//       name: string;
//       email: string;
//       phoneNumber: string;
//       country: string;
//       city: string;
//       address: string;
//     },
//     any,
//     undefined
//   >;
//   field: {
//     value: string;
//   };
// };
// export function CategorySelect({ form, field }: PropTypes) {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <FormControl>
//           <Button
//             variant="outline"
//             role="combobox"
//             className={cn(
//               "w-full justify-between",
//               !field.value && "text-muted-foreground"
//             )}
//           >
//             {field.value
//               ?categories
//               : "Select country"}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </FormControl>
//       </PopoverTrigger>
//       <PopoverContent className="w-full p-0">
//         <Command>
//           <CommandInput placeholder="Search country..." />
//           <CommandList>
//             <CommandEmpty>No country found.</CommandEmpty>
//             <CommandGroup>
//               {categories.map((category) => (
//                 <CommandItem
//                   value={category.name}
//                   key={category.link}
//                   onSelect={() => {
//                     form.setValue("Category", country.value);
//                     setOpen(false);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       country.value === field.value
//                         ? "opacity-100"
//                         : "opacity-0"
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
