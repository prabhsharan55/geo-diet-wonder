
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">Our Mission</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Wonder is on a mission to revolutionize health management through personalized data, 
            expert guidance, and community support.
          </p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">How It All Started</h2>
            <p className="text-lg text-gray-600 mb-4">
              Wonder began in 2023 when our founder, Dr. Amanda Chen, recognized that many of her patients 
              struggled to understand and act upon their health data in meaningful ways.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              After spending years in clinical practice, she saw firsthand how personalized nutrition and 
              continuous glucose monitoring could transform lives when paired with the right support system.
            </p>
            <p className="text-lg text-gray-600">
              She assembled a team of nutritionists, software engineers, and health coaches to create a 
              platform that makes complex health data accessible and actionable for everyone.
            </p>
          </div>
          <div className="bg-gray-100 h-[400px] rounded-3xl flex items-center justify-center">
            <img src="https://placehold.co/600x400" alt="Founder" className="rounded-3xl" />
          </div>
        </section>
        
        <section className="bg-[#E6E8FF] rounded-3xl p-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl">
              <div className="w-16 h-16 bg-[#BED1AB] rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-[#241153]"></div>
              </div>
              <h3 className="text-2xl font-medium mb-2">Evidence-Based Approach</h3>
              <p className="text-gray-600">
                We ground all our recommendations and services in rigorous scientific research and clinical expertise.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="w-16 h-16 bg-[#F4D374] rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-[#241153]"></div>
              </div>
              <h3 className="text-2xl font-medium mb-2">Personalization</h3>
              <p className="text-gray-600">
                We recognize that every body is different, and customize our approach to your unique needs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="w-16 h-16 bg-[#A6B8B9] rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-[#241153]"></div>
              </div>
              <h3 className="text-2xl font-medium mb-2">Empowerment</h3>
              <p className="text-gray-600">
                We equip you with the knowledge, tools, and support to take control of your health journey.
              </p>
            </div>
          </div>
        </section>
        
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're building a community of individuals committed to better health through
            data-driven insights and expert guidance.
          </p>
          <Button className="bg-gradient-to-r from-[#200C4E] to-[#8A93DA] rounded-full h-[72px] px-12 text-xl">
            START YOUR JOURNEY TODAY
          </Button>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OurStory;
