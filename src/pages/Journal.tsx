
import React from "react";
import { Link } from "react-router-dom";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { articleData } from "./journal/journalData";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Journal = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  
  const categories = [...new Set(articleData.map(article => article.category))];
  
  const filteredArticles = React.useMemo(() => {
    return articleData.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.preview.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-4">GeoDiet Journal</h1>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Evidence-based articles to support your health journey
        </p>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <Card key={article.id} className="overflow-hidden flex flex-col">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#F4D374] text-[#102F32] px-4 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </div>
              </div>
              <CardContent className="pt-6 flex-1">
                <p className="text-gray-500 text-sm mb-2">{article.date}</p>
                <h2 className="text-xl font-medium mb-2">{article.title}</h2>
                <p className="text-gray-600">{article.preview}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/journal/${article.id}`} className="w-full">
                  <Button variant="outline" className="w-full rounded-full">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Journal;
