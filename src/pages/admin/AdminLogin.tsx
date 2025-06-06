
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const { signIn, user, loading } = useAuth();

  // If user is already logged in, redirect to appropriate dashboard
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await signIn(email, password);
    } catch (err: any) {
      console.error('Admin sign in error:', err);
      setError(err.message || "Invalid admin credentials. Please check your email and password.");
    }
  };

  // Clear error when inputs change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-black">Geo</span>
            <span className="text-[#1B5E20]">Di</span>
            <span className="text-black">et</span>
          </h1>
          <p className="text-gray-600">Admin Portal Access</p>
        </div>

        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Sign in to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Admin Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#160041] to-[#8D97DE]" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In as Admin"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md">
          <h3 className="font-medium text-blue-900 mb-2">Default Admin Credentials:</h3>
          <p className="text-sm text-blue-800">
            Email: admin@geodiet.com<br />
            Password: admin123
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
