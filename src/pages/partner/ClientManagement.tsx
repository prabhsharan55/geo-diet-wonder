
import { Search, PlusCircle, Clock, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useState } from "react";

const ClientManagement = () => {
  const [selectedClient, setSelectedClient] = useState<null | number>(null);
  
  const clients = [
    { id: 1, name: "John Doe", email: "john@example.com", startDate: "Jan 15, 2023", status: "Active", expires: "Feb 28, 2023" },
    { id: 2, name: "Taylor Kim", email: "taylor@example.com", startDate: "Dec 5, 2022", status: "Active", expires: "Jan 23, 2023" },
    { id: 3, name: "Sam Miller", email: "sam@example.com", startDate: "Feb 1, 2023", status: "Frozen", expires: "Mar 22, 2023" },
    { id: 4, name: "Rebecca Lee", email: "rebecca@example.com", startDate: "Jan 10, 2023", status: "Expired", expires: "Feb 28, 2023" },
    { id: 5, name: "Alex Brown", email: "alex@example.com", startDate: "Jan 20, 2023", status: "Active", expires: "Mar 10, 2023" },
    { id: 6, name: "Jamie Wilson", email: "jamie@example.com", startDate: "Feb 5, 2023", status: "Active", expires: "Mar 26, 2023" },
  ];
  
  const handleClientClick = (id: number) => {
    setSelectedClient(id === selectedClient ? null : id);
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Frozen":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                    {clients.map((client) => (
                      <tr 
                        key={client.id} 
                        className={`hover:bg-gray-50 cursor-pointer ${selectedClient === client.id ? 'bg-blue-50' : ''}`}
                        onClick={() => handleClientClick(client.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041]">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">{client.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{client.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(client.status)}`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{client.expires}</td>
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
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">Showing 6 of 6 clients</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:w-1/3">
            {selectedClient ? (
              <Card className="p-6">
                <h3 className="text-xl font-medium mb-4">Client Details</h3>
                
                <div className="mb-6 flex items-center">
                  <div className="h-16 w-16 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041] text-xl">
                    {clients.find(c => c.id === selectedClient)?.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">{clients.find(c => c.id === selectedClient)?.name}</h4>
                    <p className="text-gray-500">{clients.find(c => c.id === selectedClient)?.email}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm text-gray-500">Program Status</h5>
                    <p className="font-medium">{clients.find(c => c.id === selectedClient)?.status}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm text-gray-500">Start Date</h5>
                    <p className="font-medium">{clients.find(c => c.id === selectedClient)?.startDate}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm text-gray-500">Expiry Date</h5>
                    <p className="font-medium">{clients.find(c => c.id === selectedClient)?.expires}</p>
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
