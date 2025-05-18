import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MainNavigation />

      {/* Announcement Bar */}
      <div className="w-full h-[69px] bg-gradient-to-r from-[#160041] to-[#8D97DE] flex items-center justify-center">
        <p className="text-white text-lg font-normal">95% pay $0 for nutritionist support. How?</p>
      </div>

      {/* Navigation */}
      <header className="w-full h-[116px] bg-white border-b border-gray-100 px-4 md:px-8 lg:px-40">
        <div className="max-w-[1920px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-4xl md:text-5xl font-normal">
              <span className="text-black">Won</span>
              <span className="text-[#1B5E20]">de</span>
              <span className="text-black">r</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-1">
                <span className="text-[#2C2C2C] text-lg">Shop</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L6 9L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-[#2C2C2C] text-lg">Nutritionists</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L6 9L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <span className="text-[#2C2C2C] text-lg">Journal</span>
              <span className="text-[#2C2C2C] text-lg">Our Story</span>
              <span className="text-[#2C2C2C] text-lg">Contact</span>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-full px-8 h-[50px] hidden md:flex">
              SIGN IN
            </Button>
            <Button className="rounded-full px-6 h-[50px] bg-[#1A0546] hidden md:flex">
              JOIN AS PARTNER
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full pt-16 pb-32 px-4 md:px-8 lg:px-40 overflow-hidden">
        {/* Background elements */}
        <div className="absolute left-[479px] top-[280px] w-[332px] h-[324px] rounded-full bg-[rgba(157,163,204,0.6)] blur-[175px]"></div>
        <div className="absolute left-[323px] top-[686px] w-[332px] h-[324px] rounded-full bg-white blur-[191px]"></div>
        <div className="absolute left-[1242px] top-[409px] w-[332px] h-[324px] rounded-full bg-[#A6B8B9] blur-[191px]"></div>
        
        <div className="max-w-[1435px] mx-auto text-center">
          <h2 className="text-5xl md:text-7xl lg:text-[120px] font-medium leading-tight mb-10">
            Track, invest, get advice, and<br />protect your health.
          </h2>
          <p className="text-xl md:text-2xl text-[#363230] mb-10">
            Build your health all in one place with Wonder.
          </p>
          <Button className="bg-gradient-to-r from-[#200C4E] to-[#8A93DA] rounded-full h-[72px] px-12 text-xl md:text-2xl">
            START NOW
          </Button>
        </div>

        {/* Floating elements */}
        <div className="absolute left-[20%] top-[650px] -rotate-3 bg-[#BED1AB] rounded-md p-4 z-10 max-w-[276px]">
          <div className="relative">
            <div className="absolute left-5 top-5 w-[60px] h-[60px] bg-[#241153] rounded-md"></div>
            <div className="absolute left-7 top-7 w-[50px] h-[50px] bg-[#F3F5F5] rounded-md transform rotate-2"></div>
            <div className="ml-[90px] text-4xl">GeoDiet</div>
          </div>
        </div>

        <div className="absolute right-[20%] md:right-[30%] top-[950px] rotate-3 bg-[#A6B8B9] rounded-md p-5 z-10 max-w-[335px]">
          <div className="relative">
            <div className="absolute left-4 top-2 w-[80px] h-[80px] bg-[#241153] rounded-md"></div>
            <div className="absolute left-6 top-4 w-[65px] h-[65px] bg-white rounded-md"></div>
            <div className="ml-[100px] text-4xl">CGM Monitoring</div>
          </div>
        </div>

        <div className="absolute left-[30%] top-[1100px] rotate-3 bg-[#F4D374] rounded-md p-4 z-10 max-w-[305px]">
          <div className="relative">
            <div className="absolute left-4 top-4 w-[60px] h-[60px] bg-[#241153] rounded-md"></div>
            <div className="absolute left-6 top-6 w-[45px] h-[45px] bg-white rounded-md transform -rotate-1"></div>
            <div className="ml-[80px] text-3xl">Certified partner clinics</div>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="w-full max-w-[495px] h-[660px] absolute right-[10%] top-[350px]">
          <div className="relative w-full h-full">
            <div className="absolute left-[20%] top-[5%] w-[260px] h-[567px] bg-white rounded-[36px] overflow-hidden z-10">
              <img 
                src="https://placehold.co/261x1310" 
                alt="App Screen" 
                className="w-full h-auto transform -translate-y-[623px]"
              />
            </div>
            <img 
              src="https://placehold.co/496x660" 
              alt="Hand Holding Phone" 
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-[#E7E8FF] p-14 rounded-lg mx-auto my-20 max-w-[1689px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <div className="w-[66px] h-[71px] bg-[#241254]"></div>
              <img src="https://placehold.co/62x62" alt="Microscope" className="absolute top-0 left-0" />
            </div>
            <h3 className="text-[#2C2C2C] text-2xl font-medium">Science-Backed Personalization</h3>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <div className="w-[80px] h-[80px] bg-[#241254]"></div>
              <img src="https://placehold.co/66x66" alt="Dumbbell" className="absolute top-2 left-2" />
            </div>
            <h3 className="text-[#2C2C2C] text-2xl font-medium">Integrated Health & Fitness</h3>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <div className="w-[67px] h-[64px] bg-[#241254]"></div>
              <img src="https://placehold.co/58x58" alt="Save" className="absolute top-2 left-2" />
            </div>
            <h3 className="text-[#2C2C2C] text-2xl font-medium">Sustainable & Measurable Results</h3>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <div className="w-[65px] h-[68px] bg-[#241254]"></div>
              <img src="https://placehold.co/51x51" alt="Padlock" className="absolute top-2 left-2" />
            </div>
            <h3 className="text-[#2C2C2C] text-2xl font-medium">Privacy & Control</h3>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 lg:px-40">
        <div className="max-w-[967px] mx-auto text-center">
          <p className="text-lg font-medium text-[#363230] uppercase tracking-wider mb-4">Let's DO WONDER</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#020120] leading-tight mb-6">
            Change the way you eat,<br/>feel, and live.
          </h2>
          <p className="text-xl md:text-2xl text-[#363230] mb-10">
            Health isn't traditionally easy to optimize, so we've built an entirely new approach. Whether you're balancing your nutrition, enhancing your fitness, or tracking real-time health insights, Wonder makes it easier to take control and unlock your full potential.
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              Make your body<br/>work for you
            </h2>
          </div>
          <div className="max-w-[313px]">
            <p className="text-xl md:text-2xl text-[#102F32]">
              Solutions that work with your body, for results that stick.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="rounded-3xl overflow-hidden">
            <div className="relative h-[520px]">
              <img src="https://placehold.co/520x520" alt="Workout sessions" className="w-full h-full object-cover" />
              <div className="absolute top-10 left-10">
                <span className="bg-[#F4D374] text-[#102F32] text-sm font-semibold uppercase rounded-full px-5 py-2">
                  Subscription
                </span>
              </div>
            </div>
            <div className="bg-[#EBEAEF] p-10">
              <h3 className="text-3xl font-medium text-[#102F32] mb-2">In-person workout sessions</h3>
              <p className="text-lg text-[#102F32] opacity-70 mb-4">Starting at $225/month</p>
              <div className="absolute right-10 bottom-10 w-[55px] h-[55px] rounded-full bg-gradient-to-b from-[#312164] to-[#7B80C6] flex items-center justify-center">
                <ArrowRight className="text-white transform rotate-45" />
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="rounded-3xl overflow-hidden">
            <div className="relative h-[520px] bg-cover" style={{ backgroundImage: `url(https://placehold.co/520x520)` }}>
              <img src="https://placehold.co/629x544" alt="GeoDiet" className="w-full h-full object-cover" />
              <div className="absolute top-10 left-10">
                <span className="bg-[#BED1AB] text-[#102F32] text-sm font-semibold uppercase rounded-full px-5 py-2">
                  certified GeoDiet partners
                </span>
              </div>
            </div>
            <div className="bg-[#EBEAEF] p-10">
              <h3 className="text-3xl font-medium text-[#102F32] mb-2">GeoDiet Access</h3>
              <p className="text-lg text-[#102F32] opacity-70 mb-4">$0 out-of-pocket for most members</p>
              <div className="absolute right-10 bottom-10 w-[55px] h-[55px] rounded-full bg-gradient-to-b from-[#312164] to-[#7B80C6] flex items-center justify-center">
                <ArrowRight className="text-white transform rotate-45" />
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="rounded-3xl overflow-hidden">
            <div className="relative h-[520px] bg-[#E6E8FF]">
              <img src="https://placehold.co/318x492" alt="CGM App" className="w-[318px] h-[492px] object-contain mx-auto my-7" />
              <div className="absolute top-10 left-10">
                <span className="bg-[#A6B8B9] text-[#102F32] text-sm font-semibold uppercase rounded-full px-5 py-2">
                  CGM App
                </span>
              </div>
            </div>
            <div className="bg-[#EBEAEF] p-10">
              <h3 className="text-3xl font-medium text-[#102F32] mb-2">CGM Monitoring</h3>
              <p className="text-lg text-[#102F32] opacity-70 mb-4">Use Nutrisense with your own CGMs</p>
              <div className="absolute right-10 bottom-10 w-[55px] h-[55px] rounded-full bg-gradient-to-b from-[#352769] to-[#7C80C7] flex items-center justify-center">
                <ArrowRight className="text-white transform rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eat Smart Section */}
      <section className="py-16 px-4 md:px-8 lg:px-20 bg-[#E6E8FF] rounded-3xl mx-auto max-w-[1847px] my-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8">
            Eat smart. Move smarter. Let data guide the way.
          </h2>
          <p className="text-xl md:text-2xl mb-14 max-w-[1186px] mx-auto">
            Wonder simplifies weight loss by showing how your metabolism works, helping you understand your choices, and nudging you to your goal through daily changes. It's a step-by-step journey to better health and sustainable weight loss.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-around mb-20">
          <div className="max-w-[330px] mx-auto lg:mx-0 mb-10 lg:mb-0">
            <img src="https://placehold.co/331x613" alt="App Demo" className="w-full h-auto" />
          </div>
          <div className="max-w-[590px] mx-auto lg:mx-0 mb-10 lg:mb-0">
            <img src="https://placehold.co/434x583" alt="App Demo" className="w-full h-auto" />
          </div>
        </div>

        <div className="border border-[#342567] p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="border-r border-[#352669] pb-10">
            <div className="text-[90px] font-medium text-[#2C1B5D]">24lbs</div>
            <p className="text-2xl text-[#5A5A5A]">
              Achieve your weight loss goals<br />in 90 days
            </p>
          </div>
          <div className="border-r border-[#2D1C5E] pb-10">
            <div className="text-[90px] font-medium text-[#2C1B5D]">95%</div>
            <p className="text-2xl text-[#5A5A5A]">
              Reach goals with expert support<br />Empowered by dietitian 1:1s
            </p>
          </div>
          <div className="pb-10">
            <div className="text-[90px] font-medium text-[#2C1B5D]">32%</div>
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
            <img src="https://placehold.co/904x819" alt="Tracking Demo" className="w-full h-auto rounded-3xl" />
          </div>
          <div className="lg:w-1/2">
            <p className="text-lg font-medium mb-2">The Science</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-10">Better Tracking, Better Health</h2>

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
          <div className="lg:w-1/2 bg-[#E3E1DC] rounded-3xl p-12 lg:p-24 relative overflow-hidden">
            <img src="https://placehold.co/895x1216" alt="Video Call" className="w-full h-auto object-cover absolute inset-0" />
          </div>
          <div className="lg:w-1/2 border border-gray-200 rounded-3xl p-12 lg:p-24 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8">
              Ready to elevate your<br />health with Wonder?
            </h2>
            <p className="text-xl md:text-2xl text-[#363230] mb-10">
              Track, Workouts, Balanced diets, Live sessions and many more.
            </p>
            <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full text-lg w-fit uppercase">
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-16 px-4 md:px-8 lg:px-40">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <img src="https://placehold.co/900x813" alt="Partner" className="w-full h-auto rounded-3xl" />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              Partner with Wonder-<br />A New Era for Clinics & Trainers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mt-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <div className="w-4 h-3 bg-[#3D3174]"></div>
                </div>
                <span className="text-lg font-semibold uppercase">Weight management</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <div className="w-4 h-3 bg-[#3D3174]"></div>
                </div>
                <span className="text-lg font-semibold uppercase">CGM PLANS</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <div className="w-4 h-3 bg-[#3D3174]"></div>
                </div>
                <span className="text-lg font-semibold uppercase">Insulin Resistance</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <div className="w-4 h-3 bg-[#3D3174]"></div>
                </div>
                <span className="text-lg font-semibold uppercase">NUTRITIONISTS</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E6E8FF] flex items-center justify-center">
                  <div className="w-4 h-3 bg-[#3D3174]"></div>
                </div>
                <span className="text-lg font-semibold uppercase">Face-to-face support</span>
              </div>
            </div>

            <Button className="mt-12 bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full w-fit uppercase">
              Become a partner
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 lg:px-40">
        <div className="text-center mb-12">
          <p className="text-lg font-medium mb-2">Testimonials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">Real Stories, Real Transformations</h2>
          <p className="text-xl md:text-2xl text-[#363230] max-w-[525px] mx-auto">
            Join 10000+ members transforming their health
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="bg-[#E6E8FF] h-full rounded-3xl">
                <CardContent className="p-8">
                  <p className="text-2xl mb-6">
                    I think the Wonder CGM program is a great value for what you're getting. Especially since you can also talk to a dietitian while using the service.
                  </p>
                  <div className="mt-auto">
                    <p className="font-normal text-xl">Stuart Tutler</p>
                    <div className="mt-4 w-[140px] h-[58px] bg-[#FED564]"></div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <img src="https://placehold.co/378x423" alt="Testimonial" className="w-full h-full object-cover" />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="bg-[#A6B8B9] h-full rounded-3xl">
                <CardContent className="p-8">
                  <p className="text-2xl mb-6">
                    I knew I wanted to keep using the CGM because when I didn't have it, I missed it! . . . the 12 months is like a yearly gym membership.
                  </p>
                  <div className="mt-auto">
                    <p className="font-normal text-xl">Stuart Tutler</p>
                    <div className="mt-4 w-[140px] h-[58px] bg-[#FED564]"></div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="h-full rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <img src="https://placehold.co/371x423" alt="Testimonial" className="w-full h-full object-cover" />
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
