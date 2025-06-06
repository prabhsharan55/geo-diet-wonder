
import { useState } from "react";
import { toast } from "sonner";
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Camera, Check, Lock, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserData } from "@/context/UserDataContext";

const Settings = () => {
  const { userData } = useUserData();
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("180");
  const [height, setHeight] = useState("175");
  const [formLoading, setFormLoading] = useState(false);
  
  const handleSaveProfile = async () => {
    setFormLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully");
    } finally {
      setFormLoading(false);
    }
  };
  
  const handlePasswordUpdate = () => {
    toast.info("Password update functionality coming soon");
  };
  
  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully");
  };

  const getUserInitials = () => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Settings & Profile</h2>
          <p className="text-gray-500 mt-1">Manage your account preferences</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="plan">My Plan</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">JPG or PNG. Max size 1MB</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input 
                      id="first-name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input 
                      id="last-name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value="john.doe@example.com"
                      disabled 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup 
                      value={gender} 
                      onValueChange={setGender} 
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                      id="height" 
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handleSaveProfile}
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="hidden md:block" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handlePasswordUpdate}
                  >
                    <Check className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plan" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription & Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-md">
                  <div>
                    <p className="font-medium text-green-900">GeoDiet + CGM Complete</p>
                    <p className="text-sm text-green-700">Active until June 30, 2025</p>
                  </div>
                  <span className="bg-green-100 text-green-800 py-1 px-3 text-sm font-medium rounded-full">
                    4 weeks left
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium mb-1">Plan Details</p>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Program Type:</span>
                        <span>7-Week CGM + Diet Plan</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Renewal Date:</span>
                        <span>June 30, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Program Status:</span>
                        <span className="text-green-600">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">Assigned Nutritionist</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="" />
                        <AvatarFallback>JM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>Jessica Miller, RD</p>
                        <p className="text-sm text-gray-500">Northern Clinic</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button>Extend My Plan</Button>
                  <Button variant="outline">Request Program Freeze</Button>
                  <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Daily Reminders</p>
                      <p className="text-sm text-gray-500">Reminders to log meals and complete daily tasks</p>
                    </div>
                    <Switch id="daily-reminders" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Glucose Alerts</p>
                      <p className="text-sm text-gray-500">Alerts when your glucose levels are outside of your target range</p>
                    </div>
                    <Switch id="glucose-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Coach Messages</p>
                      <p className="text-sm text-gray-500">Notifications when your coach responds to your questions</p>
                    </div>
                    <Switch id="coach-messages" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Summary</p>
                      <p className="text-sm text-gray-500">Weekly progress summary and insights</p>
                    </div>
                    <Switch id="weekly-summary" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">News & Tips</p>
                      <p className="text-sm text-gray-500">Health tips and product updates</p>
                    </div>
                    <Switch id="news-tips" />
                  </div>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Preferred Notification Method</p>
                  <RadioGroup defaultValue="email" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email-notif" />
                      <Label htmlFor="email-notif">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="push" id="push-notif" />
                      <Label htmlFor="push-notif">Push Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both-notif" />
                      <Label htmlFor="both-notif">Both</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handleSavePreferences}
                  >
                    <Check className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Share CGM Data with Coach</p>
                      <p className="text-sm text-gray-500">Allow your nutritionist to view your CGM data for personalized advice</p>
                    </div>
                    <Switch id="share-cgm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Anonymous Data for Research</p>
                      <p className="text-sm text-gray-500">Share anonymized data to improve our program and research</p>
                    </div>
                    <Switch id="anonymous-data" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>
                
                <div className="space-y-3 border-t pt-4">
                  <p className="font-medium">Data Management</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline">Download My Data</Button>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">Delete Account</Button>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="font-medium mb-3">Legal Documents</p>
                  <div className="space-y-2">
                    <Button variant="link" className="h-auto p-0 text-blue-600">Privacy Policy</Button>
                    <div className="block w-full h-px bg-gray-200"></div>
                    <Button variant="link" className="h-auto p-0 text-blue-600">Terms of Service</Button>
                    <div className="block w-full h-px bg-gray-200"></div>
                    <Button variant="link" className="h-auto p-0 text-blue-600">Cookie Policy</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default Settings;
