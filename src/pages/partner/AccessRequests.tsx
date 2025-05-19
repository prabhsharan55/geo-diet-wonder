
import PartnerLayout from "@/components/partner/PartnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AccessRequests = () => {
  const pendingRequests = [
    { id: 1, name: "Maria Johnson", email: "maria@example.com", date: "Feb 20, 2023", type: "New Program" },
    { id: 2, name: "Robert Chen", email: "robert@example.com", date: "Feb 19, 2023", type: "Program Renewal" },
    { id: 3, name: "Sophia Lee", email: "sophia@example.com", date: "Feb 18, 2023", type: "New Program" },
  ];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Access Requests</h2>
          <p className="text-gray-500 mt-2">Review and manage client access requests.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {pendingRequests.map(request => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{request.name}</h3>
                    <p className="text-gray-500">{request.email}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-sm text-gray-500">Requested: {request.date}</span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{request.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline">Deny</Button>
                    <Button>Approve</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {pendingRequests.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-medium">No pending requests</h3>
              <p className="text-gray-500 mt-2">All access requests have been processed.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </PartnerLayout>
  );
};

export default AccessRequests;
