
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, Mail, Phone, Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Support = () => {
  const faqItems = [
    {
      question: "How do I connect my CGM device?",
      answer: "To connect your CGM device, go to the CGM Tracker tab and select 'Connect Device'. Follow the on-screen instructions to pair your device with our app. Make sure your device is fully charged and Bluetooth is enabled on your phone."
    },
    {
      question: "Can I change my nutritionist?",
      answer: "Yes, you can request to change your nutritionist. Go to Settings > My Plan and click on 'Request Change'. Note that changes are subject to availability and may take up to 48 hours to process."
    },
    {
      question: "How do I pause my program if I'm on vacation?",
      answer: "You can pause your program for up to 14 days per year. Go to Settings > My Plan and select 'Request Program Freeze'. Enter your dates and reason, and our team will review your request within 24 hours."
    },
    {
      question: "What happens when my subscription expires?",
      answer: "When your subscription expires, you'll lose access to new content, coach support, and CGM tracking. However, you'll still be able to view your historical data and completed content for up to 30 days after expiration."
    },
    {
      question: "How accurate is the CGM data?",
      answer: "Our CGM devices are FDA-approved with a typical accuracy of ±10-15% compared to traditional blood glucose measurements. Environmental factors, hydration, and sensor placement can affect readings."
    }
  ];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Support</h2>
          <p className="text-gray-500 mt-1">Get help with any aspect of your program</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#8D97DE]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 bg-[#8D97DE]/20 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-[#8D97DE]" />
              </div>
              <h3 className="text-lg font-medium">Live Chat</h3>
              <p className="text-sm text-gray-500 my-2">Chat with our support team</p>
              <Button className="mt-2 w-full">Start Chat</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#F4D374]/10 to-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 bg-[#F4D374]/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#F4D374]" />
              </div>
              <h3 className="text-lg font-medium">Email Support</h3>
              <p className="text-sm text-gray-500 my-2">support@wonder.health</p>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
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
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Technical Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">CGM Device Support</h3>
                <p className="text-sm text-gray-600 mb-3">Having issues with your CGM device? Check out our troubleshooting guide or contact the manufacturer directly.</p>
                <Button variant="outline">View CGM Guide</Button>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">App Troubleshooting</h3>
                <div className="space-y-2">
                  <Button variant="link" className="h-auto p-0 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    How to clear app cache
                  </Button>
                  <Button variant="link" className="h-auto p-0 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Fixing login issues
                  </Button>
                  <Button variant="link" className="h-auto p-0 flex items-center">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Data sync problems
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default Support;
