import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import MinimalAuthHeader from '@/components/layout/MinimalAuthHeader';
import MinimalAuthFooter from '@/components/layout/MinimalAuthFooter';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { KeyRound, Mail, AlertCircle, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof formSchema>;

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    setMessage(null);
    console.log('Forgot password request for:', data.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Simulate based on email
    if (data.email === "user-not-found@example.com") {
      setMessage({
        text: "No account found with that email address. Please check your email or sign up.",
        type: 'error',
      });
    } else {
      setMessage({
        text: "If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).",
        type: 'success',
      });
      // Optionally, clear form on success
      // form.reset();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MinimalAuthHeader />
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormCard
          title="Forgot Your Password?"
          description="No worries! Enter your email address below and we'll send you a link to reset your password."
          icon={<KeyRound className="h-10 w-10 text-blue-600" />}
          actions={
            <Button type="submit" form="forgot-password-form" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          }
          footerLinks={
            <>
              Remember your password?{' '}
              <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Back to Login
              </Link>
            </>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="forgot-password-form" className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {message && (
                <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mt-4">
                  {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  <AlertTitle>{message.type === 'error' ? 'Request Failed' : 'Request Sent'}</AlertTitle>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <MinimalAuthFooter />
    </div>
  );
};

export default ForgotPasswordPage;