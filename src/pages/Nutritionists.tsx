
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Nutritionists = () => {
  const nutritionists = [
    {
      id: 1,
      name: "Dr. Emma Wilson",
      specialty: "Weight Management",
      image: "https://placehold.co/400x400",
      bio: "Certified nutritionist with 10+ years of experience in weight management and metabolic health."
    },
    {
      id: 2,
      name: "Michael Chen, RD",
      specialty: "Sports Nutrition",
      image: "https://placehold.co/400x400",
      bio: "Specializes in nutrition for athletes and active individuals. Former nutritionist for Olympic athletes."
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Diabetes Management",
      image: "https://placehold.co/400x400",
      bio: "Expert in diabetes management through nutrition. Published researcher in CGM applications."
    },
    {
      id: 4,
      name: "Robert Patel, MS",
      specialty: "Gut Health",
      image: "https://placehold.co/400x400",
      bio: "Focuses on gut microbiome health and its connection to overall wellness and immune function."
    },
    {
      id: 5,
      name: "Dr. Lisa Murphy",
      specialty: "Prenatal Nutrition",
      image: "https://placehold.co/400x400", 
      bio: "Specialized in nutrition during pregnancy and postpartum. Certified lactation consultant."
    },
    {
      id: 6,
      name: "James Taylor, RD",
      specialty: "Plant-Based Nutrition",
      image: "https://placehold.co/400x400",
      bio: "Expert in plant-based nutrition for optimal health. Author of two bestselling nutrition books."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-medium text-center mb-4">Meet Our Nutritionists</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Expert advice for your personalized health journey</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nutritionists.map(nutritionist => (
            <Card key={nutritionist.id} className="overflow-hidden">
              <div className="relative h-64">
                <img 
                  src={nutritionist.image} 
                  alt={nutritionist.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#BED1AB] text-[#102F32] px-4 py-1 rounded-full text-sm font-medium">
                  {nutritionist.specialty}
                </div>
              </div>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-medium mb-2">{nutritionist.name}</h2>
                <p className="text-gray-600 mb-4">{nutritionist.bio}</p>
                <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full w-full">
                  Book a Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Nutritionists;
