
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Journal = () => {
  const articles = [
    {
      id: 1,
      title: "Understanding Blood Glucose Patterns",
      category: "CGM Guide",
      image: "https://placehold.co/800x500",
      preview: "Learn how to interpret your CGM data to make informed decisions about diet and exercise.",
      date: "May 16, 2025"
    },
    {
      id: 2,
      title: "The Science Behind Exercise and Metabolism",
      category: "Fitness",
      image: "https://placehold.co/800x500",
      preview: "Discover how different types of exercise affect your metabolic rate and overall health.",
      date: "May 12, 2025"
    },
    {
      id: 3,
      title: "Nutrition Myths Debunked by Science",
      category: "Nutrition",
      image: "https://placehold.co/800x500",
      preview: "Our expert nutritionists separate fact from fiction regarding popular nutrition claims.",
      date: "May 8, 2025"
    },
    {
      id: 4,
      title: "Sleep Quality and Its Impact on Weight Management",
      category: "Wellness",
      image: "https://placehold.co/800x500",
      preview: "How your sleep patterns affect hormone regulation and weight management efforts.",
      date: "May 5, 2025"
    },
    {
      id: 5,
      title: "Client Success Story: Jane's Journey to Metabolic Health",
      category: "Success Stories",
      image: "https://placehold.co/800x500",
      preview: "Read about Jane's remarkable transformation and improved health metrics in just 90 days.",
      date: "April 30, 2025"
    },
    {
      id: 6,
      title: "The Connection Between Gut Health and Immunity",
      category: "Health Research",
      image: "https://placehold.co/800x500",
      preview: "New research reveals how your gut microbiome influences your immune system.",
      date: "April 25, 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-medium text-center mb-4">Wonder Journal</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Evidence-based articles to support your health journey</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
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
                <h2 className="text-2xl font-medium mb-2">{article.title}</h2>
                <p className="text-gray-600">{article.preview}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full rounded-full">
                  Read Article
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Journal;
