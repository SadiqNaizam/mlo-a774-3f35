import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LogIn, ShieldAlert } from 'lucide-react';

import MinimalAuthHeader from '@/components/layout/MinimalAuthHeader';
import AuthFormCard from '@/components/AuthFormCard';
import MinimalAuthFooter from '@/components/layout/MinimalAuthFooter';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }).min(1, { message: "Email is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional().default(false),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted:", data);
    setLoginError(null); // Clear previous errors

    // Mock API call
    if (data.email === "user@example.com" && data.password === "password123") {
      console.log("Login successful, navigating to dashboard (mock)...");
      // In a real app, you'd navigate to the main application area, e.g., '/dashboard'
      // For this auth system, no dashboard route is defined in App.tsx, so we'll just log
      // navigate("/dashboard"); // Example, if a dashboard route existed
      alert("Login successful! (Mock behavior - no redirect configured in this example's App.tsx)");
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <MinimalAuthHeader />
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Welcome Back!"
          description="Please enter your credentials to access your account."
          icon={<LogIn className="h-10 w-10 text-primary" />}
          actions={
            <Button type="submit" form="login-form" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          }
          footerLinks={
            <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2 sm:gap-4">
              <Link
                to="/registration" // Path from App.tsx
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Don't have an account? Sign Up
              </Link>
              <Link
                to="/forgot-password" // Path from App.tsx
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          }
        >
          <Form {...form}>
            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {loginError && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <MinimalAuthFooter />
    </div>
  );
};

export default LoginPage;