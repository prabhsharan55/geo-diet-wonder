
import React from "react";

interface FeatureItemProps {
  icon: string;
  title: React.ReactNode;
  iconBgClass?: string;
}

const FeatureItem = ({ icon, title, iconBgClass = "bg-[#241254]" }: FeatureItemProps) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="relative">
        <div className={`w-[66px] h-[71px] ${iconBgClass}`}></div>
        <img src={icon} alt={typeof title === 'string' ? title : 'Feature icon'} className="absolute top-2 left-2 w-[62px] h-[62px]" />
      </div>
      <h3 className="text-[#2C2C2C] text-2xl font-medium font-sans">{title}</h3>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="w-full bg-[#E7E8FF] p-14 rounded-lg mx-auto my-20 max-w-[1689px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureItem 
          icon="https://placehold.co/62x62"
          title="Science-Backed Personalization"
        />
        
        <FeatureItem 
          icon="https://placehold.co/66x66"
          title="Integrated Health & Fitness"
        />
        
        <FeatureItem 
          icon="https://placehold.co/58x58"
          title="Sustainable & Measurable Results"
        />
        
        <FeatureItem 
          icon="https://placehold.co/51x51"
          title={<>Privacy &<br/>Control</>}
        />
      </div>
    </section>
  );
};

export default FeatureSection;
