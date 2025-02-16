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
import { SelectUser } from "@/db/schema/users";

import { toast } from "sonner";

import { Ellipsis } from "lucide-react";
import { useSession } from "next-auth/react";
import { updateUser } from "@/actions/user";
import { RegionSelect } from "./RegionSelect";
import { CitySelect } from "./CitySelect";

const formSchema = z.object({
  name: z.string().min(2, { message: "Invalid full name" }).max(25),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Invalid phone number" }),
  region: z.string().min(4, { message: "Please select a region" }),
  city: z.string().min(4, { message: "Please select a city" }),
  address: z.string().min(4, { message: "Please enter a real address" }),
});

type propType = {
  userData: SelectUser | undefined;
};

export default function ProfileForm({ userData }: propType) {
  const { update } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email,
      phoneNumber: userData?.phoneNumber || "",
      region: userData?.region || "",
      city: userData?.city || "",
      address: userData?.address || "",
    },

  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateUser(values).then(() => update());
    toast.success("Profile Updated");
    form.reset(form.getValues());
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
                <FormItem className="w-full">
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
                <FormItem className="w-full">
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
              name="region"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label>Region</Label>
                  <FormControl>
                    {/* <Input placeholder="Enter Your Region" {...field} /> */}
                    <RegionSelect form={form} field={field} />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label>Phone Number</Label>
                  <FormControl>
                    <Input placeholder="Enter Your Phone Number" {...field} />
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
                <FormItem className="w-full">
                  <Label>City / SubCity</Label>
                  <FormControl >
                    <CitySelect field={field} form={form} />
                  </FormControl>
                  <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
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
