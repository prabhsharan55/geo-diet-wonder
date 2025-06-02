
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

const PartnerSignup = () => {
  const [formData, setFormData] = useState({
    clinicName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    zipCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('partner_applications')
        .insert({
          clinic_name: formData.clinicName,
          owner_name: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          region: formData.region,
          zip_code: formData.zipCode
        });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Application submitted successfully! We'll review it within 2-3 business days.");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNavigation />
        <div className="container mx-auto py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <Building2 className="h-16 w-16 mx-auto text-green-600 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
                  <p className="text-gray-600">
                    Thank you for your interest in becoming a GeoDiet partner. 
                    We've received your application and will review it within 2-3 business days.
                  </p>
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>You'll receive an email notification once your application is reviewed.</p>
                  <p>If approved, you'll be able to access the partner dashboard and start managing clients.</p>
                </div>
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="mt-6"
                >
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container mx-auto py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Become a GeoDiet Partner</h1>
            <p className="text-gray-600">
              Join our network of healthcare professionals and help your clients achieve their health goals
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Partner Application</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic/Practice Name *</Label>
                    <Input
                      id="clinicName"
                      name="clinicName"
                      value={formData.clinicName}
                      onChange={handleInputChange}
                      placeholder="Your clinic name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner/Contact Name *</Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contact@yourclinic.com"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">City, State *</Label>
                    <Input
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      placeholder="San Francisco, CA"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="12345"
                      className="max-w-xs"
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• We'll review your application within 2-3 business days</li>
                    <li>• If approved, you'll receive login credentials and setup instructions</li>
                    <li>• You can then start adding clients and managing their health programs</li>
                  </ul>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnerSignup;
