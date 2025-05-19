
import React from "react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NutritionistsBecome = () => {
  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-4">Become a GeoDiet Nutritionist</h1>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Join our network of nutrition experts and help clients achieve their health goals using our innovative tools and platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-[#E6E8FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#3A2D70]">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Apply Online</h3>
              <p className="text-gray-600">Complete our application form with your credentials, experience, and specialties.</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-[#E6E8FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#3A2D70]">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Verification</h3>
              <p className="text-gray-600">Our team will review your credentials and verify your professional experience.</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-[#E6E8FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#3A2D70]">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Start Practicing</h3>
              <p className="text-gray-600">Once approved, set up your profile and begin accepting client consultations.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-[#F9F9FF] rounded-2xl p-6 md:p-10 mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center">Why Join GeoDiet?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#BED1AB] rounded-full flex-shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#102F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Flexibility</h3>
                <p className="text-gray-600">Set your own schedule and work remotely from anywhere with our user-friendly platform.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#BED1AB] rounded-full flex-shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#102F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Growing Client Base</h3>
                <p className="text-gray-600">Access a growing community of clients seeking personalized nutrition guidance.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#BED1AB] rounded-full flex-shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#102F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Advanced Tools</h3>
                <p className="text-gray-600">Utilize our CGM data integration and analytics to provide data-driven nutrition advice.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#BED1AB] rounded-full flex-shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#102F32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Competitive Compensation</h3>
                <p className="text-gray-600">Earn competitive rates with our transparent fee structure and regular payment schedule.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] hover:from-[#2A1D60] hover:to-[#6062A7] rounded-full px-10 py-6 text-lg">
            Apply Now
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NutritionistsBecome;
