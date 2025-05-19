
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
import { Input } from "@/components/ui/input";
import { Search, FileSpreadsheet } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const CustomersPage = () => {
  const customers = [
    {
      id: 1,
      name: "Emma Johnson",
      email: "emma.j@example.com",
      package: "GeoDiet + CGM",
      partner: "Wellness Clinic SF",
      startDate: "Apr 12, 2025",
      status: "active",
    },
    {
      id: 2,
      name: "Marcus Chen",
      email: "mchen@example.com",
      package: "Workout Only",
      partner: "Health First Center",
      startDate: "Mar 25, 2025",
      status: "active",
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      email: "sofia.r@example.com",
      package: "GeoDiet + CGM",
      partner: "Nutrition Hub",
      startDate: "Feb 18, 2025",
      status: "expiring",
    },
    {
      id: 4,
      name: "James Wilson",
      email: "jawilson@example.com",
      package: "CGM Only",
      partner: "Vitality Clinic",
      startDate: "Jan 05, 2025",
      status: "frozen",
    },
    {
      id: 5,
      name: "Aisha Patel",
      email: "aisha.p@example.com",
      package: "GeoDiet + CGM",
      partner: "Balance Health",
      startDate: "Mar 30, 2025",
      status: "expired",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customer Management</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search customers..."
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="whitespace-nowrap">Filter</Button>
                <Button variant="outline" className="whitespace-nowrap">Clear</Button>
              </div>
            </div>
          </div>
          
          <Table>
            <TableCaption>A list of all customers.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Partner/Clinic</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.package}</TableCell>
                  <TableCell>{customer.partner}</TableCell>
                  <TableCell>{customer.startDate}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        customer.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : customer.status === "expiring"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : customer.status === "frozen"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">View Details</Button>
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

export default CustomersPage;
