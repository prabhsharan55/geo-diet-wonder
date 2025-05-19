
import React from "react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ShopCGM = () => {
  const products = [
    {
      id: 1,
      name: "GeoDiet CGM Starter Kit",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Everything you need to start monitoring your glucose levels. Includes 2 sensors and access to our app."
    },
    {
      id: 2,
      name: "CGM Sensor 4-Pack",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Four-week supply of CGM sensors. Compatible with our GeoDiet app for seamless data tracking."
    },
    {
      id: 3,
      name: "Premium CGM Subscription",
      price: "$149.99/month",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Monthly delivery of sensors plus premium app features and weekly nutritionist consultations."
    },
    {
      id: 4,
      name: "CGM Adhesive Patches",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Hypoallergenic adhesive patches to secure your CGM sensor during activities and showers."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">CGM Monitoring Products</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Track your body's response to food in real time with our cutting-edge Continuous Glucose Monitoring solutions
          </p>
        </div>

        <div className="bg-[#F9F9FF] p-6 md:p-10 rounded-2xl mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Why Use CGM?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3A2D70] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalized nutrition insights based on your body's actual response to foods</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3A2D70] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Avoid glucose spikes and crashes that affect your energy and mood</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3A2D70] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Understand which foods are best for your unique metabolism</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3A2D70] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Optimize your diet for weight management and overall health</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1640622842008-1897f26aafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="CGM Device" 
                className="rounded-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden flex flex-col">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="pt-6 flex-1">
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
              </CardContent>
              <CardFooter className="border-t border-gray-100 p-6 flex justify-between items-center">
                <span className="text-xl font-medium">{product.price}</span>
                <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <section className="bg-[#E6E8FF] p-6 md:p-10 rounded-2xl text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#3A2D70] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-medium mb-2">Apply Sensor</h3>
              <p className="text-gray-600">Easily apply the small sensor to your arm. Takes less than 5 minutes.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#3A2D70] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-medium mb-2">Connect App</h3>
              <p className="text-gray-600">Pair the sensor with our GeoDiet app to start seeing your glucose data.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#3A2D70] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-medium mb-2">Get Insights</h3>
              <p className="text-gray-600">Receive personalized recommendations based on your unique data.</p>
            </div>
          </div>
        </section>
        
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Ready to Transform Your Health?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Start your personalized nutrition journey today with GeoDiet CGM.
          </p>
          <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full px-8 py-6 text-lg">
            Get Started Now
          </Button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopCGM;
