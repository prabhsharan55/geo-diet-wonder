
// @ts-nocheck

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ClinicSelectionProps {
  onSelectClinic: (partnerId: string) => void;
}

const ClinicSelection = ({ onSelectClinic }: ClinicSelectionProps) => {
  const [partners, setPartners] = useState<any[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      setLoading(true);
      try {
        // Get partners - cast result to any immediately
        const partnersResult = await supabase
          .from('users')
          .select('id, full_name, email')
          .eq('role', 'partner')
          .eq('approval_status', 'approved')
          .order('full_name');

        if (partnersResult.error) throw partnersResult.error;

        const partnersData = (partnersResult.data || []) as any[];
        const partnersWithClinics: any[] = [];
        
        for (const partner of partnersData) {
          const clinicResult = await supabase
            .from('clinics')
            .select('name, address, region')
            .eq('partner_id', partner.id)
            .single();

          partnersWithClinics.push({
            ...partner,
            clinic: clinicResult.data || undefined
          });
        }
        
        setPartners(partnersWithClinics);
      } catch (error: any) {
        console.error('Error fetching partners:', error);
        toast.error('Failed to load partners');
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  const handleContinue = () => {
    if (!selectedPartner) {
      toast.error('Please select a partner');
      return;
    }
    onSelectClinic(selectedPartner);
  };

  const selectedPartnerData = partners.find((p: any) => p.id === selectedPartner);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading partners...</p>
      </div>
    );
  }

  // Pre-render partner options
  const partnerOptions = partners.map((partner: any) => (
    <SelectItem key={partner.id} value={partner.id}>
      <div className="flex items-center space-x-2">
        <Building2 className="h-4 w-4" />
        <span>{partner.clinic?.name || partner.full_name}</span>
      </div>
    </SelectItem>
  ));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Partner</h2>
        <p className="text-gray-600">Select the healthcare partner you want to work with</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="partner-select">Select Healthcare Partner</Label>
          <Select value={selectedPartner} onValueChange={setSelectedPartner}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a partner..." />
            </SelectTrigger>
            <SelectContent>
              {partnerOptions}
            </SelectContent>
          </Select>
        </div>

        {selectedPartnerData && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span>{selectedPartnerData.clinic?.name || selectedPartnerData.full_name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {selectedPartnerData.clinic?.address && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedPartnerData.clinic.address}</span>
                  </div>
                )}
                {selectedPartnerData.clinic?.region && (
                  <div className="text-gray-600">
                    <strong>Region:</strong> {selectedPartnerData.clinic.region}
                  </div>
                )}
                <div className="text-gray-600">
                  <strong>Contact:</strong> {selectedPartnerData.email}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {partners.length === 0 && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Building2 className="h-12 w-12 mx-auto text-yellow-600 mb-2" />
                <h3 className="font-medium text-yellow-800">No Partners Available</h3>
                <p className="text-sm text-yellow-600 mt-1 mb-4">
                  No approved healthcare partners are currently available for signup.
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
          disabled={!selectedPartner || partners.length === 0}
          className="w-full max-w-sm"
        >
          Continue with Selected Partner
        </Button>
      </div>
    </div>
  );
};

export default ClinicSelection;
