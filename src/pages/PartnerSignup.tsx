
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Building2, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PartnerSignup = () => {
  const [formData, setFormData] = useState({
    clinicName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    zipCode: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, create the partner application
      const { error: applicationError } = await supabase
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

      if (applicationError) throw applicationError;

      // Create the user account with email confirmation
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.ownerName,
            role: 'partner'
          },
          emailRedirectTo: `${window.location.origin}/partner`
        }
      });

      if (authError) throw authError;

      // Update the user role to partner if user was created
      if (authData.user) {
        const { error: userError } = await supabase
          .from('users')
          .update({ role: 'partner' })
          .eq('id', authData.user.id);

        if (userError) {
          console.warn('Could not update user role:', userError);
        }
      }

      setSubmitted(true);
      toast.success("Application submitted successfully! Please check your email to confirm your account.");
      
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
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Application Submitted!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for applying to become a GeoDiet partner. We've sent a confirmation email to {formData.email}.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-left">
                    <h3 className="font-medium text-blue-900 mb-2">Next Steps:</h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>1. Check your email and click the confirmation link</li>
                      <li>2. Once confirmed, you can sign in to access your partner dashboard</li>
                      <li>3. We'll review your application within 2-3 business days</li>
                      <li>4. You'll receive an email notification once approved</li>
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={() => navigate('/auth')}
                      className="w-full"
                    >
                      Go to Sign In Page
                    </Button>
                  </div>
                </div>
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
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a secure password"
                      required
                      minLength={6}
                    />
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
                    <li>• You'll receive a confirmation email to verify your account</li>
                    <li>• After email verification, you can sign in to your dashboard</li>
                    <li>• We'll review your application within 2-3 business days</li>
                    <li>• Once approved, you can start adding clients and managing their health programs</li>
                  </ul>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Submitting Application..." : "Submit Application"}
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
