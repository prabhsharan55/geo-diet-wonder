
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Clock, Play, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Videos = () => {
  const videoCategories = [
    { id: "nutrition", name: "Nutrition" },
    { id: "fitness", name: "Fitness" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "faq", name: "FAQs" }
  ];
  
  // Sample videos data
  const videos = [
    {
      id: 1,
      title: "Understanding Your Glucose Monitor",
      description: "Learn how to interpret your CGM data for better health insights.",
      duration: "12:45",
      category: "nutrition",
      thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "10-Minute Morning Workout",
      description: "Quick and effective exercises to kickstart your metabolism.",
      duration: "10:32",
      category: "fitness",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Low Glycemic Meal Prep",
      description: "Batch cooking for sustainable glucose control.",
      duration: "18:22",
      category: "nutrition",
      thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Managing Stress for Better Health",
      description: "Techniques to reduce stress and its impact on blood sugar.",
      duration: "14:51",
      category: "lifestyle",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Common CGM Questions Answered",
      description: "Our experts answer the most frequent questions about CGM devices.",
      duration: "22:10",
      category: "faq",
      thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&h=300&fit=crop"
    }
  ];
  
  // Filter function to get videos by category
  const getVideosByCategory = (category: string) => {
    if (category === "all") return videos;
    return videos.filter(video => video.category === category);
  };
  
  // Featured video is the first one marked as featured or the first video
  const featuredVideo = videos.find(video => video.featured) || videos[0];

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Video Library</h2>
          <p className="text-gray-500 mt-1">Watch educational content to support your health journey</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search videos..." className="pl-10" />
          </div>
        </div>
        
        <Card className="overflow-hidden">
          <div className="relative h-[280px] sm:h-[380px] bg-gray-800">
            <img 
              src={featuredVideo.thumbnail} 
              alt={featuredVideo.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#160041] px-3 py-1 rounded-full text-sm">Featured</span>
                <span className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredVideo.duration}
                </span>
              </div>
              <h3 className="text-2xl font-bold">{featuredVideo.title}</h3>
              <p className="text-gray-200 mb-4">{featuredVideo.description}</p>
              <div className="flex gap-2">
                <Button className="flex items-center gap-2 bg-white text-[#160041]">
                  <Play className="h-4 w-4" />
                  Watch Now
                </Button>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            {videoCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
            ))}
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVideosByCategory("all").map(video => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="outline" className="bg-white/70 hover:bg-white">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.description}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-2 shrink-0">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {videoCategories.map(category => (
            <TabsContent key={`content-${category.id}`} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getVideosByCategory(category.id).map(video => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="outline" className="bg-white/70 hover:bg-white">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium line-clamp-2">{video.title}</h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.description}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-2 shrink-0">
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
          
          <TabsContent value="saved" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No saved videos yet</h3>
              <p className="text-gray-500 mt-2">Videos you save will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No watch history yet</h3>
              <p className="text-gray-500 mt-2">Videos you watch will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default Videos;
