import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ApplicationStatus = () => {
  const { user } = useAuth();
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
        console.error("Error fetching application status:", error);
        toast.error("Could not fetch your application status.");
        setApplicationStatus(null);
      } else {
        setApplicationStatus(data.status as "pending" | "approved");
        setSubmittedAt(data.submitted_at);
        console.log("Fetched status:", data.status);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-6 space-y-4 text-center">
          <h2 className="text-xl font-bold">
            {applicationStatus === "pending" && "Application Submitted"}
            {applicationStatus === null && "Application Status Unknown"}
          </h2>

          {applicationStatus === "pending" && (
            <>
              <p className="text-gray-600">
                Your application is currently pending review. We will notify you once it's approved.
              </p>
              {submittedAt && (
                <p className="text-sm text-gray-500">
                  Submitted on: {new Date(submittedAt).toLocaleDateString()}
                </p>
              )}
              <Button variant="outline" onClick={() => window.location.reload()}>
                Refresh Status
              </Button>
            </>
          )}

          {applicationStatus === null && (
            <>
              <p className="text-red-600">We couldn't find your application or it’s incomplete.</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationStatus;
