
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
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const PartnersPage = () => {
  const partners = [
    {
      id: 1,
      name: "Wellness Clinic SF",
      email: "wellness@clinic.com",
      region: "San Francisco, CA",
      status: "active",
      packages: ["Premium", "Basic"],
    },
    {
      id: 2,
      name: "Health First Center",
      email: "info@healthfirst.com",
      region: "Los Angeles, CA",
      status: "active",
      packages: ["Premium"],
    },
    {
      id: 3,
      name: "Nutrition Hub",
      email: "hello@nutritionhub.com",
      region: "New York, NY",
      status: "pending",
      packages: ["Basic"],
    },
    {
      id: 4,
      name: "Vitality Clinic",
      email: "contact@vitalityclinic.com",
      region: "Chicago, IL",
      status: "inactive",
      packages: ["Premium", "Extended"],
    },
    {
      id: 5,
      name: "Balance Health",
      email: "info@balance.com",
      region: "Miami, FL",
      status: "active",
      packages: ["Basic", "Standard"],
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Partner Management</h1>
          <Button>
            Add New Partner
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableCaption>A list of all partners and clinics.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Packages</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.region}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        partner.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : partner.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {partner.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {partner.packages.map((pkg) => (
                        <Badge key={pkg} variant="outline">
                          {pkg}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {partner.status === "active" ? (
                        <Button size="icon" variant="ghost" title="Deactivate">
                          <UserX className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="icon" variant="ghost" title="Activate">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="icon" variant="ghost" title="Edit">
                        <Pencil className="h-4 w-4" />
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default PartnersPage;
