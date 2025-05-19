
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";

const PartnersMapPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Partner Map Locator</h1>
          <p className="text-gray-500">Geographic distribution of partner clinics</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Partner Location Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[16/9] bg-gray-100 rounded-md flex items-center justify-center border">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
                <p className="text-gray-500">Map integration would be displayed here showing all partner locations.</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Partner Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="text-2xl font-bold">32</div>
                  <div className="text-sm text-gray-500">West Coast</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="text-2xl font-bold">28</div>
                  <div className="text-sm text-gray-500">East Coast</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-gray-500">Midwest</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-gray-500">South</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PartnersMapPage;
