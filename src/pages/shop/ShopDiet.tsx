
import React from "react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ShopDiet = () => {
  const dietPlans = [
    {
      id: 1,
      name: "Metabolic Reset Plan",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "A 28-day meal plan designed to reset your metabolism and optimize glucose levels.",
      featured: false
    },
    {
      id: 2,
      name: "Low Glycemic Meal Plan",
      price: "$59.99",
      image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Focus on foods that promote stable blood sugar with this 21-day comprehensive plan.",
      featured: true
    },
    {
      id: 3,
      name: "Plant-Based Glucose Balance",
      price: "$69.99",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "A fully plant-based 30-day plan optimized for steady glucose levels and abundant nutrition.",
      featured: false
    },
    {
      id: 4,
      name: "Athletic Performance Diet",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Meal plans designed for athletes looking to optimize performance and recovery through nutrition.",
      featured: false
    },
    {
      id: 5,
      name: "Family-Friendly Metabolic Health",
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Meal plans for the whole family that focus on optimal nutrition and stable glucose levels.",
      featured: false
    },
    {
      id: 6,
      name: "Personalized CGM Diet Plan",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "A customized meal plan based on your personal CGM data. Requires 2 weeks of CGM monitoring.",
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">Diet Plans</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Scientifically designed nutrition plans to optimize your metabolic health and energy levels
          </p>
        </div>
        
        <div className="bg-[#F9F9FF] p-6 md:p-10 rounded-2xl mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Nutrition Tailored to Your Biology</h2>
              <p className="text-gray-700 mb-6">
                At GeoDiet, we understand that nutrition isn't one-size-fits-all. Our diet plans are designed to work 
                with your body's unique responses, especially when paired with our CGM monitoring.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3A2D70] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Recipes optimized for stable glucose levels</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3A2D70] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Meal timing strategies for optimal energy</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3A2D70] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ingredient combinations that improve metabolic health</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3A2D70] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalization options based on your preferences</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Healthy meal preparation" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {dietPlans.map(plan => (
            <Card key={plan.id} className={`overflow-hidden flex flex-col ${plan.featured ? 'border-2 border-[#3A2D70]' : ''}`}>
              <div className="relative">
                <img 
                  src={plan.image} 
                  alt={plan.name} 
                  className="w-full h-48 object-cover"
                />
                {plan.featured && (
                  <div className="absolute top-4 right-4 bg-[#3A2D70] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
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
        
        <section className="bg-[#E6E8FF] p-6 md:p-10 rounded-2xl text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">What's Included in Each Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#3A2D70] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Complete Meal Plans</h3>
              <p className="text-gray-600">Detailed daily meal plans with full recipes and shopping lists.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#3A2D70] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Meal Timing Guide</h3>
              <p className="text-gray-600">Learn when to eat for optimal glucose response and energy levels.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#3A2D70] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Nutritional Insights</h3>
              <p className="text-gray-600">Understand the science behind each meal's metabolic impact.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#3A2D70] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">App Integration</h3>
              <p className="text-gray-600">All plans integrate with the GeoDiet app for CGM data correlation.</p>
            </div>
          </div>
        </section>
        
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Get the Ultimate Nutrition Package</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Combine any diet plan with our CGM monitoring for truly personalized nutrition.
          </p>
          <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full px-8 py-6 text-lg">
            View Bundle Offers
          </Button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopDiet;
