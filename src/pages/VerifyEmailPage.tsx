import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MinimalAuthHeader from '@/components/layout/MinimalAuthHeader';
import MinimalAuthFooter from '@/components/layout/MinimalAuthFooter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label'; // As per layout_info
import { MailCheck, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const VerifyEmailPage: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState<string>('Please wait while we verify your email address.');

  useEffect(() => {
    console.log('VerifyEmailPage loaded');
    // Simulate an API call or token check from URL
    // For demonstration, we'll simulate a delay then success.
    // In a real app, you would check a token from the URL (e.g., using useSearchParams).
    const timer = setTimeout(() => {
      // Simulate success
      setVerificationStatus('success');
      setMessage('Your email address has been successfully verified!');

      // To simulate an error:
      // setVerificationStatus('error');
      // setMessage('Failed to verify email. The link may be invalid or has expired.');
    }, 2000); // Simulate a 2-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MinimalAuthHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            {verificationStatus === 'verifying' && (
              <>
                <Loader2 className="h-12 w-12 mx-auto text-blue-600 animate-spin" />
                <Label htmlFor="statusMessage" className="block text-lg font-medium text-gray-700">Verifying...</Label>
                <p id="statusMessage" className="text-sm text-muted-foreground">{message}</p>
              </>
            )}

            {verificationStatus === 'success' && (
              <>
                <MailCheck className="h-16 w-16 mx-auto text-green-600" />
                <Label htmlFor="statusMessage" className="block text-xl font-semibold text-green-700">Email Verified!</Label>
                <Alert variant="default" className="text-left border-green-500 bg-green-50">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-700">Success</AlertTitle>
                  <AlertDescription className="text-green-700">
                    {message} You can now proceed to log in to your account.
                  </AlertDescription>
                </Alert>
              </>
            )}

            {verificationStatus === 'error' && (
              <>
                <AlertTriangle className="h-16 w-16 mx-auto text-red-600" />
                <Label htmlFor="statusMessage" className="block text-xl font-semibold text-red-700">Verification Failed</Label>
                <Alert variant="destructive" className="text-left">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {message} Please try again or contact support if the issue persists.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch">
            {verificationStatus === 'success' && (
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/">Proceed to Login</Link>
              </Button>
            )}
            {verificationStatus === 'error' && (
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Back to Login</Link>
              </Button>
              // Optionally, add a "Resend verification email" button here
            )}
          </CardFooter>
        </Card>
      </main>
      <MinimalAuthFooter />
    </div>
  );
};

export default VerifyEmailPage;