import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MainNavigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 lg:px-40">
        <div className="max-w-[967px] mx-auto text-center">
          <p className="text-lg font-medium text-[#363230] uppercase tracking-wider mb-4">Let's DO GEODIET</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-lyon text-[#020120] leading-tight mb-6">
            Change the way you eat,<br/>feel, and live.
          </h2>
          <p className="text-xl md:text-2xl text-[#363230] mb-10">
            Health isn't traditionally easy to optimize, so we've built an entirely new approach. Whether you're balancing your nutrition, enhancing your fitness, or tracking real-time health insights, GeoDiet makes it easier to take control and unlock your full potential.
          </p>
          <Button className="bg-gradient-to-r from-[#291759] to-[#858CD3] rounded-full h-[62px] px-8 text-lg uppercase">
            Know OUR STORY
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 md:px-8 lg:px-40">
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-medium mb-6">
              Make your body<br/>work for you
            </h2>
          </div>
          <div className="max-w-[313px]">
            <p className="text-lg md:text-xl text-[#102F32] leading-tight">
              Solutions that work with<br/>your body, for results that stick.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="rounded-3xl overflow-hidden h-[700px]">
            <div className="relative h-[520px]">
              <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" alt="Workout sessions" className="w-full h-full object-cover" />
              <div className="absolute top-10 left-10">
                <span className="bg-[#F4D374] text-[#102F32] text-sm font-semibold uppercase rounded-full px-5 py-2">
                  Subscription
                </span>
              </div>
            </div>
            <div className="bg-[#EBEAEF] p-10 relative rounded-b-3xl h-[180px]">
              <h3 className="text-3xl font-medium text-[#102F32] mb-2 truncate">Workout sessions</h3>
              <p className="text-lg text-[#102F32] opacity-70 mb-4">Starting at $225/month</p>
              <div className="absolute right-10 bottom-10">
                <div className="w-[55px] h-[55px] rounded-full bg-gradient-to-b from-[#312164] to-[#7B80C6] flex items-center justify-center">
                  <ArrowRight className="text-white rotate-[-45deg]" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="rounded-3xl overflow-hidden h-[700px]">
            <div className="relative h-[520px]">
              <img src="https://images.unsplash.com/photo-1500673922987-e212871fec22" alt="GeoDiet" className="w-full h-full object-cover" />
              <div className="absolute top-10 left-10">
                <span className="bg-[#BED1AB] text-[#102F32] text-sm font-semibold uppercase rounded-full px-5 py-2">
                  certified GeoDiet partners
                </span>
              </div>
            </div>
            <div className="bg-[#EBEAEF] p-10 relative rounded-3xl h-[180px]">
              <h3 className="text-3xl font-medium text-[#102F32] mb-2">GeoDiet Access</h3>
              <p className="text-lg text-[#102F32] opacity-70 mb-4">$0 out-of-pocket for most members</p>
              <div className="absolute right-10 bottom-10">
                <div className="w-[55px] h-[55px] rounded-full bg-gradient-to-b from-[#312164] to-[#7B80C6] flex items-center justify-center">
                  <ArrowRight className="text-white rotate-[-45deg]" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="rounded-3xl overflow-hidden h-[700px]">
            <div className="relative h-[520px]">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="CGM App" className="w-full h-full object-cover" />
              <div className="absolute top-10 left-10">
                <span className="bg-[#A6B8B9] text-[#102F32] text-sm font-semibold uppercase rounded-full px-5 py-2">
                  CGM App
                </span>
              </div>
            </div>
            <div className="bg-[#EBEAEF] p-10 relative rounded-3xl h-[180px]">
              <h3 className="text-3xl font-medium text-[#102F32] mb-2">CGM Monitoring</h3>
              <p className="text-lg text-[#102F32] opacity-70 mb-4">Use Nutrisense with your own CGMs</p>
              <div className="absolute right-10 bottom-10">
                <div className="w-[55px] h-[55px] rounded-full bg-gradient-to-b from-[#352769] to-[#7C80C7] flex items-center justify-center">
                  <ArrowRight className="text-white rotate-[-45deg]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eat Smart Section with Mobile Phones - Fixed layout */}
      <section className="py-16 px-4 md:px-8 lg:px-20 bg-[#E6E8FF] rounded-3xl mx-auto max-w-[1847px] my-20 relative">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-medium mb-8">
            Eat smart. Move smarter. Let data guide the way.
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-[1186px] mx-auto">
            GeoDiet simplifies weight loss by showing how your metabolism works, helping you understand your choices, and nudging you to your goal through daily changes. It's a step-by-step journey to better health and sustainable weight loss.
          </p>
        </div>

        {/* Phone mockups container with fixed positioning */}
        <div className="h-[500px] relative mb-20"> {/* Increased height for better spacing */}
          <div className="flex items-center justify-center absolute top-0 left-0 right-0">
            <div className="w-[260px] h-[500px] bg-white rounded-[36px] overflow-hidden mx-4 shadow-lg transform -rotate-3 relative">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="App Screen 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-[300px] h-[580px] bg-white rounded-[36px] overflow-hidden mx-4 shadow-xl z-10 relative">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="App Screen 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-[260px] h-[500px] bg-white rounded-[36px] overflow-hidden mx-4 shadow-lg transform rotate-3 relative">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="App Screen 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Statistics section with proper spacing */}
        <div className="border border-[#342567] p-10 grid grid-cols-1 md:grid-cols-3 gap-0 text-center relative mt-20"> {/* Added margin top to create space */}
          <div className="pb-10 flex flex-col items-center">
            <div className="text-[90px] font-lyon font-medium text-[#2C1B5D]">24lbs</div>
            <p className="text-2xl text-[#5A5A5A]">
              Achieve your weight loss goals<br />in 90 days
            </p>
          </div>
          
          <div className="pb-10 flex flex-col items-center relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center h-full">
              <Separator orientation="vertical" className="h-28 w-[2px] bg-[#8E9196]" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#342567] flex items-center justify-center text-white text-2xl font-bold">+</div>
            </div>
            <div className="text-[90px] font-lyon font-medium text-[#2C1B5D]">95%</div>
            <p className="text-2xl text-[#5A5A5A]">
              Reach goals with expert support<br />Empowered by dietitian 1:1s
            </p>
          </div>
          
          <div className="pb-10 flex flex-col items-center relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center h-full">
              <Separator orientation="vertical" className="h-28 w-[2px] bg-[#8E9196]" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#342567] flex items-center justify-center text-white text-2xl font-bold">+</div>
            </div>
            <div className="text-[90px] font-lyon font-medium text-[#2C1B5D]">32%</div>
            <p className="text-2xl text-[#5A5A5A]">
              Improvement in energy levels<br />within 7 weeks
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-24 px-4 md:px-8 lg:px-40">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" alt="Woman Exercising with Laptop" className="w-full h-[500px] object-cover rounded-3xl" />
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg font-medium mb-2">The Science</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-medium mb-10">Better Tracking, Better Health</h2>

            <div className="border-b border-[#D3D3D3] pb-5 pt-4">
              <div className="text-3xl font-normal">CGM Tracking You need...</div>
            </div>

            <div className="border-b border-[#D3D3D3] pb-5 pt-4">
              <div className="text-3xl font-normal">Workout Sessions</div>
            </div>

            <div className="border-b border-[#D3D3D3] pb-5 pt-4">
              <div className="text-3xl font-normal">Nutritionist recommend diets</div>
            </div>

            <Button className="mt-12 bg-gradient-to-r from-[#37296C] to-[#7477BC] rounded-full px-10 py-6 text-xl uppercase">
              get your plan
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 md:px-8 lg:px-40 mb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 border border-gray-200 rounded-3xl p-12 lg:p-24 flex flex-col justify-center order-1">
            <h2 className="text-4xl md:text-5xl font-lyon font-normal mb-8">
              Ready to elevate<br />your health with GeoDiet?
            </h2>
            <p className="text-xl text-[#363230] mb-10">
              Track, Workouts, Balanced diets, Live sessions and many more.
            </p>
            <Button 
              onClick={() => window.location.href = "/signup?type=customer"}
              className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full text-lg w-fit uppercase"
            >
              Get Started for Free
            </Button>
          </div>
          <div className="lg:w-1/2 bg-[#E3E1DC] rounded-3xl p-12 lg:p-24 relative overflow-hidden order-2">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Video Call" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-16 px-4 md:px-8 lg:px-40">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <img src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" alt="Handshake" className="w-full h-[500px] object-cover rounded-3xl" />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-medium mb-6">
              Partner with GeoDiet-<br />A New Era for Clinics & Trainers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mt-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.2781 11.1296L0.121949 4.97335L1.95052 3.14478L6.2781 7.44192L14.0496 -0.329529L15.8781 1.52962L6.2781 11.1296Z" fill="#3D3174"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold uppercase">Weight management</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.2781 11.1296L0.121949 4.97335L1.95052 3.14478L6.2781 7.44192L14.0496 -0.329529L15.8781 1.52962L6.2781 11.1296Z" fill="#3D3174"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold uppercase">CGM PLANS</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.2781 11.1296L0.121949 4.97335L1.95052 3.14478L6.2781 7.44192L14.0496 -0.329529L15.8781 1.52962L6.2781 11.1296Z" fill="#3D3174"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold uppercase">Insulin Resistance</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.2781 11.1296L0.121949 4.97335L1.95052 3.14478L6.2781 7.44192L14.0496 -0.329529L15.8781 1.52962L6.2781 11.1296Z" fill="#3D3174"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold uppercase">NUTRITIONISTS</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.2781 11.1296L0.121949 4.97335L1.95052 3.14478L6.2781 7.44192L14.0496 -0.329529L15.8781 1.52962L6.2781 11.1296Z" fill="#3D3174"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold uppercase">Face-to-face support</span>
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = "/signup?type=partner"}
              className="mt-12 bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full w-fit uppercase"
            >
              Become a partner
            </Button>
          </div>
        </div>
      </section>

      {/* Admin Access Section */}
      <section className="py-16 px-4 md:px-8 lg:px-40 bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-lyon font-medium mb-6">
            System Administration
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Access the admin panel to manage the platform
          </p>
          <Button 
            onClick={() => window.location.href = "/auth?admin=true"}
            variant="outline"
            className="border-2 border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Admin Login
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 lg:px-40 overflow-hidden">
        <div className="text-center mb-12">
          <p className="text-lg font-medium mb-2">Testimonials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-medium mb-6">Real Stories, Real Transformations</h2>
          <p className="text-xl md:text-2xl text-[#363230] max-w-[525px] mx-auto">
            Join 10000+ members transforming their health
          </p>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex animate-marquee">
            {/* Testimonial 1 - Image */}
            <div className="min-w-[300px] h-[400px] rounded-3xl overflow-hidden mx-2">
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" alt="Testimonial Person" className="w-full h-full object-cover" />
            </div>
            
            {/* Testimonial 1 - Content */}
            <div className="min-w-[300px] h-[400px] bg-[#E6E8FF] rounded-3xl p-8 mx-2">
              <div className="h-full flex flex-col">
                <p className="text-2xl mb-6">
                  I think the GeoDiet CGM program is a great value for what you're getting. Especially since you can also talk to a dietitian while using the service.
                </p>
                <div className="mt-auto">
                  <p className="font-normal text-xl">Stuart Tutler</p>
                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FED564">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Image Before/After */}
            <div className="min-w-[300px] h-[400px] rounded-3xl overflow-hidden mx-2 relative">
              <div className="flex h-full">
                <div className="w-1/2 h-full relative">
                  <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" alt="Before" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 rounded">Before</div>
                </div>
                <div className="w-1/2 h-full relative">
                  <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" alt="After" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-black text-white px-2 py-1 rounded">After</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 - Content */}
            <div className="min-w-[300px] h-[400px] bg-[#A6B8B9] rounded-3xl p-8 mx-2">
              <div className="h-full flex flex-col">
                <p className="text-2xl mb-6">
                  I knew I wanted to keep using the CGM because when I didn't have it, I missed it! . . . the 12 months is like a yearly gym membership.
                </p>
                <div className="mt-auto">
                  <p className="font-normal text-xl">John Smith</p>
                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FED564">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional testimonials repeated for marquee effect */}
            <div className="min-w-[300px] h-[400px] rounded-3xl overflow-hidden mx-2">
              <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" alt="Testimonial" className="w-full h-full object-cover" />
            </div>
            
            <div className="min-w-[300px] h-[400px] bg-[#BED1AB] rounded-3xl p-8 mx-2">
              <div className="h-full flex flex-col">
                <p className="text-2xl mb-6">
                  The personalized nutrition plan changed my life. I've lost 15lbs and have so much more energy throughout the day!
                </p>
                <div className="mt-auto">
                  <p className="font-normal text-xl">Maria Johnson</p>
                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FED564">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>
            {`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            `}
          </style>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
