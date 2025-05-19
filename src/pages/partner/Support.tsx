
import { MessageCircle, Mail, Phone, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerLayout from "@/components/partner/PartnerLayout";

const Support = () => {
  const faqItems = [
    {
      question: "How do I add a new client to my program?",
      answer: "To add a new client, navigate to the Client Management tab and click on the 'Add New Client' button. Enter the client's email address, which must match the email they used during checkout. Once added, the client will receive an activation email and gain access to your program for the standard 7-week period."
    },
    {
      question: "How do I extend a client's access?",
      answer: "To extend a client's access, go to the Freeze/Extend Plans tab, select 'Extend Plans', choose the client from the dropdown menu, specify the number of days you want to extend their access, and provide a reason for the extension. The client will be notified of the extension via email."
    },
    {
      question: "How do I upload custom content for my clients?",
      answer: "To upload custom content, visit the Video & Content tab and click on the 'Upload New Content' button. You can upload videos, PDFs, or create text-based articles. You can specify whether the content should be available to all your clients or only to selected clients."
    },
    {
      question: "What happens when a client's access expires?",
      answer: "When a client's access expires, they lose access to your custom content and can no longer message you directly. They retain view-only access to their historical data and progress for 30 days after expiration. You'll receive a notification 7 days before a client's access is set to expire."
    },
    {
      question: "How do I freeze a client's program?",
      answer: "To freeze a client's program, go to the Freeze/Extend Plans tab, select the client, specify the freeze duration (up to 14 days), and provide a reason. The client's access period will be extended by the freeze duration, and they'll be notified of the change. Their program will automatically resume at the end of the freeze period."
    }
  ];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Support & Help</h2>
          <p className="text-gray-500 mt-1">Get assistance with your GeoDiet partner portal</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#8D97DE]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 bg-[#8D97DE]/20 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-[#8D97DE]" />
              </div>
              <h3 className="text-lg font-medium">Live Chat</h3>
              <p className="text-sm text-gray-500 my-2">Chat with our partner support team</p>
              <Button className="mt-2 w-full">Start Chat</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#F4D374]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 bg-[#F4D374]/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#F4D374]" />
              </div>
              <h3 className="text-lg font-medium">Email Support</h3>
              <p className="text-sm text-gray-500 my-2">partners@geodiet.com</p>
              <Button className="mt-2 w-full">Send Email</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#BED1AB]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 bg-[#BED1AB]/20 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-[#BED1AB]" />
              </div>
              <h3 className="text-lg font-medium">Phone Support</h3>
              <p className="text-sm text-gray-500 my-2">Mon-Fri, 9AM-5PM ET</p>
              <Button className="mt-2 w-full">Call Now</Button>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="faq">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact Form</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support Team</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email address" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="clinic">Clinic / Partner Name</Label>
                      <Input id="clinic" placeholder="Your clinic name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <select id="topic" className="w-full border rounded-md p-2">
                        <option>Client Management</option>
                        <option>Content Upload</option>
                        <option>Billing Question</option>
                        <option>Technical Issue</option>
                        <option>Feature Request</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief description of your inquiry" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea id="message" placeholder="Please provide details about your question or issue..." className="min-h-[150px] w-full border rounded-md p-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="priority" className="rounded border-gray-300" />
                      <label htmlFor="priority" className="text-sm text-gray-700">Mark as urgent (response within 2 hours during business hours)</label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Submit Support Request</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Partner Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-2">Partner Guidebook</h3>
                        <p className="text-sm text-gray-500 mb-4">Comprehensive guide to managing your GeoDiet partner dashboard and programs.</p>
                        <Button variant="outline" className="w-full">Download PDF</Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-2">Video Tutorials</h3>
                        <p className="text-sm text-gray-500 mb-4">Step-by-step video guides for using all partner portal features.</p>
                        <Button variant="outline" className="w-full">View Tutorials</Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Quick Help Topics</h3>
                    <div className="space-y-2">
                      <Button variant="link" className="h-auto p-0 flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Client Management Guide
                      </Button>
                      <Button variant="link" className="h-auto p-0 flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Content Upload Best Practices
                      </Button>
                      <Button variant="link" className="h-auto p-0 flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Reading Progress Reports
                      </Button>
                      <Button variant="link" className="h-auto p-0 flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Troubleshooting Common Issues
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center mb-4">
                      <Shield className="h-5 w-5 mr-2 text-[#8D97DE]" />
                      <h3 className="font-medium">Legal & Compliance</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">Partner Terms of Service</Button>
                      <Button variant="outline" className="justify-start">Privacy Policy</Button>
                      <Button variant="outline" className="justify-start">HIPAA Compliance Guide</Button>
                      <Button variant="outline" className="justify-start">Data Security Information</Button>
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

export default Support;
