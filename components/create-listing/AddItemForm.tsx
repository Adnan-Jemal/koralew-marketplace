"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
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

import { toast } from "sonner";

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
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Invalid phone number" }),
  country: z.string().min(4, { message: "Please select a country" }),
  city: z.string().min(4, { message: "Please enter a real city" }),
  address: z.string().min(4, { message: "Please enter a real address" }),
});

type propType = {
  userData: SelectUser;
};

export default function AddItemForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      phoneNumber: "",
      country: "",
      city: "",
      address: "",
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
                        <SelectItem className="text-md" key={category.link} value={category.name}>
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
            name="title"
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
          <div className=" flex gap-4 flex-col sm:flex-row">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label>City</Label>
                  <FormControl>
                    <Input placeholder="Enter Your City" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label>Address</Label>
                  <FormControl>
                    <Input placeholder="Enter Your Address" {...field} />
                  </FormControl>
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
