"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { conditionEnum, SelectProduct } from "@/db/schema/products";
import { Ellipsis } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categories } from "@/lib/categories";

const categoryNames = categories.map((c) => c.name);

export const addItemFormSchema = z.object({
  title: z.string().min(5, { message: "Must be at leas 5 characters" }).max(50),
  category: z.enum(categoryNames as [string, ...string[]], {
    message: "Please select a category",
  }),
  description: z
    .string()
    .max(800)
    .min(10, { message: "description is too short" }),
  price: z
    .string({ message: "please enter price" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a correct price" })
    .min(1)
    .max(10, { message: "your item is not worth this much" }),

  condition: z.enum(conditionEnum.enumValues, {
    message: "please select a condition",
  }),
});

type propTypes = {
  onSubmit: (values: z.infer<typeof addItemFormSchema>) => Promise<void>;
  item?: SelectProduct;
};

export default function AddItemForm({ onSubmit, item }: propTypes) {
  const form = useForm<z.infer<typeof addItemFormSchema>>({
    resolver: zodResolver(addItemFormSchema),
    defaultValues: {
      title: item?.title || "",
      category: item?.category || "",
      description: item?.description || "",
      price: item?.price || "",
      condition: item?.condition,
    },
  });
  return (
    <div className="w-full p-4 shadow-lg rounded-2xl dark:border flex flex-col gap-6 dark:border-secondary">
      <div className=" w-[95%] border-b dark:border-b-secondary border-b-gray-200 self-center text-start">
        <h2 className="text-xl my-4 ml-1 uppercase ">Item Information</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className=" grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label className="text-md">Title / Name</Label>
                  <FormControl>
                    <Input
                      placeholder="What are you selling"
                      {...field}
                      className="h-14 text-md"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
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
                      {categories.map((category) => (
                        <SelectItem
                          className="text-md"
                          key={category.link}
                          value={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
          </div>{" "}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <Label className="text-md">Description</Label>
                <FormControl>
                  <Textarea
                    placeholder="Describe your item"
                    {...field}
                    className="h-28 text-md"
                  />
                </FormControl>
                <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
              </FormItem>
            )}
          />
          <div className=" grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1 ">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label className="text-md">Price (US$)</Label>

                  <FormControl>
                    <Input
                      type="number"
                      placeholder="how much in USD"
                      {...field}
                      className="h-14 text-md"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label className="text-md">Condition</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-14 text-md">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {conditionEnum.enumValues.map((condition) => (
                        <SelectItem
                          className="text-md"
                          key={condition}
                          value={condition}
                        >
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full text-lg" size={"lg"} type="submit">
            {form.formState.isSubmitting ? (
              <Ellipsis className="text-4xl animate-bounce" />
            ) : item ? (
              "Update Item"
            ) : (
              "List Item"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
