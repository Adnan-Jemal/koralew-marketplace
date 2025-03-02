"use client";
import { categories, categoryLinks } from "@/lib/categories";
import { conditionType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { BadgeAlert, BadgeCheck, BadgeHelp, BadgeMinus } from "lucide-react";
import { Label } from "../ui/label";
import { Filter } from "lucide-react";
import { conditionsObj } from "@/lib/conditions";

const filterFormSchema = z.object({
  category: z
    .enum(["all", ...categoryLinks] as [string, ...string[]])
    .optional(),
  condition: z
    .array(z.enum(["New", "Slightly Used", "Used", "Refurbished"]))
    .optional(),
});

const FilterDrawer = () => {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q");

  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      category: params.get("category") ?? "all",
      condition: (params.get("condition")?.split(",") as conditionType[]) ?? [],
    },
  });

  function handleSubmit(values: z.infer<typeof filterFormSchema>) {
    const categoryExists = !!values.category && values.category != "all";
    const conditionExists = !!values.condition && values.condition?.length > 0;

    if (categoryExists && conditionExists) {
      router.push(
        `/search/?q=${query}&category=${values.category}&condition=${values.condition}`
      );
    } else if (!categoryExists && conditionExists) {
      router.push(`/search/?q=${query}&condition=${values.condition}`);
    } else if (categoryExists && !conditionExists) {
      router.push(`/search/?q=${query}&category=${values.category}`);
    } else {
      router.push(`/search/?q=${query}`);
    }
  }

  return (
   
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="secondary" size={"icon"} className="p-2">
            <Filter />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-4 pb-4">
          <DrawerHeader>
            <DrawerTitle>Filter Items</DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <Label className="text-md">Category</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-14 text-md">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[{ name: "All", link: "all" }, ...categories].map(
                          (category) => (
                            <SelectItem
                              className="text-md"
                              key={category.link}
                              value={category.link}
                            >
                              {category.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-md">Condition</Label>
                    <ToggleGroup
                      type="multiple"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      size={"sm"}
                      variant={"outline"}
                      className=" bg-secondary  rounded-2xl w-full h-fit p-4 gap-4 flex flex-wrap"
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
                  </FormItem>
                )}
              />

              <DrawerFooter className="py-4">
                <DrawerClose asChild>
                  <Button type="submit">Filter</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    
  );
};

export default FilterDrawer;
