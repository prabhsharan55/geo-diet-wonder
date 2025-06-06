
import React from "react";
import { Microscope, Heart, Dumbbell, Circle, Zap, Lock } from "lucide-react";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: React.ReactNode;
}

const FeatureItem = ({ icon, title }: FeatureItemProps) => {
  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="relative">
        <div className="w-[66px] h-[71px] flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-[#2C2C2C] text-2xl font-medium font-sans text-center">{title}</h3>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="w-full p-14 rounded-lg mx-auto my-20 max-w-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center">
          <FeatureItem 
            icon={<Microscope size={36} color="#241254" />}
            title={<>Science-Backed<br/>Personalization</>}
          />
        </div>
        
        <div className="flex flex-col items-center relative">
          <div className="absolute h-full w-[1px] bg-gray-300 left-0"></div>
          <FeatureItem 
            icon={
              <div className="flex items-center">
                <Heart size={30} color="#241254" />
                <Dumbbell size={30} color="#241254" className="ml-1" />
              </div>
            }
            title={<>Integrated<br/>Health & Fitness</>}
          />
        </div>
        
        <div className="flex flex-col items-center relative">
          <div className="absolute h-full w-[1px] bg-gray-300 left-0"></div>
          <FeatureItem 
            icon={
              <div className="relative">
                <Circle size={36} color="#241254" />
                <Zap size={24} color="#241254" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            }
            title={<>Sustainable &<br/>Measurable Results</>}
          />
        </div>
        
        <div className="flex flex-col items-center relative">
          <div className="absolute h-full w-[1px] bg-gray-300 left-0"></div>
          <FeatureItem 
            icon={<Lock size={36} color="#241254" />}
            title={<>Privacy &<br/>Control</>}
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
