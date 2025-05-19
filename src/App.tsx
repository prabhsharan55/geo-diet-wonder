
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import Nutritionists from "./pages/Nutritionists";
import Journal from "./pages/Journal";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";

// Shop submenu pages
import ShopCGM from "./pages/shop/ShopCGM";
import ShopWorkouts from "./pages/shop/ShopWorkouts";
import ShopDiet from "./pages/shop/ShopDiet";

// Nutritionist submenu pages
import NutritionistsFind from "./pages/nutritionists/NutritionistsFind";
import NutritionistsBecome from "./pages/nutritionists/NutritionistsBecome";
import NutritionistsAbout from "./pages/nutritionists/NutritionistsAbout";

// Journal page
import ArticleDetail from "./pages/journal/ArticleDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Shop routes */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/cgm" element={<ShopCGM />} />
          <Route path="/shop/workouts" element={<ShopWorkouts />} />
          <Route path="/shop/diet" element={<ShopDiet />} />
          
          {/* Nutritionist routes */}
          <Route path="/nutritionists" element={<Nutritionists />} />
          <Route path="/nutritionists/find" element={<NutritionistsFind />} />
          <Route path="/nutritionists/become" element={<NutritionistsBecome />} />
          <Route path="/nutritionists/about" element={<NutritionistsAbout />} />
          
          {/* Journal routes */}
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:id" element={<ArticleDetail />} />
          
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
