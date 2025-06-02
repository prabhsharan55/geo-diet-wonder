
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Building2 } from "lucide-react";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const ApplicationStatus = () => {
  const { user } = useAuth();

  const { data: application, isLoading } = useQuery({
    queryKey: ['partner-application', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      
      const { data, error } = await supabase
        .from('partner_applications')
        .select('*')
        .eq('email', user.email)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.email,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-8 w-8 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Clock className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          title: 'Application Under Review',
          description: 'We are currently reviewing your partner application. This typically takes 2-3 business days.',
          action: 'You will receive an email notification once your application is reviewed.'
        };
      case 'approved':
        return {
          title: 'Application Approved!',
          description: 'Congratulations! Your partner application has been approved.',
          action: 'You can now access all partner features and start managing clients.'
        };
      case 'rejected':
        return {
          title: 'Application Not Approved',
          description: 'Unfortunately, your partner application was not approved at this time.',
          action: 'Please contact support for more information or to reapply.'
        };
      default:
        return {
          title: 'Application Status Unknown',
          description: 'We are unable to determine your application status.',
          action: 'Please contact support for assistance.'
        };
    }
  };

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PartnerLayout>
    );
  }

  if (!application) {
    return (
      <PartnerLayout>
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Application Found</h2>
          <p className="text-gray-600">We couldn't find a partner application for your account.</p>
        </div>
      </PartnerLayout>
    );
  }

  const statusInfo = getStatusMessage(application.status);

  return (
    <PartnerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Partner Application Status</h1>
          <p className="text-gray-600">Track the progress of your GeoDiet partner application</p>
        </div>

        {/* Main Status Card */}
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center space-y-4">
              {getStatusIcon(application.status)}
              <div>
                <h2 className="text-2xl font-bold mb-2">{statusInfo.title}</h2>
                <Badge className={`text-sm px-3 py-1 ${getStatusColor(application.status)}`}>
                  {application.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-gray-600 max-w-md">{statusInfo.description}</p>
              <p className="text-sm text-gray-500">{statusInfo.action}</p>
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Clinic Name</h3>
                <p className="text-gray-900">{application.clinic_name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Owner Name</h3>
                <p className="text-gray-900">{application.owner_name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Email</h3>
                <p className="text-gray-900">{application.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Phone</h3>
                <p className="text-gray-900">{application.phone || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-700 mb-1">Address</h3>
                <p className="text-gray-900">
                  {application.address}, {application.region}
                  {application.zip_code && ` ${application.zip_code}`}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Submitted</h3>
                <p className="text-gray-900">
                  {new Date(application.created_at).toLocaleDateString()}
                </p>
              </div>
              {application.reviewed_at && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">Reviewed</h3>
                  <p className="text-gray-900">
                    {new Date(application.reviewed_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            
            {application.notes && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-700 mb-2">Review Notes</h3>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{application.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm">
                If you have questions about your application status, please contact our support team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PartnerLayout>
  );
};

export default ApplicationStatus;
