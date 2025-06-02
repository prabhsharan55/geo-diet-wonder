
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, TrendingUp } from "lucide-react";

const PartnerCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Are You a Healthcare Professional?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our partner network and help your clients achieve their health goals with GeoDiet's personalized nutrition platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Building2 className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expand Your Practice</h3>
              <p className="text-gray-600">
                Offer cutting-edge nutrition coaching to enhance your existing services
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Manage Clients Easily</h3>
              <p className="text-gray-600">
                Track progress, create meal plans, and communicate with clients through our platform
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Increase Revenue</h3>
              <p className="text-gray-600">
                Add a new revenue stream while providing exceptional value to your patients
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/partner-signup'}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            Become a Partner Today
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Apply now and start helping clients within days
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;
