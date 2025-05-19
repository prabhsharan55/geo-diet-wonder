
import { Shield, Bell, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerLayout from "@/components/partner/PartnerLayout";

const Settings = () => {
  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Settings</h2>
          <div className="mt-4 md:mt-0">
            <Button>Save Changes</Button>
          </div>
        </div>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full md:w-auto grid-cols-4 mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Partner Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center p-6 border rounded-md">
                      <div className="w-32 h-32 bg-[#8D97DE]/20 rounded-full flex items-center justify-center mb-4 text-[#160041] text-3xl font-bold">
                        HC
                      </div>
                      <p className="font-medium">HealthFirst Clinic</p>
                      <p className="text-sm text-gray-500">Partner since Jan 2023</p>
                      <Button variant="outline" className="mt-4">Upload Logo</Button>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clinic-name">Clinic Name</Label>
                        <Input id="clinic-name" defaultValue="HealthFirst Clinic" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner-type">Partner Type</Label>
                        <select id="partner-type" className="w-full border rounded-md p-2">
                          <option>Clinic</option>
                          <option>Gym</option>
                          <option>Nutrition Practice</option>
                          <option>Medical Center</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Primary Contact Name</Label>
                        <Input id="contact-name" defaultValue="Dr. Emily Johnson" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" defaultValue="emily@healthfirst.com" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="(555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select id="timezone" className="w-full border rounded-md p-2">
                          <option>Eastern Time (ET)</option>
                          <option>Central Time (CT)</option>
                          <option>Mountain Time (MT)</option>
                          <option>Pacific Time (PT)</option>
                          <option>Alaska Time (AKT)</option>
                          <option>Hawaii-Aleutian Time (HAT)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Health Avenue" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="Portland" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" defaultValue="Oregon" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" defaultValue="97201" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="clinic-description">Clinic Description</Label>
                      <textarea 
                        id="clinic-description" 
                        className="w-full min-h-[100px] border rounded-md p-2"
                        defaultValue="HealthFirst Clinic specializes in metabolic health and offers personalized nutrition programs with continuous glucose monitoring."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Access Requests</p>
                        <p className="text-sm text-gray-500">Receive emails when clients request access to your programs</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Expiring Client Access</p>
                        <p className="text-sm text-gray-500">Receive reminders when client access is about to expire</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Client Progress Updates</p>
                        <p className="text-sm text-gray-500">Receive weekly summaries of client progress</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">GeoDiet Platform Updates</p>
                        <p className="text-sm text-gray-500">Receive information about new features and improvements</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium">In-App Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Client Activity</p>
                        <p className="text-sm text-gray-500">Show notifications for client activities and milestones</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Access Requests</p>
                        <p className="text-sm text-gray-500">Show notifications for new access requests</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Messages</p>
                        <p className="text-sm text-gray-500">Show notifications about system updates and maintenance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Digest Frequency</p>
                      <p className="text-sm text-gray-500">Choose how often to receive email summaries</p>
                    </div>
                    <select className="border rounded-md p-2">
                      <option>Daily</option>
                      <option selected>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Password</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline">Update Password</Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t space-y-4">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="pt-6 border-t space-y-4">
                  <h3 className="font-medium">Session Management</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-logout after inactivity</p>
                        <p className="text-sm text-gray-500">Automatically log out after a period of inactivity</p>
                      </div>
                      <select className="border rounded-md p-2">
                        <option>15 minutes</option>
                        <option selected>30 minutes</option>
                        <option>1 hour</option>
                        <option>Never</option>
                      </select>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" /> Sign Out All Other Devices
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Data Management</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Client Data Retention</p>
                        <p className="text-sm text-gray-500">How long to keep data for inactive clients</p>
                      </div>
                      <select className="border rounded-md p-2">
                        <option>3 months</option>
                        <option selected>6 months</option>
                        <option>1 year</option>
                        <option>Forever</option>
                      </select>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline">Export All Client Data</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t space-y-4">
                  <h3 className="font-medium">Account Management</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Display Partner Badge</p>
                      <p className="text-sm text-gray-500">Show your GeoDiet partner status on your website</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <Button variant="outline" className="w-full md:w-auto flex items-center">
                      <Users className="h-4 w-4 mr-2" /> Manage Team Members
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto flex items-center">
                      <Calendar className="h-4 w-4 mr-2" /> Sync with Calendar
                    </Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t space-y-4">
                  <div className="bg-red-50 p-4 rounded-md border border-red-200">
                    <h3 className="font-medium text-red-800">Danger Zone</h3>
                    <p className="text-sm text-red-600 mb-4">These actions are irreversible. Please proceed with caution.</p>
                    
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        Deactivate Account
                      </Button>
                      <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        Delete All Client Data
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PartnerLayout>
  );
};

export default Settings;
