
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type EmailConfirmationProps = {
  email: string;
  onBackToSignIn: () => void;
};

const EmailConfirmation = ({ email, onBackToSignIn }: EmailConfirmationProps) => {
  const [isResending, setIsResending] = useState(false);
  const { resendConfirmation } = useAuth();

  const handleResendConfirmation = async () => {
    setIsResending(true);
    try {
      await resendConfirmation(email);
    } catch (error) {
      console.error('Error resending confirmation:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Clock className="h-16 w-16 text-blue-500" />
          </div>
          <CardTitle className="text-xl">Email Confirmation Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Mail className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="space-y-2">
                <p className="font-medium">Please check your email</p>
                <p className="text-sm">
                  We've sent a confirmation link to <strong>{email}</strong>
                </p>
                <p className="text-sm">
                  Click the link in the email to activate your account, then return here to sign in.
                </p>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h3 className="font-medium text-center">Next Steps:</h3>
            <div className="text-left space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                <span>Check your email inbox (and spam folder)</span>
              </div>
              <div className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                <span>Click the "Confirm your email" link</span>
              </div>
              <div className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                <span>Return here and sign in</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleResendConfirmation}
              variant="outline"
              className="w-full"
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend Confirmation Email"}
            </Button>
            
            <Button 
              onClick={onBackToSignIn}
              className="w-full"
            >
              Back to Sign In
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center pt-4">
            <p>Didn't receive the email? Check your spam folder or try resending.</p>
            <p className="mt-1">Need help? Contact our support team.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmation;
