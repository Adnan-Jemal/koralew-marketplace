"use client";

import { useForm } from "react-hook-form";
import { undefined, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SelectUser } from "@/db/schema";
import { updateUser } from "@/actions/update";

import { conditionEnum } from "@/db/schema";

import { Ellipsis } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categories } from "../layouts/nav/NavCategories";

const formSchema = z.object({
  title: z.string().min(5).max(50),
  category: z.string(),
  description: z
    .string()
    .max(300)
    .min(10, { message: "description is too short" }),
  price: z
    .number()
    .min(10)
    .max(100000000, { message: "your item is not worth this much." }),
  condition: z.string(),
  priceNegotiable: z.boolean(),
});

export default function AddItemForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      condition:"",
      priceNegotiable:true


    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // await updateUser(userData.id, values).then(() => toast("Profile Updated"));
    form.reset(form.getValues());
  }
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
                  <Label className="text-md">Price</Label>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="How much"
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
                      {conditionEnum.enumValues.map((condition)=><SelectItem
                          className="text-md"
                          key={condition}
                          value={condition}
                        >
                          {condition}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <Ellipsis className="text-4xl animate-bounce" />
            ) : (
              <span>Update profile</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}