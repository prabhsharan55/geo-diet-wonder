
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#160041] to-[#8D97DE] py-20 px-6 text-white overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-lyon text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Health With Data-Driven Nutrition
          </h1>
          <p className="text-xl mb-10 opacity-90">
            Discover how your body responds to food through continuous glucose monitoring. Get personalized nutrition guidance for optimal health.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/customer">
              <Button size="lg" className="bg-[#F4D374] text-[#160041] hover:bg-[#F4D374]/90">
                Start Now
              </Button>
            </Link>
            <Link to="/our-story">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20 md:opacity-40"></div>
    </section>
  );
};

export default HeroSection;
