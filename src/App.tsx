
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserDataProvider } from "./context/UserDataContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ShopCGM from "./pages/shop/ShopCGM";
import ShopWorkouts from "./pages/shop/ShopWorkouts";
import ShopDiet from "./pages/shop/ShopDiet";
import Nutritionists from "./pages/Nutritionists";
import NutritionistsFind from "./pages/nutritionists/NutritionistsFind";
import NutritionistsBecome from "./pages/nutritionists/NutritionistsBecome";
import NutritionistsAbout from "./pages/nutritionists/NutritionistsAbout";
import Journal from "./pages/Journal";
import ArticleDetail from "./pages/journal/ArticleDetail";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import SignupPage from "./pages/SignupPage";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProgram from "./pages/customer/Program";
import CustomerVideos from "./pages/customer/Videos";
import CustomerProgress from "./pages/customer/Progress";
import CustomerCGMTracker from "./pages/customer/CGMTracker";
import GeoDietCoach from "./pages/customer/GeoDietCoach";
import AskCoach from "./pages/customer/AskCoach";
import CustomerSupport from "./pages/customer/Support";
import CustomerSettings from "./pages/customer/Settings";
import PartnerDashboard from "./pages/partner/Dashboard";
import ClientManagement from "./pages/partner/ClientManagement";
import AccessRequests from "./pages/partner/AccessRequests";
import PlansManagement from "./pages/partner/PlansManagement";
import MealPlanning from "./pages/partner/MealPlanning";
import ContentManagement from "./pages/partner/ContentManagement";
import Announcements from "./pages/partner/Announcements";
import PartnerSupport from "./pages/partner/Support";
import PartnerSettings from "./pages/partner/Settings";
import AdminDashboard from "./pages/admin/Dashboard";
import CustomersPage from "./pages/admin/customers/index";
import CustomerReportsPage from "./pages/admin/customers/reports";
import BlogPage from "./pages/admin/content/blog";
import EmailPage from "./pages/admin/email";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <UserDataProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/cgm" element={<ShopCGM />} />
            <Route path="/shop/workouts" element={<ShopWorkouts />} />
            <Route path="/shop/diet" element={<ShopDiet />} />
            <Route path="/nutritionists" element={<Nutritionists />} />
            <Route path="/nutritionists/find" element={<NutritionistsFind />} />
            <Route path="/nutritionists/become" element={<NutritionistsBecome />} />
            <Route path="/nutritionists/about" element={<NutritionistsAbout />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<ArticleDetail />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/customer/program" element={<CustomerProgram />} />
            <Route path="/customer/videos" element={<CustomerVideos />} />
            <Route path="/customer/progress" element={<CustomerProgress />} />
            <Route path="/customer/cgm-tracker" element={<CustomerCGMTracker />} />
            <Route path="/customer/coach" element={<GeoDietCoach />} />
            <Route path="/customer/ask-coach" element={<AskCoach />} />
            <Route path="/customer/support" element={<CustomerSupport />} />
            <Route path="/customer/settings" element={<CustomerSettings />} />

            {/* Partner Routes */}
            <Route path="/partner" element={<PartnerDashboard />} />
            <Route path="/partner/client-management" element={<ClientManagement />} />
            <Route path="/partner/access-requests" element={<AccessRequests />} />
            <Route path="/partner/plans-management" element={<PlansManagement />} />
            <Route path="/partner/meal-planning" element={<MealPlanning />} />
            <Route path="/partner/content-management" element={<ContentManagement />} />
            <Route path="/partner/announcements" element={<Announcements />} />
            <Route path="/partner/support" element={<PartnerSupport />} />
            <Route path="/partner/settings" element={<PartnerSettings />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/partners" element={<CustomersPage />} />
            <Route path="/admin/partners/add" element={<CustomersPage />} />
            <Route path="/admin/partners/map" element={<CustomersPage />} />
            <Route path="/admin/customers" element={<CustomersPage />} />
            <Route path="/admin/customers/reports" element={<CustomerReportsPage />} />
            <Route path="/admin/packages" element={<CustomersPage />} />
            <Route path="/admin/packages/add" element={<CustomersPage />} />
            <Route path="/admin/content/videos" element={<BlogPage />} />
            <Route path="/admin/content/blog" element={<BlogPage />} />
            <Route path="/admin/analytics" element={<CustomersPage />} />
            <Route path="/admin/partner-locator" element={<CustomersPage />} />
            <Route path="/admin/email" element={<EmailPage />} />
            <Route path="/admin/legal/terms" element={<CustomersPage />} />
            <Route path="/admin/legal/policy" element={<CustomersPage />} />
            <Route path="/admin/settings" element={<CustomersPage />} />

            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserDataProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
