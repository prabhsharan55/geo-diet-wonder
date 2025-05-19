
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, Users, Send } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const EmailPage = () => {
  const campaigns = [
    {
      id: 1,
      name: "April Newsletter",
      subject: "GeoDiet: Your April Health Update",
      audience: "All Subscribers",
      sent: "Apr 5, 2025",
      opens: "38%",
      clicks: "12%",
    },
    {
      id: 2,
      name: "New CGM Package",
      subject: "Introducing Our Advanced CGM Package",
      audience: "Leads",
      sent: "Mar 20, 2025",
      opens: "42%",
      clicks: "18%",
    },
    {
      id: 3,
      name: "Renewal Reminder",
      subject: "Your GeoDiet Package is Expiring Soon",
      audience: "Expiring Customers",
      sent: "Mar 15, 2025",
      opens: "64%",
      clicks: "32%",
    },
    {
      id: 4,
      name: "Workout Video Series",
      subject: "New Workout Videos Now Available",
      audience: "Active Customers",
      sent: "Mar 1, 2025",
      opens: "52%",
      clicks: "27%",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Email Tools</h1>
          <p className="text-gray-500">Manage email campaigns and subscriber data</p>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Email campaigns sent in the last 90 days</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of recent email campaigns.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Click Rate</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.subject}</TableCell>
                        <TableCell>{campaign.audience}</TableCell>
                        <TableCell>{campaign.sent}</TableCell>
                        <TableCell>{campaign.opens}</TableCell>
                        <TableCell>{campaign.clicks}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">View Report</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View All Campaigns</Button>
                <Button>Create New Campaign</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
                <CardDescription>Set up and send a new email campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input id="campaign-name" placeholder="Enter campaign name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Email Subject</Label>
                    <Input id="email-subject" placeholder="Enter email subject" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audience">Select Audience</Label>
                    <select
                      id="audience"
                      className="w-full h-10 px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                    >
                      <option value="">Select an audience</option>
                      <option value="all">All Subscribers</option>
                      <option value="customers">Customers</option>
                      <option value="leads">Leads</option>
                      <option value="expiring">Expiring Customers</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="template">Select Template</Label>
                    <select
                      id="template"
                      className="w-full h-10 px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                    >
                      <option value="">Select a template</option>
                      <option value="newsletter">Newsletter</option>
                      <option value="promotion">Promotion</option>
                      <option value="announcement">Announcement</option>
                      <option value="custom">Custom Template</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-content">Email Content</Label>
                    <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center border">
                      <p className="text-gray-500">Email template editor would be displayed here</p>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Draft</Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Send className="h-4 w-4 mr-2" />
                    Send Test
                  </Button>
                  <Button>Schedule</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Subscriber Management</CardTitle>
                    <CardDescription>View and manage email subscribers</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input placeholder="Search subscribers..." />
                </div>
                
                <Table>
                  <TableCaption>A list of email subscribers.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Signup Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">emma.j@example.com</TableCell>
                      <TableCell>Emma Johnson</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Apr 12, 2025</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">mchen@example.com</TableCell>
                      <TableCell>Marcus Chen</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Mar 25, 2025</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">sofia.r@example.com</TableCell>
                      <TableCell>Sofia Rodriguez</TableCell>
                      <TableCell>Newsletter</TableCell>
                      <TableCell>Feb 18, 2025</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">jawilson@example.com</TableCell>
                      <TableCell>James Wilson</TableCell>
                      <TableCell>Lead</TableCell>
                      <TableCell>Jan 05, 2025</TableCell>
                      <TableCell>Unsubscribed</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">Showing 4 of 3,247 subscribers</div>
                <div className="flex gap-2">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  <Button variant="outline">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Manage reusable email templates</CardDescription>
                  </div>
                  <Button>Create Template</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-md overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-500">Newsletter Template</p>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Monthly Newsletter</h3>
                      <p className="text-sm text-gray-500 mt-1">Standard newsletter format with sections for featured content</p>
                      <div className="flex justify-end mt-4">
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-500">Promotion Template</p>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Special Offer</h3>
                      <p className="text-sm text-gray-500 mt-1">Template for announcing promotions and special offers</p>
                      <div className="flex justify-end mt-4">
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-500">Welcome Template</p>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">New User Welcome</h3>
                      <p className="text-sm text-gray-500 mt-1">Onboarding template for new subscribers</p>
                      <div className="flex justify-end mt-4">
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default EmailPage;
