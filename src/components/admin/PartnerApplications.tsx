
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, Check, X, Clock } from "lucide-react";

type PartnerApplication = {
  id: string;
  clinic_name: string;
  owner_name: string;
  email: string;
  phone: string | null;
  address: string;
  region: string;
  zip_code: string | null;
  status: string;
  created_at: string;
  reviewed_at: string | null;
  notes: string | null;
};

const PartnerApplications = () => {
  const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null);
  const [notes, setNotes] = useState("");
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['partner-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partner_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PartnerApplication[];
    },
  });

  const updateApplicationMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes?: string }) => {
      const updateData: any = {
        status,
        reviewed_at: new Date().toISOString(),
      };
      
      if (notes) updateData.notes = notes;

      const { error } = await supabase
        .from('partner_applications')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // If approved, create the clinic entry
      if (status === 'approved') {
        const application = applications?.find(app => app.id === id);
        if (application) {
          const { error: clinicError } = await supabase
            .from('clinics')
            .insert({
              name: application.clinic_name,
              owner_email: application.email,
              address: application.address,
              region: application.region
            });

          if (clinicError) throw clinicError;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-applications'] });
      toast.success("Application updated successfully!");
      setSelectedApp(null);
      setNotes("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update application");
    },
  });

  const handleApprove = async (application: PartnerApplication) => {
    updateApplicationMutation.mutate({
      id: application.id,
      status: 'approved',
      notes
    });
  };

  const handleReject = async (application: PartnerApplication) => {
    updateApplicationMutation.mutate({
      id: application.id,
      status: 'rejected',
      notes
    });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {!applications || applications.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">No partner applications yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Clinic Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.clinic_name}</TableCell>
                    <TableCell>{app.owner_name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.region}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(app.created_at)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApp(app);
                              setNotes(app.notes || "");
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Partner Application</DialogTitle>
                          </DialogHeader>
                          {selectedApp && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Clinic Name</Label>
                                  <p className="text-sm">{selectedApp.clinic_name}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Owner</Label>
                                  <p className="text-sm">{selectedApp.owner_name}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Email</Label>
                                  <p className="text-sm">{selectedApp.email}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Phone</Label>
                                  <p className="text-sm">{selectedApp.phone || 'Not provided'}</p>
                                </div>
                                <div className="col-span-2">
                                  <Label className="text-sm font-medium">Address</Label>
                                  <p className="text-sm">{selectedApp.address}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Region</Label>
                                  <p className="text-sm">{selectedApp.region}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Zip Code</Label>
                                  <p className="text-sm">{selectedApp.zip_code || 'Not provided'}</p>
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="notes">Review Notes</Label>
                                <Textarea
                                  id="notes"
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  placeholder="Add notes about this application..."
                                  className="mt-1"
                                />
                              </div>
                              
                              {selectedApp.status === 'pending' && (
                                <div className="flex gap-2 pt-4">
                                  <Button
                                    onClick={() => handleApprove(selectedApp)}
                                    disabled={updateApplicationMutation.isPending}
                                    className="flex-1"
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleReject(selectedApp)}
                                    disabled={updateApplicationMutation.isPending}
                                    className="flex-1"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartnerApplications;
