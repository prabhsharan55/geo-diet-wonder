
import { Search, PlusCircle, Bell, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PartnerLayout from "@/components/partner/PartnerLayout";

const Announcements = () => {
  const announcements = [
    { id: 1, title: "Service Maintenance Notice", content: "Our app will be undergoing maintenance on May 24th from 2-4 AM EST. Some features may be temporarily unavailable.", type: "System", audience: "All Clients", status: "Active", date: "May 19, 2025", expiry: "May 25, 2025" },
    { id: 2, title: "New Meal Plans Released", content: "Check out our new summer meal plans with seasonal recipes and nutrition tips!", type: "Content", audience: "All Clients", status: "Active", date: "May 15, 2025", expiry: "Jun 15, 2025" },
    { id: 3, title: "Holiday Office Hours", content: "Our support team will have modified hours during the upcoming holiday weekend.", type: "Office", audience: "All Clients", status: "Scheduled", date: "May 20, 2025", expiry: "May 28, 2025" },
    { id: 4, title: "Congratulations to May Achievers", content: "Special recognition to clients who reached their health goals this month.", type: "Recognition", audience: "Selected Clients", status: "Active", date: "May 10, 2025", expiry: "May 31, 2025" },
    { id: 5, title: "New Feature: Progress Sharing", content: "You can now share your progress reports directly with family members or other healthcare providers.", type: "Feature", audience: "All Clients", status: "Draft", date: "", expiry: "" },
  ];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Announcements</h2>
          <div className="mt-4 md:mt-0">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Announcement
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList className="grid w-full md:w-auto grid-cols-4 mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <Card>
              <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search announcements..."
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-1" /> Filter
                  </Button>
                </div>
              </div>
              <div className="p-0">
                {announcements.filter(a => a.status === 'Active').map((announcement) => (
                  <div key={announcement.id} className="border-b p-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <Badge variant="outline">{announcement.type}</Badge>
                          <Badge className={announcement.audience === 'All Clients' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}>
                            {announcement.audience}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">{announcement.content}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center gap-3">
                        <div className="text-xs text-gray-500">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {announcement.date} - {announcement.expiry}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">End</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <Card>
              <div className="p-4">
                {announcements.filter(a => a.status === 'Scheduled').map((announcement) => (
                  <div key={announcement.id} className="border-b p-4 hover:bg-gray-50 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <Badge variant="outline">{announcement.type}</Badge>
                          <Badge className={announcement.audience === 'All Clients' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}>
                            {announcement.audience}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">{announcement.content}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center gap-3">
                        <div className="text-xs text-gray-500">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {announcement.date} - {announcement.expiry}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Cancel</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="drafts">
            <Card>
              <div className="p-4">
                {announcements.filter(a => a.status === 'Draft').map((announcement) => (
                  <div key={announcement.id} className="border-b p-4 hover:bg-gray-50 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <Badge variant="outline">{announcement.type}</Badge>
                          <Badge className={announcement.audience === 'All Clients' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}>
                            {announcement.audience}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">{announcement.content}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex gap-1">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Publish</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="expired">
            <Card>
              <div className="p-4">
                <div className="text-center py-8 text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <h3 className="text-lg font-medium mb-1">No Expired Announcements</h3>
                  <p className="max-w-md mx-auto">Expired announcements will appear here. They are no longer visible to clients but can be referenced or republished.</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Announcement Title</label>
                <Input id="title" placeholder="Enter announcement title" />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
                <textarea id="content" className="min-h-[100px] w-full border rounded-md p-2" placeholder="Enter announcement content"></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                  <select id="type" className="w-full border rounded-md p-2">
                    <option>System</option>
                    <option>Content</option>
                    <option>Office</option>
                    <option>Recognition</option>
                    <option>Feature</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="audience" className="block text-sm font-medium mb-1">Audience</label>
                  <select id="audience" className="w-full border rounded-md p-2">
                    <option>All Clients</option>
                    <option>Selected Clients</option>
                    <option>New Clients</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                  <select id="status" className="w-full border rounded-md p-2">
                    <option>Draft</option>
                    <option>Publish Now</option>
                    <option>Schedule</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="publish-date" className="block text-sm font-medium mb-1">Publish Date</label>
                  <Input id="publish-date" type="date" />
                </div>
                <div>
                  <label htmlFor="expiry-date" className="block text-sm font-medium mb-1">Expiry Date</label>
                  <Input id="expiry-date" type="date" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="outline">Save as Draft</Button>
                <Button>Publish Announcement</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PartnerLayout>
  );
};

export default Announcements;
