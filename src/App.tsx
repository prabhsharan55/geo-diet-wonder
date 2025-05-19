
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import Nutritionists from "./pages/Nutritionists";
import Journal from "./pages/Journal";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupPage from "./pages/SignupPage";

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
      refetchOnWindowFocus: false, // Prevent excessive refetching
      retry: 1, // Limit retries to prevent loops
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
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<SignupPage />} /> {/* Add new signup route */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/cgm" element={<ShopCGM />} />
            <Route path="/shop/workouts" element={<ShopWorkouts />} />
            <Route path="/shop/diet" element={<ShopDiet />} />
            <Route path="/nutritionists" element={<Nutritionists />} />
            <Route path="/nutritionists/find" element={<NutritionistsFind />} />
            <Route path="/nutritionists/become" element={<NutritionistsBecome />} />
            <Route path="/nutritionists/about" element={<NutritionistsAbout />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<ArticleDetail />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected dashboard route - redirects based on role */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Customer dashboard routes */}
            <Route path="/customer" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/customer/program" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerProgram />
              </ProtectedRoute>
            } />
            <Route path="/customer/cgm" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerCGMTracker />
              </ProtectedRoute>
            } />
            <Route path="/customer/coach" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerGeoDietCoach />
              </ProtectedRoute>
            } />
            <Route path="/customer/progress" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerProgress />
              </ProtectedRoute>
            } />
            <Route path="/customer/ask-coach" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerAskCoach />
              </ProtectedRoute>
            } />
            <Route path="/customer/videos" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerVideos />
              </ProtectedRoute>
            } />
            <Route path="/customer/settings" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerSettings />
              </ProtectedRoute>
            } />
            <Route path="/customer/support" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerSupport />
              </ProtectedRoute>
            } />
            
            {/* Partner dashboard routes */}
            <Route path="/partner" element={
              <ProtectedRoute requiredRole="partner">
                <PartnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/partner/clients" element={
              <ProtectedRoute requiredRole="partner">
                <ClientManagement />
              </ProtectedRoute>
            } />
            <Route path="/partner/requests" element={
              <ProtectedRoute requiredRole="partner">
                <AccessRequests />
              </ProtectedRoute>
            } />
            <Route path="/partner/reports" element={
              <ProtectedRoute requiredRole="partner">
                <PartnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/partner/plans" element={
              <ProtectedRoute requiredRole="partner">
                <PlansManagement />
              </ProtectedRoute>
            } />
            <Route path="/partner/content" element={
              <ProtectedRoute requiredRole="partner">
                <ContentManagement />
              </ProtectedRoute>
            } />
            <Route path="/partner/announcements" element={
              <ProtectedRoute requiredRole="partner">
                <Announcements />
              </ProtectedRoute>
            } />
            <Route path="/partner/settings" element={
              <ProtectedRoute requiredRole="partner">
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/partner/support" element={
              <ProtectedRoute requiredRole="partner">
                <Support />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<Navigate to="/auth" replace />} />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/partners" element={
              <ProtectedRoute requiredRole="admin">
                <Partners />
              </ProtectedRoute>
            } />
            <Route path="/admin/partners/add" element={
              <ProtectedRoute requiredRole="admin">
                <AddPartner />
              </ProtectedRoute>
            } />
            <Route path="/admin/partners/map" element={
              <ProtectedRoute requiredRole="admin">
                <PartnersMap />
              </ProtectedRoute>
            } />
            <Route path="/admin/customers" element={
              <ProtectedRoute requiredRole="admin">
                <Customers />
              </ProtectedRoute>
            } />
            <Route path="/admin/customers/reports" element={
              <ProtectedRoute requiredRole="admin">
                <CustomerReports />
              </ProtectedRoute>
            } />
            <Route path="/admin/packages" element={
              <ProtectedRoute requiredRole="admin">
                <Packages />
              </ProtectedRoute>
            } />
            <Route path="/admin/packages/add" element={
              <ProtectedRoute requiredRole="admin">
                <AddPackage />
              </ProtectedRoute>
            } />
            <Route path="/admin/content/videos" element={
              <ProtectedRoute requiredRole="admin">
                <Videos />
              </ProtectedRoute>
            } />
            <Route path="/admin/content/blog" element={
              <ProtectedRoute requiredRole="admin">
                <Blog />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute requiredRole="admin">
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/admin/partner-locator" element={
              <ProtectedRoute requiredRole="admin">
                <PartnerLocator />
              </ProtectedRoute>
            } />
            <Route path="/admin/email" element={
              <ProtectedRoute requiredRole="admin">
                <Email />
              </ProtectedRoute>
            } />
            <Route path="/admin/legal/terms" element={
              <ProtectedRoute requiredRole="admin">
                <Terms />
              </ProtectedRoute>
            } />
            <Route path="/admin/legal/policy" element={
              <ProtectedRoute requiredRole="admin">
                <Policy />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <AdminSettings />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
