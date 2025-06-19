import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import MinimalAuthHeader from '@/components/layout/MinimalAuthHeader';
import AuthFormCard from '@/components/AuthFormCard';
import MinimalAuthFooter from '@/components/layout/MinimalAuthFooter';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UserPlus, AlertTriangle, CheckCircle } from 'lucide-react';

const registrationFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password confirmation is required." })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Point error to the confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmissionStatus(null);
    console.log("Registration form submitted:", data);
    // Simulate API call
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      // Example: if (data.email === "test@example.com") throw new Error("This email is already registered.");

      setSubmissionStatus({ type: 'success', message: "Registration successful! Please check your email to verify your account." });
      form.reset(); 
      // User journey suggests a message on the page. Navigation to verify email page or login might occur after user action or email click.
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during registration.";
      setSubmissionStatus({ type: 'error', message: errorMessage });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <MinimalAuthHeader />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormCard
          title="Create your Account"
          description="Fill in the details below to sign up and get started."
          icon={<UserPlus className="h-10 w-10 text-blue-600" />}
          actions={
            <Button type="submit" form="registration-form" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Registering..." : "Register"}
            </Button>
          }
          footerLinks={
            <>
              Already have an account?{' '}
              <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Log in
              </Link>
            </>
          }
          className="w-full max-w-md"
        >
          <Form {...form}>
            <form id="registration-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {submissionStatus && (
                <Alert 
                  variant={submissionStatus.type === 'error' ? 'destructive' : 'default'}
                  className={submissionStatus.type === 'success' ? 
                    'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300' 
                    : ''}
                >
                  {submissionStatus.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  <AlertTitle>{submissionStatus.type === 'success' ? 'Success!' : 'Registration Error'}</AlertTitle>
                  <AlertDescription>{submissionStatus.message}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
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
                    <FormDescription className="text-xs">
                      Must be at least 8 characters long.
                    </FormDescription>
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
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

export default RegistrationPage;