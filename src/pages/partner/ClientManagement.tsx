
import { Search, PlusCircle, Clock, FileBarChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const ClientManagement = () => {
  const [selectedClient, setSelectedClient] = useState<null | string>(null);
  const { userDetails } = useAuth();
  
  // Fetch customers for this partner's clinic
  const { data: clients, isLoading } = useQuery({
    queryKey: ['partner-clients', userDetails?.clinic_id],
    queryFn: async () => {
      console.log('Fetching clients for clinic:', userDetails?.clinic_id);
      
      if (!userDetails?.clinic_id) {
        console.log('No clinic_id found for user');
        return [];
      }
      
      const { data, error } = await supabase
        .from('customers')
        .select(`
          id,
          email,
          access_status,
          created_at,
          expiry_date,
          purchase_date,
          users!customers_user_id_fkey(
            id,
            full_name
          )
        `)
        .eq('clinic_id', userDetails.clinic_id)
        .order('created_at', { ascending: false });

      console.log('Clients query result:', { data, error });

      if (error) throw error;
      return data || [];
    },
    enabled: !!userDetails?.clinic_id,
  });
  
  const handleClientClick = (id: string) => {
    setSelectedClient(id === selectedClient ? null : id);
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "frozen":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const selectedClientData = clients?.find(c => c.id === selectedClient);

  if (isLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Client Management</h2>
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Client
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3">
            <Card className="overflow-hidden">
              <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clients by name or email..."
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Filter</Button>
                  <Button variant="outline">Sort</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clients && clients.length > 0 ? (
                      clients.map((client) => (
                        <tr 
                          key={client.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${selectedClient === client.id ? 'bg-blue-50' : ''}`}
                          onClick={() => handleClientClick(client.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041]">
                                {(client.users?.full_name || client.email).charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-3">{client.users?.full_name || 'No Name'}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatDate(client.purchase_date)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(client.access_status)}`}>
                              {client.access_status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {client.expiry_date ? formatDate(client.expiry_date) : 'No expiry'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Clock className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <FileBarChart className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <Users className="h-12 w-12 text-gray-400 mb-2" />
                            <p>No clients found</p>
                            <p className="text-sm">Clients will appear here once they sign up for your clinic</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {clients?.length || 0} of {clients?.length || 0} clients
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:w-1/3">
            {selectedClientData ? (
              <Card className="p-6">
                <h3 className="text-xl font-medium mb-4">Client Details</h3>
                
                <div className="mb-6 flex items-center">
                  <div className="h-16 w-16 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041] text-xl">
                    {(selectedClientData.users?.full_name || selectedClientData.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">{selectedClientData.users?.full_name || 'No Name'}</h4>
                    <p className="text-gray-500">{selectedClientData.email}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm text-gray-500">Program Status</h5>
                    <p className="font-medium">{selectedClientData.access_status}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm text-gray-500">Start Date</h5>
                    <p className="font-medium">{formatDate(selectedClientData.purchase_date)}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm text-gray-500">Expiry Date</h5>
                    <p className="font-medium">
                      {selectedClientData.expiry_date ? formatDate(selectedClientData.expiry_date) : 'No expiry'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full">Extend Access</Button>
                  <Button variant="outline" className="w-full">Freeze Plan</Button>
                  <Button variant="outline" className="w-full">View Progress</Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium mb-1">No Client Selected</h3>
                  <p className="text-gray-500 mb-4">Click on a client to view details</p>
                  <Button>Add New Client</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default ClientManagement;
