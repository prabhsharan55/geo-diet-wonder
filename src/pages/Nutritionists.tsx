
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const Nutritionists = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const nutritionists = [
    {
      id: 1,
      name: "Dr. Emma Wilson",
      specialty: "Weight Management",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Certified nutritionist with 10+ years of experience in weight management and metabolic health."
    },
    {
      id: 2,
      name: "Michael Chen, RD",
      specialty: "Sports Nutrition",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Specializes in nutrition for athletes and active individuals. Former nutritionist for Olympic athletes."
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Diabetes Management",
      image: "https://images.unsplash.com/photo-1571442463800-1337d7af9d2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Expert in diabetes management through nutrition. Published researcher in CGM applications."
    },
    {
      id: 4,
      name: "Robert Patel, MS",
      specialty: "Gut Health",
      image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Focuses on gut microbiome health and its connection to overall wellness and immune function."
    },
    {
      id: 5,
      name: "Dr. Lisa Murphy",
      specialty: "Prenatal Nutrition",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
      bio: "Specialized in nutrition during pregnancy and postpartum. Certified lactation consultant."
    },
    {
      id: 6,
      name: "James Taylor, RD",
      specialty: "Plant-Based Nutrition",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Expert in plant-based nutrition for optimal health. Author of two bestselling nutrition books."
    }
  ];

  const filteredNutritionists = nutritionists.filter(nutritionist => 
    nutritionist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    nutritionist.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">Find Your Nutritionist</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Connect with expert nutritionists who specialize in your unique health needs</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search by name or specialty..." 
                className="pl-10 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2 bg-[#3A2D70] hover:bg-[#2A1D60] rounded-full w-full sm:w-auto">
              <Filter size={18} />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredNutritionists.map(nutritionist => (
            <Card key={nutritionist.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 md:h-72">
                <img 
                  src={nutritionist.image} 
                  alt={nutritionist.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#BED1AB] text-[#102F32] px-4 py-1 rounded-full text-sm font-medium">
                  {nutritionist.specialty}
                </div>
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl md:text-2xl font-medium mb-2">{nutritionist.name}</h2>
                <p className="text-gray-600 mb-4">{nutritionist.bio}</p>
                <Button 
                  className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full w-full"
                  onClick={() => navigate(`/nutritionists/${nutritionist.id}`)}
                >
                  Book a Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNutritionists.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl text-gray-700">No nutritionists found matching your search criteria.</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or browse all nutritionists.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Nutritionists;
