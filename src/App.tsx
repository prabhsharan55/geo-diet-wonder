import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserDataContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import Nutritionists from "./pages/Nutritionists";
import Journal from "./pages/Journal";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import SignupPage from "./pages/SignupPage";
import PartnerSignup from "./pages/PartnerSignup";

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

// Customer Dashboard pages
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProgram from "./pages/customer/Program";
import CustomerCGMTracker from "./pages/customer/CGMTracker";
import CustomerGeoDietCoach from "./pages/customer/GeoDietCoach";
import CustomerProgress from "./pages/customer/Progress";
import CustomerVideos from "./pages/customer/Videos";
import CustomerSettings from "./pages/customer/Settings";
import CustomerAskCoach from "./pages/customer/AskCoach";
import CustomerSupport from "./pages/customer/Support";

// Partner Dashboard pages
import PartnerDashboard from "./pages/partner/Dashboard";
import ClientManagement from "./pages/partner/ClientManagement";
import AccessRequests from "./pages/partner/AccessRequests";
import PlansManagement from "./pages/partner/PlansManagement";
import ContentManagement from "./pages/partner/ContentManagement";
import Announcements from "./pages/partner/Announcements";
import Settings from "./pages/partner/Settings";
import Support from "./pages/partner/Support";
import MealPlanning from "./pages/partner/MealPlanning";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Partners from "./pages/admin/partners";
import AddPartner from "./pages/admin/partners/add";
import PartnersMap from "./pages/admin/partners/map";
import Customers from "./pages/admin/customers";
import CustomerReports from "./pages/admin/customers/reports";
import Packages from "./pages/admin/packages";
import AddPackage from "./pages/admin/packages/add";
import Videos from "./pages/admin/content/videos";
import Blog from "./pages/admin/content/blog";
import Analytics from "./pages/admin/analytics";
import PartnerLocator from "./pages/admin/partner-locator";
import Email from "./pages/admin/email";
import Terms from "./pages/admin/legal/terms";
import Policy from "./pages/admin/legal/policy";
import { default as AdminSettings } from "./pages/admin/settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <UserDataProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/partner-signup" element={<PartnerSignup />} />
              
              {/* Dashboard route - redirects based on role */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Customer dashboard routes - now public access */}
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/program" element={<CustomerProgram />} />
              <Route path="/customer/cgm" element={<CustomerCGMTracker />} />
              <Route path="/customer/coach" element={<CustomerGeoDietCoach />} />
              <Route path="/customer/progress" element={<CustomerProgress />} />
              <Route path="/customer/ask-coach" element={<CustomerAskCoach />} />
              <Route path="/customer/videos" element={<CustomerVideos />} />
              <Route path="/customer/settings" element={<CustomerSettings />} />
              <Route path="/customer/support" element={<CustomerSupport />} />
              
              {/* Partner dashboard routes - now public access */}
              <Route path="/partner" element={<PartnerDashboard />} />
              <Route path="/partner/clients" element={<ClientManagement />} />
              <Route path="/partner/requests" element={<AccessRequests />} />
              <Route path="/partner/reports" element={<PartnerDashboard />} />
              <Route path="/partner/plans" element={<PlansManagement />} />
              <Route path="/partner/content" element={<ContentManagement />} />
              <Route path="/partner/meal-planning" element={<MealPlanning />} />
              <Route path="/partner/announcements" element={<Announcements />} />
              <Route path="/partner/settings" element={<Settings />} />
              <Route path="/partner/support" element={<Support />} />
              
              {/* Admin routes - now public access */}
              <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/partners" element={<Partners />} />
              <Route path="/admin/partners/add" element={<AddPartner />} />
              <Route path="/admin/partners/map" element={<PartnersMap />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/customers/reports" element={<CustomerReports />} />
              <Route path="/admin/packages" element={<Packages />} />
              <Route path="/admin/packages/add" element={<AddPackage />} />
              <Route path="/admin/content/videos" element={<Videos />} />
              <Route path="/admin/content/blog" element={<Blog />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/partner-locator" element={<PartnerLocator />} />
              <Route path="/admin/email" element={<Email />} />
              <Route path="/admin/legal/terms" element={<Terms />} />
              <Route path="/admin/legal/policy" element={<Policy />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
