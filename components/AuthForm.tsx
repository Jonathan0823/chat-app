"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",}),
    email: z.string().email(),
    password: z.string().min(6),
});

import React from "react";

interface AuthFormProps {
    type: "signin" | "signup";
}

const AuthForm = ({ type }: AuthFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-lg p-8 border border-red-500 rounded-lg shadow-lg">
                    {type === "signup" && (
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your email" type="email" {...field} className="border-red-500 bg-black" />
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
                                <Input placeholder="Insert your password" type="password" {...field} className="border-red-500 bg-black" />
                                </FormControl> 
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded">Submit</button>
                </form>
            </Form>
        </div>
    );
};

export default AuthForm;
