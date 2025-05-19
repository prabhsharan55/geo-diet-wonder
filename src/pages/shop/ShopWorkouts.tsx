
import React from "react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ShopWorkouts = () => {
  const workoutPlans = [
    {
      id: 1,
      name: "Metabolic Health Foundations",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Our foundational 8-week workout program designed to optimize your metabolic health and energy levels.",
      level: "Beginner"
    },
    {
      id: 2,
      name: "Strength & Glucose Balance",
      price: "$59.99",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Build strength while maintaining optimal blood glucose levels with this 10-week progressive program.",
      level: "Intermediate"
    },
    {
      id: 3,
      name: "HIIT for Metabolic Flexibility",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "High-intensity interval training designed to improve your body's ability to switch between fuel sources.",
      level: "Advanced"
    },
    {
      id: 4,
      name: "Yoga for Glucose Regulation",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "A gentle yoga program that helps reduce stress and improve insulin sensitivity through mindful movement.",
      level: "All Levels"
    },
    {
      id: 5,
      name: "CGM-Guided Endurance Training",
      price: "$69.99",
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Optimize your endurance training with workouts tailored to your personal glucose response patterns.",
      level: "Intermediate to Advanced"
    },
    {
      id: 6,
      name: "At-Home Metabolism Booster",
      price: "$45.99",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "A no-equipment workout program designed to elevate your metabolic rate and improve glucose utilization.",
      level: "All Levels"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">Workout Programs</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Exercise routines optimized for metabolic health and designed to work with your CGM data
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {workoutPlans.map(plan => (
            <Card key={plan.id} className="overflow-hidden flex flex-col">
              <div className="relative">
                <img 
                  src={plan.image} 
                  alt={plan.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#BED1AB] text-[#102F32] px-4 py-1 rounded-full text-sm font-medium">
                  {plan.level}
                </div>
              </div>
              <CardContent className="pt-6 flex-1">
                <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
              </CardContent>
              <CardFooter className="border-t border-gray-100 p-6 flex justify-between items-center">
                <span className="text-xl font-medium">{plan.price}</span>
                <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="bg-[#F9F9FF] p-6 md:p-10 rounded-2xl mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center">The GeoDiet Workout Advantage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#3A2D70] rounded-full flex-shrink-0 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Data-Driven Workouts</h3>
                <p className="text-gray-600">All our workout programs are designed to work in harmony with your CGM data, optimizing both performance and metabolic health.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#3A2D70] rounded-full flex-shrink-0 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Timing Optimization</h3>
                <p className="text-gray-600">Learn the optimal times to exercise based on your personal glucose patterns for maximum fat burning and energy.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#3A2D70] rounded-full flex-shrink-0 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Expert Instruction</h3>
                <p className="text-gray-600">Each program includes videos from certified trainers who understand the connection between exercise and metabolic health.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#3A2D70] rounded-full flex-shrink-0 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">App Integration</h3>
                <p className="text-gray-600">All workouts seamlessly integrate with the GeoDiet app, allowing you to track your progress alongside your glucose data.</p>
              </div>
            </div>
          </div>
        </div>
        
        <section className="bg-[#E6E8FF] p-6 md:p-10 rounded-2xl text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Bundle & Save</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-4 justify-center">
            <Card className="w-full md:w-1/3 text-center">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">Beginner Bundle</h3>
                <div className="text-3xl font-bold my-4">$89.99</div>
                <p className="text-gray-600 mb-4">Save 25% when you bundle the Foundations & Yoga programs</p>
                <Button className="w-full bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
            
            <Card className="w-full md:w-1/3 text-center border-2 border-[#3A2D70]">
              <CardContent className="p-6">
                <div className="bg-[#3A2D70] text-white py-1 px-4 rounded-full text-sm font-medium inline-block mb-2">BEST VALUE</div>
                <h3 className="text-xl font-medium mb-2">Complete Package</h3>
                <div className="text-3xl font-bold my-4">$199.99</div>
                <p className="text-gray-600 mb-4">All workout programs plus nutrition guidance and 1 month of CGM</p>
                <Button className="w-full bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
            
            <Card className="w-full md:w-1/3 text-center">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">Advanced Bundle</h3>
                <div className="text-3xl font-bold my-4">$109.99</div>
                <p className="text-gray-600 mb-4">Save 30% on our HIIT and Strength programs bundle</p>
                <Button className="w-full bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopWorkouts;
