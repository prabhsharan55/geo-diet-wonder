
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navigate, useSearchParams } from "react-router-dom";
import { AlertTriangle, Mail } from "lucide-react";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<'admin' | 'partner' | 'customer'>("customer");
  const [error, setError] = useState<string>("");
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const { signIn, signUp, resendConfirmation, user, loading } = useAuth();
  const [searchParams] = useSearchParams();

  // Check if this is an admin login request
  const isAdminLogin = searchParams.get('admin') === 'true';

  useEffect(() => {
    if (isAdminLogin) {
      setRole("admin");
      setActiveTab("signin"); // Default to signin for admin
    }
  }, [isAdminLogin]);

  // Clear error when switching tabs or changing inputs
  useEffect(() => {
    setError("");
    setShowResendConfirmation(false);
  }, [activeTab, email, password]);

  // If user is already logged in, redirect to appropriate dashboard
  if (user) {
    return <Navigate to="/customer" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowResendConfirmation(false);
    
    try {
      await signIn(email, password);
    } catch (err: any) {
      console.error('Sign in error:', err);
      const errorMessage = err.message || "Failed to sign in. Please check your credentials and try again.";
      setError(errorMessage);
      
      // Show resend confirmation option if it's an email confirmation error
      if (errorMessage.toLowerCase().includes('confirm') && errorMessage.toLowerCase().includes('email')) {
        setShowResendConfirmation(true);
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await signUp(email, password, fullName, role);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || "Failed to create account. Please try again.");
    }
  };

  const handleResendConfirmation = async () => {
    try {
      await resendConfirmation(email);
      setShowResendConfirmation(false);
    } catch (err: any) {
      console.error('Resend confirmation error:', err);
      setError(err.message || "Failed to resend confirmation email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-black">Geo</span>
          <span className="text-[#1B5E20]">Di</span>
          <span className="text-black">et</span>
        </h1>
        <p className="text-gray-600">
          {isAdminLogin ? "Admin Portal Access" : "Your personalized metabolism health platform"}
        </p>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            {isAdminLogin ? "Admin Login" : "Welcome"}
          </CardTitle>
          <CardDescription className="text-center">
            {isAdminLogin 
              ? "Sign in to access the admin panel" 
              : "Sign in to your account or create a new one"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showResendConfirmation && (
            <Alert className="mb-4 border-blue-200 bg-blue-50">
              <Mail className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <div className="space-y-2">
                  <p>Need to confirm your email?</p>
                  <Button 
                    onClick={handleResendConfirmation}
                    variant="outline" 
                    size="sm"
                    className="text-blue-600 border-blue-300 hover:bg-blue-100"
                  >
                    Resend Confirmation Email
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {!isAdminLogin && (
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            )}

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#160041] to-[#8D97DE]" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-sm text-center text-gray-500 mt-4">
                  <a href="#" className="hover:underline">Forgot your password?</a>
                </div>
              </form>
            </TabsContent>

            {!isAdminLogin && (
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Select value={role} onValueChange={(value: 'partner' | 'customer') => setRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="partner">Partner (Clinic)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#160041] to-[#8D97DE]" 
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
