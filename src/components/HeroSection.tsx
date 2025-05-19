
import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return <section className="relative w-full pt-16 pb-32 px-4 md:px-8 lg:px-40 overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-[479px] top-[280px] w-[332px] h-[324px] rounded-full bg-[rgba(157,163,204,0.6)] blur-[175px]"></div>
      <div className="absolute left-[323px] top-[686px] w-[332px] h-[324px] rounded-full bg-white blur-[191px]"></div>
      <div className="absolute left-[1242px] top-[409px] w-[332px] h-[324px] rounded-full bg-[#A6B8B9] blur-[191px]"></div>
      
      <div className="max-w-[1429px] mx-auto text-center flex flex-col items-center gap-10">
        <h2 className="text-5xl md:text-7xl lg:text-[120px] font-medium leading-[1.1] font-lyon text-black">
          Track, invest, get advice, and<br />protect your health.
        </h2>
        <p className="text-xl md:text-2xl text-[#363230] font-sans">
          Build your health all in one place with GeoDiet.
        </p>
        <Button className="bg-gradient-to-r from-[#200C4E] to-[#8A93DA] rounded-full h-[72px] px-12 text-xl md:text-2xl font-bold uppercase">
          START NOW
        </Button>
      </div>

      {/* Heart beat with beating heart animation */}
      <div className="flex justify-center mt-12">
        <div className="relative w-full max-w-[600px] h-[40px]">
          <svg viewBox="0 0 1000 40" className="w-full">
            <path d="M0,20 Q25,20 30,20 T50,20 T75,20 T100,20 T125,20 T150,20 L175,20 L190,10 L205,30 L220,20 L235,20 L250,5 L265,35 L280,20 L295,20 L310,15 L325,25 L340,20 L355,20 L370,20 L400,20 T450,20 T500,20 T550,20" fill="none" stroke="#ea384c" strokeWidth="1.5" className="ecg-line" strokeOpacity="0.7" />
          </svg>
          
          {/* Beating heart in background */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
            <div className="text-[#ea384c] opacity-20 beating-heart">❤</div>
          </div>
        </div>
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

      {/* Phone mockup container - removed the image but kept the container */}
      <div className="w-full max-w-[495px] h-[660px] absolute right-[10%] top-[350px]">
        <div className="relative w-full h-full">
          <div className="absolute left-[20%] top-[5%] w-[260px] h-[567px] bg-white rounded-[36px] overflow-hidden z-10">
            {/* Phone content goes here */}
          </div>
          {/* Phone image removed */}
        </div>
      </div>

      <style>
        {`
        @keyframes ecg-animation {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .ecg-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: ecg-animation 3s linear infinite;
        }
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
        .beating-heart {
          font-size: 2rem;
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        `}
      </style>
    </section>;
};
export default HeroSection;
