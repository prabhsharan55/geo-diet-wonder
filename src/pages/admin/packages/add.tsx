
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "@/components/admin/AdminLayout";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

const AddPackagePage = () => {
  const [features, setFeatures] = useState<string[]>([""]);

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create New Package</h1>
          <p className="text-gray-500">Define a new subscription package for customers</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Package Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Package Name</Label>
                <Input id="name" placeholder="Enter package name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter package description" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4weeks">4 weeks</SelectItem>
                      <SelectItem value="8weeks">8 weeks</SelectItem>
                      <SelectItem value="12weeks">12 weeks</SelectItem>
                      <SelectItem value="16weeks">16 weeks</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Package Type</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="type-geodiet-cgm"
                      name="packageType"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="type-geodiet-cgm"
                      className="text-sm font-medium"
                    >
                      GeoDiet + CGM
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="type-cgm"
                      name="packageType"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="type-cgm"
                      className="text-sm font-medium"
                    >
                      CGM Only
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="type-workout"
                      name="packageType"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="type-workout"
                      className="text-sm font-medium"
                    >
                      Workout Only
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="features">Features</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Enter feature"
                        className="flex-1"
                      />
                      {features.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFeature(index)}
                        >
                          <MinusCircle className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Active Package</Label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
            <Button variant="outline">Cancel</Button>
            <Button>Create Package</Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddPackagePage;
