
import { useState } from "react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally be a form submission to a backend
    setFormSubmitted(true);
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about Wonder? We're here to help you on your health journey.
          </p>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-medium mb-6">Get in Touch</h2>
            
            {formSubmitted ? (
              <div className="bg-[#E6E8FF] p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-[#A6B8B9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-[#241153]"></div>
                </div>
                <h3 className="text-2xl font-medium mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">
                  We've received your message and will get back to you within 24-48 hours.
                </p>
                <Button 
                  variant="outline" 
                  className="rounded-full"
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium">
                      First Name
                    </label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      placeholder="First Name" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium">
                      Last Name
                    </label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      placeholder="Last Name" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="yourname@example.com" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="topic" className="block text-sm font-medium">
                    Topic
                  </label>
                  <Select name="topic">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="nutritionist">Nutritionist Services</SelectItem>
                      <SelectItem value="cgm">CGM Monitoring</SelectItem>
                      <SelectItem value="subscription">Subscription Plans</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="How can we help you?" 
                    required 
                    className="h-32"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full w-full"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
          
          <div>
            <h2 className="text-3xl font-medium mb-6">Other Ways to Connect</h2>
            
            <div className="space-y-8">
              <div className="bg-[#E6E8FF] p-8 rounded-2xl">
                <h3 className="text-2xl font-medium mb-4">Visit Our Office</h3>
                <p className="text-gray-600 mb-2">123 Wonder Way, Suite 100</p>
                <p className="text-gray-600 mb-4">San Francisco, CA 94104</p>
                <p className="text-gray-600">Mon-Fri: 9am - 6pm PT</p>
                <p className="text-gray-600">Sat: 10am - 4pm PT</p>
              </div>
              
              <div className="bg-[#F4D374] bg-opacity-30 p-8 rounded-2xl">
                <h3 className="text-2xl font-medium mb-4">Contact Information</h3>
                <p className="text-gray-600 mb-2">General Inquiries: info@wonderhealth.com</p>
                <p className="text-gray-600 mb-2">Support: support@wonderhealth.com</p>
                <p className="text-gray-600 mb-4">Partnerships: partners@wonderhealth.com</p>
                <p className="text-gray-600">Phone: (800) 123-4567</p>
              </div>
              
              <div className="bg-[#BED1AB] bg-opacity-30 p-8 rounded-2xl">
                <h3 className="text-2xl font-medium mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
