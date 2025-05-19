
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#F2F5F8] to-[#E8F0F5]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              <span className="text-black">Geo</span>
              <span className="text-[#1B5E20]">Di</span>
              <span className="text-black">et</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Personalized nutrition and lifestyle recommendations based on your unique metabolic response.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-[#160041] to-[#8D97DE]">
                Get Started
              </Button>
            </Link>
            <Link to="/our-story">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
