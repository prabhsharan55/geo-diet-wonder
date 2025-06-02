import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserDataContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PartnerSignup from "./pages/PartnerSignup";
import Shop from "./pages/Shop";
import ShopCGM from "./pages/ShopCGM";
import ShopWorkouts from "./pages/ShopWorkouts";
import ShopDiet from "./pages/ShopDiet";
import Nutritionists from "./pages/Nutritionists";
import NutritionistsFind from "./pages/NutritionistsFind";
import NutritionistsBecome from "./pages/NutritionistsBecome";
import NutritionistsAbout from "./pages/NutritionistsAbout";
import Journal from "./pages/Journal";
import ArticleDetail from "./pages/ArticleDetail";
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
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplicationStatus from "./pages/partner/ApplicationStatus";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <UserDataProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/partner-signup" element={<PartnerSignup />} />
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

              {/* Protected Customer Routes */}
              <Route
                path="/customer"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/program"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerProgram />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/videos"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerVideos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/progress"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerProgress />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/cgm-tracker"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerCGMTracker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/coach"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <GeoDietCoach />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/ask-coach"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <AskCoach />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/support"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerSupport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/settings"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerSettings />
                  </ProtectedRoute>
                }
              />

              {/* Protected Partner Routes */}
              <Route
                path="/partner"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PartnerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/application-status"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <ApplicationStatus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/client-management"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <ClientManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/access-requests"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <AccessRequests />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/plans-management"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PlansManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/meal-planning"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <MealPlanning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/content-management"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <ContentManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/announcements"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <Announcements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/support"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PartnerSupport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/settings"
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PartnerSettings />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              {/* Protected Admin Routes */}

              {/* Fallback route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </UserDataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
