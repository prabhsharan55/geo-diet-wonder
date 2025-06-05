
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navigate, useSearchParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import EmailConfirmation from "@/components/EmailConfirmation";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<'admin' | 'partner' | 'customer'>("customer");
  const [error, setError] = useState<string>("");
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, user, loading } = useAuth();
  const [searchParams] = useSearchParams();

  // Check if this is an admin login request
  const isAdminLogin = searchParams.get('admin') === 'true';

  useEffect(() => {
    if (isAdminLogin) {
      setRole("admin");
      setActiveTab("signin");
    }
  }, [isAdminLogin]);

  // Clear error when switching tabs or changing inputs
  useEffect(() => {
    setError("");
    setShowEmailConfirmation(false);
  }, [activeTab, email, password]);

  // If user is already logged in, redirect to appropriate dashboard
  if (user && !loading) {
    return <Navigate to="/customer" replace />;
  }

  // Show loading while auth state is being determined
  if (loading && !isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-black">Geo</span>
            <span className="text-[#1B5E20]">Di</span>
            <span className="text-black">et</span>
          </h1>
          <p className="text-gray-600">Loading...</p>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show email confirmation page if needed
  if (showEmailConfirmation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-black">Geo</span>
            <span className="text-[#1B5E20]">Di</span>
            <span className="text-black">et</span>
          </h1>
          <p className="text-gray-600">Your personalized metabolism health platform</p>
        </div>
        <EmailConfirmation 
          email={email} 
          onBackToSignIn={() => setShowEmailConfirmation(false)}
        />
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      await signIn(email, password);
      // Don't set isSubmitting to false here - let the redirect handle the state
    } catch (err: any) {
      console.error('Sign in error:', err);
      setIsSubmitting(false);
      
      if (err.message === 'UNCONFIRMED_EMAIL') {
        setShowEmailConfirmation(true);
        return;
      }
      
      const errorMessage = err.message || "Failed to sign in. Please check your credentials and try again.";
      setError(errorMessage);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      await signUp(email, password, fullName, role);
      setShowEmailConfirmation(true);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#160041] to-[#8D97DE]" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
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
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Select value={role} onValueChange={(value: 'partner' | 'customer') => setRole(value)} disabled={isSubmitting}>
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
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
