
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
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Eye, Trash2, PlusCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: "The Impact of Continuous Glucose Monitoring on Weight Loss",
      author: "Dr. Sarah Chen",
      category: "Weight Loss",
      status: "published",
      date: "Apr 18, 2025",
      views: 1254,
    },
    {
      id: 2,
      title: "Understanding Metabolic Health Through CGM Data",
      author: "James Wilson, PhD",
      category: "Health Science",
      status: "published",
      date: "Apr 10, 2025",
      views: 876,
    },
    {
      id: 3,
      title: "5 Nutrition Myths Debunked by Science",
      author: "Dr. Maria Rodriguez",
      category: "Nutrition",
      status: "scheduled",
      date: "Apr 22, 2025",
      views: 0,
    },
    {
      id: 4,
      title: "How to Read Your CGM Data for Optimal Performance",
      author: "Alex Johnson",
      category: "Performance",
      status: "draft",
      date: "---",
      views: 0,
    },
    {
      id: 5,
      title: "The Connection Between Sleep and Blood Sugar Levels",
      author: "Dr. Sarah Chen",
      category: "Sleep Health",
      status: "published",
      date: "Mar 30, 2025",
      views: 2341,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">32</div>
              <div className="text-sm text-gray-500">Total Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">28</div>
              <div className="text-sm text-gray-500">Published</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-gray-500">Drafts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">45.2K</div>
              <div className="text-sm text-gray-500">Total Views</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableCaption>A list of all blog posts.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        post.status === "published"
                          ? "bg-green-100 text-green-800"
                          : post.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>{post.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {post.status !== "draft" && (
                        <Button size="icon" variant="ghost" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
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

export default BlogPage;
