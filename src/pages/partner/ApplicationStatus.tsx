
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

  // Separate raw status from database and validated status for UI
  const [rawStatus, setRawStatus] = useState<string | null>(null);
  const [validatedStatus, setValidatedStatus] = useState<"pending" | "approved" | "unknown">("unknown");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchStatus = async () => {
      setLoading(true);
      setError(null);

      console.log("Fetching application status for:", user.email);

      // Get exactly 1 row (the newest) so .maybeSingle() won't error if duplicates exist
      const { data, error: supabaseError } = await supabase
        .from("partner_applications")
        .select("status")
        .eq("email", user.email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      console.log("Supabase fetchStatus response:", { data, supabaseError });

      if (supabaseError) {
        console.error("Error fetching application status:", supabaseError);
        toast.error("Could not fetch your application status.");
        setError("Unable to fetch your application status.");
        setRawStatus(null);
      } else if (!data) {
        // No matching row at all - for partners without application records, treat as approved
        console.log("No application row found for:", user.email);
        console.log("User role:", userDetails?.role);
        if (userDetails?.role === "partner") {
          console.log("Partner without application record - treating as approved");
          setRawStatus("approved");
        } else {
          setRawStatus(null);
        }
      } else {
        // We got exactly one row
        console.log("Found application with status:", data.status);
        setRawStatus(data.status);
      }

      setLoading(false);
    };

    fetchStatus();
  }, [user?.email, userDetails?.role]);

  // Validate and normalize the raw status whenever it changes
  useEffect(() => {
    if (rawStatus === null) {
      setValidatedStatus("unknown");
      return;
    }

    // Trim whitespace, convert to lowercase for comparison
    const trimmed = rawStatus.trim().toLowerCase();
    console.log("Validating status:", rawStatus, "->", trimmed);
    
    if (trimmed === "pending") {
      setValidatedStatus("pending");
    } else if (trimmed === "approved") {
      setValidatedStatus("approved");
    } else {
      console.warn(`Unrecognized status value from DB: "${rawStatus}" → marking as unknown.`);
      setValidatedStatus("unknown");
    }
  }, [rawStatus]);

  // Auto-redirect as soon as status becomes "approved"
  useEffect(() => {
    if (validatedStatus === "approved") {
      console.log("Status is approved, redirecting to dashboard");
      navigate("/partner/dashboard");
    }
  }, [validatedStatus, navigate]);

  const getStatusIcon = () => {
    if (validatedStatus === "approved") return <CheckCircle className="h-12 w-12 text-green-500" />;
    if (validatedStatus === "pending") return <Clock className="h-12 w-12 text-yellow-500" />;
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
        message: "Your application is currently being reviewed. We'll notify you once it's processed.",
        action: null,
      };
    }
    // validatedStatus === "unknown"
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
              <h4 className="font-medium mb-2">Application Details:</h4>
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {userDetails.full_name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {validatedStatus}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Raw Status:</strong> {rawStatus || "N/A"}
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
    </div>
  );
};

export default ApplicationStatus;
