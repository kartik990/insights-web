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
import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "please a valid email",
  }),
  password: z.string().min(6, {
    message: "please provide a password with at least 6 characters",
  }),
});

const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { addUser } = useContext(UserContext);

  const router = useRouter();

  const { formState, clearErrors } = form;
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      addUser({
        userId: data.data.userId,
        email: data?.data?.email,
        name: data?.data?.name,
        profile: data.data.profile,
      });
      router.push("/");
    },
    onError: (error: any) => {
      alert(`Signup failed: ${error.message}`);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      email: values.email || "bruce@mail.com",
      password: values.password || "passway",
    });
  }

  async function dummyLogin() {
    mutate({
      email: "bruce@mail.com",
      password: "passway",
    });
  }

  async function dummyLogin2() {
    mutate({
      email: "clark@mail.com",
      password: "passway",
    });
  }

  return (
    <div className="w-full h-full flex flex-col sm:flex-row justify-center items-center sm:gap-8">
      <Card className="w-[90%] sm:w-auto p-6 mt-10 sm:my-10 bg-secondary">
        <CardTitle className="text-3xl font-bold text-foreground mb-4">
          Sign In
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:w-80 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
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

            <Button type="submit" className="w-full mt-2 ">
              {formState.isSubmitting || isPending ? (
                <span className="loading loading-dots loading-xs" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-primary mt-4 flex gap-2">
          {"Don't have a account?"}
          <Link
            href="/auth/sign-up"
            className="hover:scale-105 hover:underline cursor-pointer flex items-center gap-2"
          >
            Sign up
            <ExternalLink size={20} />
          </Link>
        </div>
      </Card>
      <Card className="p-6 my-10 bg-secondary w-[90%] sm:w-[380px]">
        <CardTitle className="text-3xl font-bold text-foreground mb-4">
          Demo Login
        </CardTitle>
        <div className="text-slate-500 mb-2 text-sm sm:text-md">
          You can try any of these dummy account for application demo.
        </div>
        <Button onClick={dummyLogin} className="w-full mt-2 ">
          {formState.isSubmitting || isPending ? (
            <span className="loading loading-dots loading-xs" />
          ) : (
            "Sign in as Batman"
          )}
        </Button>
        <Button onClick={dummyLogin2} className="w-full mt-2 ">
          {formState.isSubmitting || isPending ? (
            <span className="loading loading-dots loading-xs" />
          ) : (
            "Sign in as Superman"
          )}
        </Button>
      </Card>
    </div>
  );
};

export default SignIn;
