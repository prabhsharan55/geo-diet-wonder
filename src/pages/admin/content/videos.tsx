
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, Play, PlusCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/admin/AdminLayout";

const VideosPage = () => {
  const videos = [
    {
      id: 1,
      title: "Introduction to Glucose Monitoring",
      category: "CGM",
      duration: "12:45",
      visibility: "public",
      status: "published",
      uploadDate: "Apr 15, 2025",
    },
    {
      id: 2,
      title: "Nutrition Basics for Weight Management",
      category: "Nutrition",
      duration: "24:10",
      visibility: "partner",
      status: "published",
      uploadDate: "Apr 12, 2025",
    },
    {
      id: 3,
      title: "Advanced CGM Data Analysis",
      category: "CGM",
      duration: "18:32",
      visibility: "customer",
      status: "published",
      uploadDate: "Apr 10, 2025",
    },
    {
      id: 4,
      title: "HIIT Workout for Beginners",
      category: "Workout",
      duration: "32:15",
      visibility: "public",
      status: "draft",
      uploadDate: "Apr 5, 2025",
    },
    {
      id: 5,
      title: "Meal Prep for Busy Professionals",
      category: "Lifestyle",
      duration: "27:08",
      visibility: "partner",
      status: "published",
      uploadDate: "Mar 28, 2025",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Video Management</h1>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Filter Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Input placeholder="Search videos..." />
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="cgm">CGM</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="workout">Workout</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Visibility</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="partner">Partner Only</SelectItem>
                    <SelectItem value="customer">Customer Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableCaption>A list of all uploaded videos.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.category}</TableCell>
                  <TableCell>{video.duration}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        video.visibility === "public"
                          ? "border-green-500 text-green-700"
                          : video.visibility === "partner"
                          ? "border-blue-500 text-blue-700"
                          : "border-purple-500 text-purple-700"
                      }
                    >
                      {video.visibility}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        video.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {video.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{video.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" title="Preview">
                        <Play className="h-4 w-4" />
                      </Button>
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default VideosPage;
