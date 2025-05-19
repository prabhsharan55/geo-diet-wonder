
import { Search, PlusCircle, Upload, Video, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerLayout from "@/components/partner/PartnerLayout";

const ContentManagement = () => {
  const videos = [
    { id: 1, title: "Getting Started with GeoDiet", category: "Onboarding", uploaded: "Feb 15, 2023", duration: "5:23", views: 145, access: "All Clients" },
    { id: 2, title: "Understanding Your CGM Data", category: "Education", uploaded: "Jan 28, 2023", duration: "8:17", views: 98, access: "Restricted" },
    { id: 3, title: "Weekly Meal Prep Guide", category: "Nutrition", uploaded: "Feb 10, 2023", duration: "12:45", views: 76, access: "All Clients" },
    { id: 4, title: "Low-Impact Morning Workout", category: "Fitness", uploaded: "Feb 5, 2023", duration: "18:30", views: 56, access: "All Clients" },
    { id: 5, title: "Stress Management Techniques", category: "Wellness", uploaded: "Jan 20, 2023", duration: "9:12", views: 87, access: "All Clients" },
  ];
  
  const articles = [
    { id: 1, title: "The Science Behind Glucose Spikes", category: "Education", uploaded: "Feb 18, 2023", readTime: "5 min", views: 234, access: "All Clients" },
    { id: 2, title: "Season Eating: Spring Produce Guide", category: "Nutrition", uploaded: "Feb 12, 2023", readTime: "3 min", views: 156, access: "All Clients" },
    { id: 3, title: "Sleep and Metabolic Health", category: "Wellness", uploaded: "Feb 8, 2023", readTime: "7 min", views: 189, access: "Restricted" },
  ];

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Video & Content Management</h2>
          <div className="mt-4 md:mt-0">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Upload New Content
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="videos">
          <TabsList className="grid w-full md:w-auto grid-cols-2 mb-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos">
            <Card>
              <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search videos by title or category..."
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-1" /> Filter
                  </Button>
                  <Button>
                    <Upload className="h-4 w-4 mr-1" /> Upload Video
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {videos.map((video) => (
                      <tr key={video.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-14 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                              <Video className="h-4 w-4" />
                            </div>
                            <div className="ml-3">{video.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{video.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{video.uploaded}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{video.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{video.views}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${video.access === 'All Clients' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {video.access}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">Permissions</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">Showing 5 of 12 videos</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="articles">
            <Card>
              <div className="p-4 bg-white border-b flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search articles by title or category..."
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-1" /> Filter
                  </Button>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Article
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Read Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-14 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="ml-3">{article.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{article.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{article.uploaded}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{article.readTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{article.views}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${article.access === 'All Clients' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {article.access}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">Permissions</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">Showing 3 of 8 articles</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PartnerLayout>
  );
};

export default ContentManagement;
