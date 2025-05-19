
import React from "react";
import { useParams, Link } from "react-router-dom";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, User, Tag } from "lucide-react";
import { articleData } from "./journalData";

const ArticleDetail = () => {
  const { id } = useParams();
  const articleId = parseInt(id || "1");
  
  // Find the article with the matching ID
  const article = articleData.find(article => article.id === articleId) || articleData[0];
  
  // Get related articles (excluding the current one)
  const relatedArticles = articleData
    .filter(item => item.id !== articleId)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumb navigation */}
        <nav className="flex mb-8 text-sm">
          <ol className="flex items-center flex-wrap">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-[#3A2D70]">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/journal" className="text-gray-500 hover:text-[#3A2D70]">Journal</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-[#3A2D70] font-medium truncate max-w-[200px] sm:max-w-xs">
              {article.title}
            </li>
          </ol>
        </nav>
        
        {/* Article header */}
        <header className="mb-8">
          <div className="inline-block bg-[#F4D374] text-[#102F32] px-4 py-1 rounded-full text-sm font-medium mb-4">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6">{article.title}</h1>
          
          {/* Article metadata */}
          <div className="flex flex-wrap items-center text-gray-500 gap-6">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-2" />
              <span>{article.category}</span>
            </div>
          </div>
        </header>
        
        {/* Featured image */}
        <div className="mb-10">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-xl font-medium mb-6">{article.preview}</p>
          
          <h2>Understanding the Connection</h2>
          <p>
            Modern research increasingly shows the profound connection between our diet and various aspects of health. 
            The foods we eat don't just provide calories—they contain information that communicates with our genes, 
            influencing how they express themselves and ultimately affecting our health outcomes.
          </p>
          
          <p>
            When we monitor our glucose levels using continuous glucose monitoring (CGM) technology, we can observe in real-time 
            how different foods affect our metabolism. This data-driven approach to nutrition allows for truly personalized 
            dietary recommendations based on your unique physiological responses.
          </p>
          
          <h2>Key Findings from Recent Research</h2>
          <p>
            Several groundbreaking studies have shown that personalized nutrition approaches based on glucose monitoring 
            can lead to improved health outcomes compared to one-size-fits-all diet plans. Here are some of the key insights:
          </p>
          
          <ul>
            <li>Individual glucose responses to identical foods can vary dramatically between people</li>
            <li>Meal timing and food combinations can significantly impact glucose patterns</li>
            <li>Physical activity before or after meals modifies glucose response</li>
            <li>Sleep quality directly affects metabolic health and glucose regulation</li>
            <li>Stress management techniques can improve insulin sensitivity</li>
          </ul>
          
          <h2>Practical Applications</h2>
          <p>
            By understanding your personal glucose patterns, you can make informed decisions about:
          </p>
          
          <ul>
            <li>Which specific foods work best for your metabolism</li>
            <li>Optimal meal timing for your daily schedule</li>
            <li>The most effective types of exercise for your metabolic health</li>
            <li>How to combine foods to minimize glucose spikes</li>
            <li>Strategies for improving your metabolic flexibility</li>
          </ul>
          
          <blockquote>
            "The future of nutrition isn't about broad dietary labels like 'vegan' or 'keto'—it's about understanding 
            your unique physiological responses and creating a personalized approach that works specifically for your body."
          </blockquote>
          
          <h2>Getting Started with Personalized Nutrition</h2>
          <p>
            If you're interested in exploring how your body responds to different foods and lifestyle factors, 
            consider trying our CGM monitoring program. With continuous data and expert analysis, you can develop 
            a truly personalized approach to nutrition that optimizes your health outcomes.
          </p>
          
          <div className="bg-[#F9F9FF] p-6 rounded-xl my-8">
            <h3 className="text-xl font-medium mb-2">Ready to discover your personal nutrition code?</h3>
            <p className="mb-4">
              Our CGM starter kit includes everything you need to begin understanding your unique metabolic patterns.
            </p>
            <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full">
              Learn More About CGM
            </Button>
          </div>
        </div>
        
        {/* Author bio */}
        <div className="bg-[#F9F9FF] p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center mb-16">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
            alt="Author" 
            className="w-24 h-24 object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-medium mb-2">{article.author}</h3>
            <p className="text-gray-600 mb-3">Nutritional Research Specialist at GeoDiet</p>
            <p>
              With over 10 years of experience in nutritional science research, specializing in the relationship between food, 
              glucose regulation, and overall metabolic health. Passionate about making evidence-based nutrition accessible to everyone.
            </p>
          </div>
        </div>
        
        {/* Related articles */}
        <section>
          <h2 className="text-2xl md:text-3xl font-medium mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(article => (
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
                  <h3 className="text-xl font-medium mb-2">{article.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{article.preview}</p>
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
