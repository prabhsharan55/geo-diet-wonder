
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SignupSuccessProps = {
  email: string;
};

const SignupSuccess = ({ email }: SignupSuccessProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Registration Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Mail className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium text-blue-900">Check Your Email</span>
            </div>
            <p className="text-sm text-blue-800">
              We've sent a confirmation email to <strong>{email}</strong>
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Next Steps:</h3>
            <div className="text-left space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                <span>Check your email inbox (and spam folder)</span>
              </div>
              <div className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                <span>Click the confirmation link in the email</span>
              </div>
              <div className="flex items-start">
                <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                <span>Return here and sign in to access your dashboard</span>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full"
            >
              Go to Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>

          <div className="text-xs text-gray-500 pt-4">
            Didn't receive the email? Check your spam folder or contact support.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupSuccess;
