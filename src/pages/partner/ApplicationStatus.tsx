import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const ApplicationStatus = () => {
  const { userDetails, signOut, user } = useAuth();
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;
    fetchApplication();
  }, [user?.email]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await supabase
        .from('partner_applications')
        .select('status')
        .eq('email', user.email)
        .maybeSingle();

      console.log("APPLICATION FETCHED:", result);

      if (result.error) {
        console.error('Error fetching application:', result.error);
        setError("Error fetching your application. Please contact support.");
        return;
      }

      // If no application record exists, but user is a partner, treat as approved
      if (!result.data) {
        console.log("No application record found, but user is a partner - treating as approved");
        setApplicationStatus('approved');
        return;
      }

      const status = result.data.status;

      if (!status) {
        setError("Your application is missing a status. Please wait or contact us.");
        return;
      }

      setApplicationStatus(status);
    } catch (err) {
      console.error('Error fetching application:', err);
      setError("Error fetching your application. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (applicationStatus === 'approved') {
      return <CheckCircle className="h-12 w-12 text-green-500" />;
    } else if (applicationStatus === 'pending') {
      return <Clock className="h-12 w-12 text-yellow-500" />;
    } else {
      return <AlertCircle className="h-12 w-12 text-red-500" />;
    }
  };

  const getStatusMessage = () => {
    if (applicationStatus === 'approved') {
      return {
        title: "Application Approved!",
        message: "Your partner application has been approved. You can now access the partner dashboard.",
        action: "Go to Dashboard"
      };
    } else if (applicationStatus === 'pending') {
      return {
        title: "Application Under Review",
        message: "Your partner application is currently being reviewed by our admin team. We'll notify you once it's processed.",
        action: null
      };
    } else {
      return {
        title: "Application Status Unknown",
        message: "There seems to be an issue with your application status. Please contact support.",
        action: null
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your application status...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Application Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">{error}</p>
            
            <div className="space-y-3">
              <Button 
                className="w-full"
                onClick={fetchApplication}
              >
                Try Again
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={signOut}
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = getStatusMessage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className="text-2xl">{status.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600">{status.message}</p>
          
          {userDetails && (
            <div className="bg-gray-100 p-4 rounded-lg text-left">
              <h4 className="font-medium mb-2">Application Details:</h4>
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {userDetails.full_name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {applicationStatus || 'Loading...'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Submitted:</strong> {new Date(userDetails.created_at).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {status.action && applicationStatus === 'approved' && (
              <Button 
                className="w-full"
                onClick={() => window.location.href = '/partner'}
              >
                {status.action}
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationStatus;
