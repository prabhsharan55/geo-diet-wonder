// src/pages/partner/ApplicationStatus.tsx

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ApplicationStatus = () => {
  const { userDetails, signOut, user } = useAuth();
  const navigate = useNavigate();

  // Holds the raw status string from the database (or null)
  const [rawStatus, setRawStatus] = useState<string | null>(null);

  // Only "pending" | "approved" | "not_found" | null, after we normalize rawStatus
  const [validatedStatus, setValidatedStatus] = useState<"pending" | "approved" | "not_found" | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    // Wait 1500ms before querying to ensure any recent submissions are processed
    const timer = setTimeout(() => {
      const fetchStatus = async () => {
        setLoading(true);
        setError(null);

        const userEmail = user.email.trim().toLowerCase();
        console.log("Fetching application status for (normalized):", userEmail);
        console.log("Original user email:", user.email);

        // Use ILIKE for case-insensitive matching in PostgreSQL
        const { data, error: supabaseError } = await supabase
          .from("partner_applications")
          .select("status, email")
          .ilike("email", userEmail)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        console.log("Supabase query result:", { data, error: supabaseError });
        console.log("Query details:", {
          searchEmail: userEmail,
          foundEmail: data?.email,
          foundStatus: data?.status,
          emailsMatch: data?.email?.toLowerCase() === userEmail
        });

        if (supabaseError) {
          console.error("Error fetching application status:", supabaseError);
          toast.error("Could not fetch your application status.");
          setRawStatus(null);
          setError("Unable to fetch your application status.");
        } else if (!data) {
          // No row found - this means no application submitted yet
          console.log("No application row found for:", userEmail);
          setRawStatus("not_found");
        } else {
          setRawStatus(data.status);
        }

        setLoading(false);
      };

      fetchStatus();
    }, 1500);

    return () => clearTimeout(timer);
  }, [user?.email]);

  // Normalize rawStatus → exactly "pending" | "approved" | "not_found" or null
  useEffect(() => {
    if (rawStatus === null) {
      setValidatedStatus(null);
      return;
    }
    
    if (rawStatus === "not_found") {
      setValidatedStatus("not_found");
      return;
    }
    
    const trimmed = rawStatus.trim().toLowerCase();
    console.log("Normalizing status:", { rawStatus, trimmed });
    
    if (trimmed === "pending") {
      setValidatedStatus("pending");
    } else if (trimmed === "approved") {
      setValidatedStatus("approved");
    } else {
      console.warn(`Unrecognized status: "${rawStatus}", marking as not_found`);
      setValidatedStatus("not_found");
    }
  }, [rawStatus]);

  // If approved, redirect immediately
  useEffect(() => {
    if (validatedStatus === "approved") {
      console.log("Status is approved, redirecting to partner dashboard");
      navigate("/partner");
    }
  }, [validatedStatus, navigate]);

  const handleSubmitApplication = () => {
    navigate("/partner-signup");
  };

  const getStatusIcon = () => {
    if (validatedStatus === "approved") return <CheckCircle className="h-12 w-12 text-green-500" />;
    if (validatedStatus === "pending") return <Clock className="h-12 w-12 text-yellow-500" />;
    if (validatedStatus === "not_found") return <FileText className="h-12 w-12 text-blue-500" />;
    return <AlertCircle className="h-12 w-12 text-red-500" />;
  };

  const getStatusMessage = () => {
    if (validatedStatus === "approved") {
      return {
        title: "Application Approved!",
        message: "Your partner application has been approved. Redirecting to dashboard…",
        action: "Go to Dashboard",
      };
    }
    if (validatedStatus === "pending") {
      return {
        title: "Application Under Review",
        message: "Your application is currently being reviewed by our team. You will be notified once a decision is made.",
        action: null,
      };
    }
    if (validatedStatus === "not_found") {
      return {
        title: "No Application Found",
        message: "You haven't submitted a partner application yet. Please submit an application to get started.",
        action: "Submit Application",
      };
    }
    return {
      title: "Status Unknown",
      message: "There's an issue with your application status. Please contact support.",
      action: null,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Application Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">{error}</p>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => window.location.reload()}>
                Try Again
              </Button>
              <Button variant="outline" className="w-full" onClick={signOut}>
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
          <div className="flex justify-center mb-4">{getStatusIcon()}</div>
          <CardTitle className="text-2xl">{status.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600">{status.message}</p>

          {userDetails && (
            <div className="bg-gray-100 p-4 rounded-lg text-left">
              <h4 className="font-medium mb-2">Account Details:</h4>
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {userDetails.full_name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Application Status:</strong> {validatedStatus === "not_found" ? "Not Submitted" : validatedStatus ?? "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Account Created:</strong>{" "}
                {new Date(userDetails.created_at).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {status.action && validatedStatus === "approved" && (
              <Button className="w-full" onClick={() => navigate("/partner")}>
                {status.action}
              </Button>
            )}
            {status.action && validatedStatus === "not_found" && (
              <Button className="w-full" onClick={handleSubmitApplication}>
                {status.action}
              </Button>
            )}
            <Button variant="outline" className="w-full" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationStatus;
