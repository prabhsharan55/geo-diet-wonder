
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";

const PackagesPage = () => {
  const packages = [
    {
      id: 1,
      name: "GeoDiet + CGM Complete",
      description: "Complete program with personalized diet plan and CGM monitoring",
      duration: "8 weeks",
      price: 599,
      status: "active",
      features: ["Personalized Diet Plan", "CGM Device & Support", "Weekly Check-ins", "Video Resources", "Mobile App Access"],
    },
    {
      id: 2,
      name: "CGM Only",
      description: "Continuous glucose monitoring package with support",
      duration: "4 weeks",
      price: 299,
      status: "active",
      features: ["CGM Device & Support", "Data Analysis", "Basic Diet Tips", "Mobile App Access"],
    },
    {
      id: 3,
      name: "Workout Program",
      description: "Specialized workout routines with coaching",
      duration: "12 weeks",
      price: 249,
      status: "active",
      features: ["Personalized Workout Plan", "Video Resources", "Progress Tracking", "Mobile App Access"],
    },
    {
      id: 4,
      name: "Premium Package",
      description: "All-inclusive health and nutrition program",
      duration: "12 weeks",
      price: 899,
      status: "inactive",
      features: ["Everything in Complete", "1-on-1 Coaching", "Premium Content Access", "Priority Support", "Extended Follow-up"],
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Package Management</h1>
          <Link to="/admin/packages/add">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Package
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>{pkg.name}</CardTitle>
                  <Badge
                    className={
                      pkg.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {pkg.status}
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm">{pkg.description}</p>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">{pkg.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="font-medium">${pkg.price}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-2">Features</div>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t py-3 gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PackagesPage;
