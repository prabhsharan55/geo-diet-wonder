
import React from "react";
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const NutritionistsAbout = () => {
  const teamMembers = [
    {
      name: "Dr. Maria Rodriguez",
      title: "Chief Nutrition Officer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Dr. Rodriguez has over 15 years of experience in clinical nutrition and leads our team of expert nutritionists. She specializes in metabolic health and nutrition science."
    },
    {
      name: "Dr. James Wilson",
      title: "Medical Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Board-certified in endocrinology, Dr. Wilson ensures all our nutrition protocols meet the highest standards of medical accuracy and effectiveness."
    },
    {
      name: "Sarah Chen, PhD",
      title: "Research Director",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Sarah leads our research initiatives, staying at the forefront of nutrition science and translating the latest findings into practical advice for our clients."
    },
    {
      name: "Michael Johnson, RD",
      title: "Head of Nutritionist Training",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      bio: "Michael ensures all GeoDiet nutritionists receive comprehensive training in our unique methodology and stay updated with continuing education."
    }
  ];

  const certifications = [
    "Registered Dietitian Nutritionist (RDN)",
    "Certified Nutrition Specialist (CNS)",
    "Certified Clinical Nutritionist (CCN)",
    "Board Certified in Holistic Nutrition",
    "Certified Sports Nutritionist",
    "Certified Diabetes Educator (CDE)"
  ];

  const standards = [
    "Minimum of a master's degree in nutrition or related field",
    "At least 3 years of clinical experience",
    "Ongoing professional development and education",
    "Adherence to evidence-based practice guidelines",
    "Regular case reviews and quality assessment",
    "Commitment to personalized client care"
  ];

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-4">About Our Nutrition Experts</h1>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Meet the team that leads our network of highly qualified nutritionists, committed to transforming health through personalized nutrition
        </p>
        
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-6">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-[#3A2D70] mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center">Our Quality Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4 text-center">Professional Credentials</h3>
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#BED1AB]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4 text-center">Selection Criteria</h3>
                <ul className="space-y-3">
                  {standards.map((standard, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#BED1AB]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {standard}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="bg-[#F9F9FF] p-8 rounded-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Join Our Network</h2>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            Are you a qualified nutritionist interested in joining our platform? We're always looking for talented professionals to join our team.
          </p>
          <a href="/nutritionists/become" className="inline-block bg-gradient-to-r from-[#3A2D70] to-[#7072B7] text-white font-medium py-3 px-8 rounded-full">
            Learn More
          </a>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NutritionistsAbout;
