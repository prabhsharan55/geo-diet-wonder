
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Shop = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "CGM Starter Kit",
      price: "$199.99",
      image: "https://placehold.co/400x400",
      description: "Start monitoring your glucose levels with our easy-to-use CGM kit"
    },
    {
      id: 2,
      name: "Nutrition Guide Bundle",
      price: "$49.99",
      image: "https://placehold.co/400x400",
      description: "Complete nutrition guides tailored for different health goals"
    },
    {
      id: 3,
      name: "Workout Essentials Pack",
      price: "$79.99",
      image: "https://placehold.co/400x400",
      description: "Everything you need for effective home workouts"
    },
    {
      id: 4,
      name: "Wonder Water Bottle",
      price: "$24.99",
      image: "https://placehold.co/400x400",
      description: "Stay hydrated with our premium insulated water bottle"
    },
    {
      id: 5,
      name: "Health Tracking Journal",
      price: "$18.99", 
      image: "https://placehold.co/400x400",
      description: "Track your health journey with our specially designed journal"
    },
    {
      id: 6,
      name: "Premium Membership",
      price: "$149.99/year",
      image: "https://placehold.co/400x400",
      description: "Access all Wonder services with our premium annual membership"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-medium text-center mb-4">Wonder Shop</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Quality products to support your health journey</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover"
              />
              <CardContent className="pt-6">
                <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xl font-medium">{product.price}</span>
                <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full">
                  Add to Cart
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

export default Shop;
