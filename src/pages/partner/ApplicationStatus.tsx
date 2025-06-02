// src/pages/partner/ApplicationStatus.tsx

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ApplicationStatus = () => {
  const { userDetails, signOut, user } = useAuth();
  const navigate = useNavigate();

  // Track the raw status string returned by Supabase (e.g. "pending" or "approved")
  const [rawStatus, setRawStatus] = useState<string | null>(null);

  // We’ll normalize rawStatus to one of: "pending" | "approved" | null
  const [validatedStatus, setValidatedStatus] = useState<"pending" | "approved" | null>(null);

  // True while we’re fetching from Supabase
  const [loading, setLoading] = useState(true);

  // If Supabase returns an error, capture its message here
  const [dbError, setDbError] = useState<string | null>(null);

  // Entire Supabase response (data + error), for debugging if needed
  const [fullResponse, setFullResponse] = useState<any>(null);

  useEffect(() => {
    // Don’t run until we know the user’s email exists
    if (!user?.email) {
      setLoading(false);
      return;
    }

    // Add a short delay so that right after signup we give Supabase a moment to commit the row
    const timer = setTimeout(async () => {
      setLoading(true);
      setDbError(null);

      // Normalize the email to lowercase (Trim whitespace, just in case)
      const normalizedEmail = user.email.trim().toLowerCase();

      // Query using ILIKE, which is case‐insensitive (e.g. 'cohif70519@baxima.com' matches 'COHIF70519@BAXIMA.COM')
      const { data, error } = await supabase
        .from("partner_applications")
        .select("status")
        .ilike("email", normalizedEmail)    // <-- case‐insensitive match
        .maybeSingle();

      console.log("Supabase partner_applications response:", { data, error });
      setFullResponse({ data, error });

      if (error) {
        // Something went wrong at the DB level
        setDbError(error.message);
        setRawStatus(null);
      } else if (!data) {
        // No row found for that email
        setRawStatus(null);
      } else {
        // We got exactly one row; read its status string
        setRawStatus(data.status);
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user?.email]);

  // Convert rawStatus → exactly "pending" | "approved" or null
  useEffect(() => {
    if (!rawStatus) {
      setValidatedStatus(null);
      return;
    }
    const trimmed = rawStatus.trim().toLowerCase();
    if (trimmed === "pending") {
      setValidatedStatus("pending");
    } else if (trimmed === "approved") {
      setValidatedStatus("approved");
    } else {
      setValidatedStatus(null);
    }
  }, [rawStatus]);

  // Whenever we see validatedStatus === "approved", redirect immediately into the dashboard
  useEffect(() => {
    if (validatedStatus === "approved") {
      navigate("/partner/dashboard");
    }
  }, [validatedStatus, navigate]);

  // Choose the correct icon based on validatedStatus
  const getStatusIcon = () => {
    if (validatedStatus === "approved") {
      return <CheckCircle className="h-12 w-12 text-green-500" />;
    }
    if (validatedStatus === "pending") {
      return <Clock className="h-12 w-12 text-yellow-500" />;
    }
    return <AlertCircle className="h-12 w-12 text-red-500" />;
  };

  // Return the title/message based on validatedStatus
  const getStatusMessage = () => {
    if (validatedStatus === "approved") {
      return {
        title: "Application Approved!",
        message: "Your partner application has been approved. Redirecting you now…",
        action: "Go to Dashboard",
      };
    }
    if (validatedStatus === "pending") {
      return {
        title: "Application Under Review",
        message: "Your partner application is currently pending review.",
        action: null,
      };
    }
    return {
      title: "Status Unknown",
      message: "We couldn’t find a pending application for your email. Please contact support or try again.",
      action: null,
    };
  };

  // Show a spinner while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If Supabase returned an error, show it here
  if (dbError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Database Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">Could not fetch your application status:</p>
            <pre className="bg-gray-100 p-2 text-xs rounded">{dbError}</pre>
            <Button className="w-full" onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button variant="outline" className="w-full" onClick={signOut}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Otherwise, render the status card (or “Status Unknown”)
  const status = getStatusMessage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4 space-y-6">
      <Card className="w-full max-w-md mt-16">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{getStatusIcon()}</div>
          <CardTitle className="text-2xl">{status.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600">{status.message}</p>

          {userDetails && (
            <div className="bg-gray-100 p-4 rounded-lg text-left">
              <h4 className="font-medium mb-2">Application Details</h4>
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {userDetails.full_name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Raw DB Status:</strong> {rawStatus ?? "none found"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Normalized Status:</strong> {validatedStatus ?? "null"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Account Created:</strong>{" "}
                {new Date(userDetails.created_at).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {status.action && validatedStatus === "approved" && (
              <Button className="w-full" onClick={() => navigate("/partner/dashboard")}>
                {status.action}
              </Button>
            )}
            <Button variant="outline" className="w-full" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* DEBUG: Show entire Supabase response for troubleshooting */}
      <div className="w-full max-w-md bg-white border border-gray-200 p-4 rounded">
        <h4 className="font-medium mb-2">Debug Info (Supabase Response)</h4>
        <pre className="bg-gray-100 p-2 text-xs rounded">{JSON.stringify(fullResponse, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ApplicationStatus;
