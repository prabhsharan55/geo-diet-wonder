
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-medium mb-8">
            Eat smart. Move smarter. Let data guide the way.
          </h2>
          <p className="text-xl md:text-2xl mb-14 max-w-[1186px] mx-auto">
            GeoDiet simplifies weight loss by showing how your metabolism works, helping you understand your choices, and nudging you to your goal through daily changes. It's a step-by-step journey to better health and sustainable weight loss.
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
            <div className="text-[90px] font-lyon font-medium text-[#2C1B5D]">24lbs</div>
            <p className="text-2xl text-[#5A5A5A]">
              Achieve your weight loss goals<br />in 90 days
            </p>
          </div>
          <div className="border-r border-[#2D1C5E] pb-10">
            <div className="text-[90px] font-lyon font-medium text-[#2C1B5D]">95%</div>
            <p className="text-2xl text-[#5A5A5A]">
              Reach goals with expert support<br />Empowered by dietitian 1:1s
            </p>
          </div>
          <div className="pb-10">
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
            <img src="https://placehold.co/904x819" alt="Tracking Demo" className="w-full h-auto rounded-3xl" />
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
          <div className="lg:w-1/2 bg-[#E3E1DC] rounded-3xl p-12 lg:p-24 relative overflow-hidden">
            <img src="https://placehold.co/895x1216" alt="Video Call" className="w-full h-auto object-cover absolute inset-0" />
          </div>
          <div className="lg:w-1/2 border border-gray-200 rounded-3xl p-12 lg:p-24 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-normal mb-8">
              Ready to elevate your<br />health with GeoDiet?
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-medium mb-6">
              Partner with GeoDiet-<br />A New Era for Clinics & Trainers
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-lyon font-medium mb-6">Real Stories, Real Transformations</h2>
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
                    I think the GeoDiet CGM program is a great value for what you're getting. Especially since you can also talk to a dietitian while using the service.
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
