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
      console.log(data);
      addUser({ email: data?.data?.email, name: data?.data?.name });
      router.push("/");
    },
    onError: (error: any) => {
      alert(`Signup failed: ${error.message}`);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="p-6 my-10 bg-secondary">
        <CardTitle className="text-3xl font-bold text-foreground mb-4">
          Sign In
        </CardTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-80"
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
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
