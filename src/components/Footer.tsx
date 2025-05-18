
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-4 md:px-8 lg:px-40 relative mt-20">
      <div className="absolute left-[1017px] top-[300px] w-[332px] h-[324px] rounded-full bg-[#E6E8FF] blur-[175px]"></div>
      <div className="max-w-[1920px] mx-auto">
        <div className="flex justify-center mb-12">
          <h1 className="text-6xl sm:text-8xl lg:text-[332px] font-normal">
            <span className="text-black">Won</span>
            <span className="text-[#1B5E20]">de</span>
            <span className="text-black">r</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-12">
          <div className="flex flex-col gap-6">
            <Link to="/shop" className="text-2xl text-[#767676]">Shop</Link>
            <Link to="/nutritionists" className="text-2xl text-[#767676]">Nutritionists</Link>
            <Link to="/clinics" className="text-2xl text-[#767676]">Clinics</Link>
            <Link to="/journal" className="text-2xl text-[#767676]">All Blogs</Link>
          </div>
          
          <div className="flex flex-col gap-6">
            <Link to="/our-story" className="text-2xl text-[#767676]">Our Story</Link>
            <Link to="/contact" className="text-2xl text-[#767676]">Contact Us</Link>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#767676]">X</a>
            <Link to="/feedback" className="text-2xl text-[#767676]">Give Feedback</Link>
          </div>
          
          <div className="flex flex-col gap-6">
            <Link to="/privacy" className="text-2xl text-[#767676]">Privacy Policy</Link>
            <Link to="/terms" className="text-2xl text-[#767676]">Terms & Conditions</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#767676]">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#767676]">LinkedIn</a>
          </div>
        </div>

        <div className="text-center text-[#767676] text-sm">
          ©2025 WonderHealth. ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default Footer;
