
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Edit, MapPin, Plus, Trash2, Upload } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const PartnerLocatorPage = () => {
  const locations = [
    {
      id: 1,
      name: "Wellness Clinic SF",
      address: "123 Market St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      phone: "(415) 555-1234",
    },
    {
      id: 2,
      name: "Health First Center",
      address: "456 Wilshire Blvd",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90010",
      phone: "(213) 555-5678",
    },
    {
      id: 3,
      name: "Nutrition Hub",
      address: "789 Broadway",
      city: "New York",
      state: "NY",
      zipCode: "10003",
      phone: "(212) 555-9012",
    },
    {
      id: 4,
      name: "Vitality Clinic",
      address: "321 Michigan Ave",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      phone: "(312) 555-3456",
    },
    {
      id: 5,
      name: "Balance Health",
      address: "654 Collins Ave",
      city: "Miami",
      state: "FL",
      zipCode: "33139",
      phone: "(305) 555-7890",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Partner Locator</h1>
            <p className="text-gray-500">Manage partner clinic locations on the map</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Partner Location Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3] bg-gray-100 rounded-md flex items-center justify-center border">
                <div className="text-center p-6">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
                  <p className="text-gray-500">Map integration would be displayed here showing all partner locations.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input placeholder="Enter zip code or city" />
                </div>
                <div className="flex justify-center">
                  <Button>Find Nearest Partner</Button>
                </div>
                <div className="bg-gray-100 rounded-md p-4">
                  <p className="text-center text-gray-500">Search results will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>All Partner Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of all partner clinic locations.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Zip Code</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>{location.address}</TableCell>
                    <TableCell>{location.city}</TableCell>
                    <TableCell>{location.state}</TableCell>
                    <TableCell>{location.zipCode}</TableCell>
                    <TableCell>{location.phone}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PartnerLocatorPage;
