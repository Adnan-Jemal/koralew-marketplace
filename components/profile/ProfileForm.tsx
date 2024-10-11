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
import { CldUploadWidget } from "next-cloudinary";

const formSchema = z.object({
  name: z.string().min(2, { message: "Invalid full name" }).max(50),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Invalid phone number" }),
  country: z.string().min(4, { message: "Please enter a real country" }),
  city: z.string().min(4, { message: "Please enter a real city" }),
  address: z.string().min(4, { message: "Please enter a real address" }),
});

type propType = {
  userData: SelectUser;
};

export default function ProfileForm({ userData }: propType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name || "",
      email: userData.email,
      phoneNumber: userData.phoneNumber || "",
      country: userData.country || "",
      city: userData.city || "",
      address: userData.address || "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser(userData.id, values).then(() => toast("Profile Updated"));
  }
  return (
    <div className="w-full p-4 shadow-lg rounded-2xl dark:border dark:border-secondary">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className=" flex gap-4 flex-col sm:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label>Full Name</Label>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label>Email</Label>
                  <FormControl>
                    <Input
                      disabled={true}
                      placeholder="Enter Your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
          </div>
          <div className=" flex gap-4 flex-col sm:flex-row">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label>Country</Label>
                  <FormControl>
                    <Input placeholder="Enter Your Country" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <Label>Phone Number</Label>
                  <FormControl>
                    <Input placeholder="Enter Phone Number" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
          </div>
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
            disabled={!form.formState.isDirty}
            className="w-full"
            type="submit"
          >
            Update
          </Button>
          <CldUploadWidget
            options={{
              sources: ["local", "url"],
              multiple: false,
              maxFiles: 1,
              
            }}
            uploadPreset="nns0f9bh"
          >
            {({ open }) => {
              return (
                <Button
                  onClick={() => open()}
                  type="submit"
                  variant={"secondary"}
                >
                  Upload Image
                </Button>
              );
            }}
          </CldUploadWidget>
        </form>
      </Form>
    </div>
  );
}
