
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your platform settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your platform's basic settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="GeoDiet + Wonder Health" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input id="site-description" defaultValue="Personalized nutrition and health monitoring platform" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@geodiet.com" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input id="support-phone" defaultValue="(800) 555-1234" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="america-los_angeles">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-los_angeles">America/Los Angeles</SelectItem>
                      <SelectItem value="america-new_york">America/New York</SelectItem>
                      <SelectItem value="europe-london">Europe/London</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Settings</CardTitle>
                <CardDescription>Configure subscription rules and durations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="default-duration">Default Package Duration (weeks)</Label>
                  <Input id="default-duration" type="number" defaultValue="8" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="extension-limit">Maximum Extension Period (weeks)</Label>
                  <Input id="extension-limit" type="number" defaultValue="4" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="freeze-limit">Maximum Freeze Period (days)</Label>
                  <Input id="freeze-limit" type="number" defaultValue="30" />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="first-time-rule">
                    First-time users must purchase GeoDiet + CGM
                  </Label>
                  <Switch id="first-time-rule" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-renewal">
                    Enable automatic subscription renewals
                  </Label>
                  <Switch id="auto-renewal" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="early-renewal">
                    Allow early renewal discounts
                  </Label>
                  <Switch id="early-renewal" defaultChecked />
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize your platform's appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="logo-upload">Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-gray-500">Logo</span>
                        </div>
                        <Button variant="outline">Upload New</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="favicon-upload">Favicon</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-gray-500">Icon</span>
                        </div>
                        <Button variant="outline">Upload New</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input id="primary-color" defaultValue="#160041" />
                        <div className="w-10 h-10 rounded" style={{ backgroundColor: "#160041" }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input id="secondary-color" defaultValue="#8D97DE" />
                        <div className="w-10 h-10 rounded" style={{ backgroundColor: "#8D97DE" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="custom-css">Custom CSS</Label>
                  <Textarea
                    id="custom-css"
                    className="font-mono"
                    placeholder="Add your custom CSS here"
                    rows={5}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="dark-mode">
                    Enable Dark Mode Option
                  </Label>
                  <Switch id="dark-mode" defaultChecked />
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Manage integration with third-party services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="google-analytics">Google Analytics Tracking ID</Label>
                  <Input id="google-analytics" placeholder="UA-XXXXXXXXX-X" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                  <Input id="gtm-id" placeholder="GTM-XXXXXXX" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                  <Input id="facebook-pixel" placeholder="XXXXXXXXXXXXXXXXXX" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="mailchimp-api">Mailchimp API Key</Label>
                  <Input id="mailchimp-api" type="password" placeholder="Enter API key" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="mailchimp-list">Mailchimp List ID</Label>
                  <Input id="mailchimp-list" placeholder="Enter list ID" />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="facebook-integration">
                    Facebook Integration
                  </Label>
                  <Switch id="facebook-integration" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="google-integration">
                    Google Integration
                  </Label>
                  <Switch id="google-integration" defaultChecked />
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your platform's security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="session-timeout">Admin Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                  <Input id="max-login-attempts" type="number" defaultValue="5" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input id="password-expiry" type="number" defaultValue="90" />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="two-factor">
                    Require Two-Factor Authentication
                  </Label>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="ip-restriction">
                    Enable IP Address Restrictions
                  </Label>
                  <Switch id="ip-restriction" />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="allowed-ips">Allowed IP Addresses (one per line)</Label>
                  <Textarea
                    id="allowed-ips"
                    className="font-mono"
                    placeholder="192.168.1.1"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
