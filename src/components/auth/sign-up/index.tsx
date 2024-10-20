"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "please provide a name",
    }),
    email: z.string().email({
      message: "please a valid email",
    }),
    password: z.string().min(6, {
      message: "please provide a password with at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "please provide a password with at least 6 characters",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Confirm password should match with password",
  });

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const { addUser } = useContext(UserContext);

  const { error, isPending, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      alert("Signup successful!");
      // @ts-ignore
      addUser({ email: data?.data?.email, name: data?.data?.name });
      router.push("/");
    },
    onError: (error) => {
      alert(`Signup failed: ${error.message}`);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      email: values.email,
      name: values.name,
      password: values.password,
    });
    console.log(error);
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="p-6 my-10 bg-secondary">
        <CardTitle className="text-3xl font-bold text-foreground mb-4">
          Sign Up
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-80"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your name"
                      className="bg-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@mail.com"
                      className="bg-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-2 ">
              {form.formState.isSubmitting || isPending ? (
                <span className="loading loading-dots loading-xs" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-primary mt-4 flex gap-2">
          {"Already have a account?"}
          <Link
            href="/auth/sign-in"
            className="hover:scale-105 hover:underline cursor-pointer flex items-center gap-2"
          >
            Sign in
            <ExternalLink size={20} />
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
