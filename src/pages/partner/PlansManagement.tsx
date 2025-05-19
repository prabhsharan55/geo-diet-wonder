
import { Clock, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerLayout from "@/components/partner/PartnerLayout";

const PlansManagement = () => {
  const clients = [
    { id: 1, name: "John Doe", email: "john@example.com", startDate: "Jan 15, 2023", status: "Active", expires: "Feb 28, 2023" },
    { id: 2, name: "Taylor Kim", email: "taylor@example.com", startDate: "Dec 5, 2022", status: "Active", expires: "Jan 23, 2023" },
    { id: 3, name: "Sam Miller", email: "sam@example.com", startDate: "Feb 1, 2023", status: "Frozen", expires: "Mar 22, 2023" },
    { id: 4, name: "Rebecca Lee", email: "rebecca@example.com", startDate: "Jan 10, 2023", status: "Expired", expires: "Feb 28, 2023" },
    { id: 5, name: "Alex Brown", email: "alex@example.com", startDate: "Jan 20, 2023", status: "Active", expires: "Mar 10, 2023" },
  ];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Freeze / Extend Plans</h2>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline">View History</Button>
            <Button variant="outline">Help</Button>
          </div>
        </div>
        
        <Tabs defaultValue="freeze">
          <TabsList className="grid w-full md:w-auto grid-cols-2 mb-4">
            <TabsTrigger value="freeze">Freeze Plans</TabsTrigger>
            <TabsTrigger value="extend">Extend Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="freeze">
            <Card>
              <CardHeader>
                <CardTitle>Freeze Client Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="client">Select Client</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Freeze Reason</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vacation">Vacation/Travel</SelectItem>
                        <SelectItem value="medical">Medical Reasons</SelectItem>
                        <SelectItem value="personal">Personal Emergency</SelectItem>
                        <SelectItem value="technical">Technical Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="days">Freeze Duration (Days)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="21">21 days</SelectItem>
                        <SelectItem value="28">28 days</SelectItem>
                        <SelectItem value="custom">Custom period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notification">Notification</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Notify client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, send notification</SelectItem>
                        <SelectItem value="no">No notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <textarea 
                    id="notes"
                    className="w-full min-h-[100px] border border-input rounded-md p-2"
                    placeholder="Add any additional details about this freeze request..."
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit Freeze Request</Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Currently Frozen Plans</h3>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frozen On</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resumes On</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041]">
                              SM
                            </div>
                            <div className="ml-3">Sam Miller</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">Vacation</td>
                        <td className="px-6 py-4 whitespace-nowrap">Feb 15, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">Mar 1, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button variant="ghost" size="sm">
                            <Clock className="h-4 w-4 mr-1" /> Unfreeze
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="extend">
            <Card>
              <CardHeader>
                <CardTitle>Extend Client Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="client">Select Client</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id.toString()}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Extension Reason</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compensation">Service Compensation</SelectItem>
                        <SelectItem value="courtesy">Courtesy Extension</SelectItem>
                        <SelectItem value="technical">Technical Issues</SelectItem>
                        <SelectItem value="promotion">Promotional Offer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="days">Extension Duration (Days)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="custom">Custom period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notification">Notification</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Notify client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, send notification</SelectItem>
                        <SelectItem value="no">No notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <textarea 
                    id="notes"
                    className="w-full min-h-[100px] border border-input rounded-md p-2"
                    placeholder="Add any additional details about this extension request..."
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit Extension Request</Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Recently Extended Plans</h3>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extended On</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Expiry Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Added</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041]">
                              JD
                            </div>
                            <div className="ml-3">John Doe</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">Courtesy Extension</td>
                        <td className="px-6 py-4 whitespace-nowrap">Feb 20, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">Mar 14, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">14</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PartnerLayout>
  );
};

export default PlansManagement;
