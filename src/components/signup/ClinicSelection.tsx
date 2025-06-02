
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Users, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Clinic = {
  id: string;
  name: string;
  address: string;
  region: string;
  owner_email: string;
};

type ClinicSelectionProps = {
  onSelectClinic: (clinicId: string) => void;
};

const ClinicSelection = ({ onSelectClinic }: ClinicSelectionProps) => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        // Only fetch clinics that correspond to approved partner applications
        const { data, error } = await supabase
          .from('clinics')
          .select('*')
          .order('name');

        if (error) throw error;
        
        setClinics(data || []);
      } catch (error) {
        console.error('Error fetching clinics:', error);
        toast.error('Failed to load clinics');
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const handleContinue = () => {
    if (!selectedClinic) {
      toast.error('Please select a clinic');
      return;
    }
    onSelectClinic(selectedClinic);
  };

  const selectedClinicData = clinics.find(c => c.id === selectedClinic);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading clinics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Clinic</h2>
        <p className="text-gray-600">Select the clinic or partner you want to work with</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="clinic-select">Select Clinic/Partner</Label>
          <Select value={selectedClinic} onValueChange={setSelectedClinic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a clinic..." />
            </SelectTrigger>
            <SelectContent>
              {clinics.map((clinic) => (
                <SelectItem key={clinic.id} value={clinic.id}>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{clinic.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedClinicData && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span>{selectedClinicData.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedClinicData.address}</span>
                </div>
                <div className="text-gray-600">
                  <strong>Region:</strong> {selectedClinicData.region}
                </div>
                <div className="text-gray-600">
                  <strong>Contact:</strong> {selectedClinicData.owner_email}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {clinics.length === 0 && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Building2 className="h-12 w-12 mx-auto text-yellow-600 mb-2" />
                <h3 className="font-medium text-yellow-800">No Clinics Available Yet</h3>
                <p className="text-sm text-yellow-600 mt-1 mb-4">
                  No approved partner clinics are currently available for signup.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-yellow-700">
                    Are you a healthcare professional interested in becoming a partner?
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = '/partner-signup'}
                    className="border-yellow-400 text-yellow-800 hover:bg-yellow-100"
                  >
                    Apply to Become a Partner
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleContinue}
          disabled={!selectedClinic || clinics.length === 0}
          className="w-full max-w-sm"
        >
          Continue with Selected Clinic
        </Button>
      </div>
    </div>
  );
};

export default ClinicSelection;
