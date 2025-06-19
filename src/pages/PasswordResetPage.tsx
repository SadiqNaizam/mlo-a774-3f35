import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { KeyRound } from 'lucide-react';

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const passwordResetSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match. Please ensure both passwords are identical.",
  path: ["confirmPassword"], // Point error to confirmPassword field
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const PasswordResetPage: React.FC = () => {
  console.log('PasswordResetPage loaded');
  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: PasswordResetFormValues) => {
    setSubmissionStatus(null); // Clear previous status
    console.log("Password reset form submitted:", values);
    // Simulate API call
    try {
      // Pretend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Assume token validation from URL query param would happen here in a real app
      // e.g. const urlParams = new URLSearchParams(window.location.search);
      // const token = urlParams.get('token'); if (!token) throw new Error("Reset token missing");

      setSubmissionStatus({ type: 'success', message: 'Your password has been successfully reset. You can now login with your new password.' });
      form.reset();
      // Optionally navigate to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error("Password reset failed:", error);
      setSubmissionStatus({ type: 'error', message: (error instanceof Error) ? error.message : 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <MinimalAuthHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormCard
          title="Set New Password"
          description="Create a new, strong password for your account."
          icon={<KeyRound className="h-10 w-10 text-blue-600" />}
          actions={
            <Button 
              type="submit" 
              form="password-reset-form" 
              className="w-full" 
              disabled={form.formState.isSubmitting || submissionStatus?.type === 'success'}
            >
              {form.formState.isSubmitting ? "Resetting Password..." : "Set New Password"}
            </Button>
          }
          footerLinks={
            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
              Back to Login
            </Link>
          }
          className="w-full max-w-md"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="password-reset-form" className="space-y-6">
              {submissionStatus && (
                <Alert variant={submissionStatus.type === 'error' ? 'destructive' : 'default'} className={submissionStatus.type === 'success' ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300' : ''}>
                  <AlertTitle>{submissionStatus.type === 'success' ? 'Success!' : 'Error'}</AlertTitle>
                  <AlertDescription>{submissionStatus.message}</AlertDescription>
                </Alert>
              )}
              {!submissionStatus || submissionStatus.type === 'error' ? (
                <>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="newPassword">New Password</FormLabel>
                        <FormControl>
                          <Input id="newPassword" type="password" placeholder="Enter your new password" {...field} />
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
                        <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                        <FormControl>
                          <Input id="confirmPassword" type="password" placeholder="Confirm your new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : null}
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <MinimalAuthFooter />
    </div>
  );
};

export default PasswordResetPage;