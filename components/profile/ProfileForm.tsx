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

const formSchema = z.object({
  name: z.string().min(2,{message:"Invalid full name"}).max(50),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Invalid phone number" }),
  country: z.string().min(4, { message: "Please enter a real country" }),
  city: z.string().min(4, { message: "Please enter a real city" }),
  address: z.string().min(4, { message: "Please enter a real address" }),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "abebe",
      email: "mola@koralew.et",
      phoneNumber: "0987656789",
      country: "Ethiopia",
      city: "Addis Ababa",
      address: "Kolfe",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="w-full p-4 shadow-lg rounded-xl dark:border dark:border-secondary">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className=" flex gap-4 flex-col sm:flex-row"><FormField
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
              <FormItem className="flex-grow" >
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
              </FormItem>
            )}
          /></div>
            <div className=" flex gap-4 flex-col sm:flex-row"><FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <Label>Country</Label>
                <FormControl>
                  <Input placeholder="Your Country" {...field} />
                </FormControl>
                <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex-grow" >
                <Label>Phone Number</Label>
                <FormControl>
                  <Input placeholder="Enter Phone Number" {...field} />
                </FormControl>
                <FormMessage className="text-sm text-white bg-red-400 w-fit px-2 rounded-md " />
              </FormItem>
            )}
          /></div>
          
          <Button className="" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
