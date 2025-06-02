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

  const [applicationStatus, setApplicationStatus] = useState<"pending" | "approved" | null>(null);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchStatus = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("partner_applications")
        .select("status, submitted_at")
        .eq("email", user.email)
        .single();

      if (error) {
        toast.error("Could not fetch your application status.");
        setApplicationStatus(null);
      } else {
        setApplicationStatus(data?.status ?? null);
        setSubmittedAt(data?.submitted_at ?? null);
      }

      setLoading(false);
    };

    fetchStatus();
  }, [user?.email]);

  useEffect(() => {
    if (applicationStatus === "approved") {
      navigate("/partner/dashboard");
    }
  }, [applicationStatus, navigate]);

  const getStatusIcon = () => {
    if (applicationStatus === "approved") return <CheckCircle className="h-12 w-12 text-green-500" />;
    if (applicationStatus === "pending") return <Clock className="h-12 w-12 text-yellow-500" />;
    return <AlertCircle className="h-12 w-12 text-red-500" />;
  };

  const getStatusMessage = () => {
    if (applicationStatus === "approved") {
      return {
        title: "Application Approved!",
        message: "Your partner application has been approved.",
        action: "Go to Dashboard",
      };
    }
    if (applicationStatus === "pending") {
      return {
        title: "Application Under Review",
        message: "Your application is currently being reviewed.",
        action: null,
      };
    }
    return {
      title: "Status Unknown",
      message: "There’s an issue with your application. Please contact support.",
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

  const status = getStatusMessage();

  return (
    <div className="max-w-md mx-auto mt-16">
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{getStatusIcon()}</div>
          <CardTitle className="text-xl">{status.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">{status.message}</p>
          {submittedAt && (
            <p className="text-sm text-gray-500">
              Submitted on: {new Date(submittedAt).toLocaleDateString()}
            </p>
          )}
          {userDetails && (
            <div className="bg-gray-100 p-4 rounded text-left">
              <p><strong>Name:</strong> {userDetails.full_name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Status:</strong> {applicationStatus}</p>
              <p><strong>Submitted:</strong> {new Date(userDetails.created_at).toLocaleDateString()}</p>
            </div>
          )}
          <div className="space-y-2">
            {status.action && (
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
