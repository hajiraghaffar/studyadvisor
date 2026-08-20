// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import Layout
import Layout from "@/components/studyadvisor/Layout";

// IMPORT YOUR PAGES
import UniversitiesPage from "@/components/studyadvisor/UniversitiesPage";
import ProgramsPage from "@/components/studyadvisor/ProgramsPage";
import ChangePasswordPage from '@/components/studyadvisor/ChangePasswordPage'
import AdmissionPage from "@/components/studyadvisor/AdmissionPage";
import CounselingPage from "@/components/studyadvisor/CounselingPage";
import ServicesPage from "@/components/studyadvisor/ServicesPage";
import UniversityDetailPage from "@/components/studyadvisor/UniversityDetailPage";
import ProgramDetailPage from '@/components/studyadvisor/ProgramDetailPage';
import ForgetPasswordPage from '@/components/studyadvisor/ForgetPasswordPage'
import MyApplicationsPage from '@/components/studyadvisor/MyApplicationsPage';
import FAQPage from '@/components/studyadvisor/FAQPage';
import UniversityOffersPage from '@/components/studyadvisor/UniversityOffersPage';
import UniversityDashboard from '@/components/studyadvisor/UniversityDashboard';
import ComparePage from '@/components/studyadvisor/ComparePage';
import WishlistPage from '@/components/studyadvisor/WishlistPage';
import ResetPasswordPage from '@/components/studyadvisor/ResetPasswordPage';



const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Home page WITHOUT Layout (or WITH if you want navbar on home) */}
            <Route path="/" element={<Index />} />
            
            {/* All other pages WITH Layout (navbar will show) */}
            <Route path="/universities" element={
              <Layout>
                <UniversitiesPage />
              </Layout>
            } />
            
            <Route path="/programs" element={
              <Layout>
                <ProgramsPage />
              </Layout>
            } />
            <Route path="/change-password" element={
  <Layout>
    <ChangePasswordPage />
  </Layout>
} />

<Route path="/forget-password" element={
  <Layout>
    <ForgetPasswordPage />
  </Layout>
} />
            <Route path="/reset-password" element={
  <Layout>
    <ResetPasswordPage />
  </Layout>
} />
            <Route path="/admission" element={
              <Layout>
                <AdmissionPage />
              </Layout>
            } />
            
            <Route path="/counseling" element={
              <Layout>
                <CounselingPage />
              </Layout>
            } />
            
            <Route path="/services" element={
              <Layout>
                <ServicesPage />
              </Layout>
            } />
            
            <Route path="/university/:id" element={
              <Layout>
                <UniversityDetailPage />
              </Layout>
            } />
            
            <Route path="/program/:id" element={
              <Layout>
                <ProgramDetailPage />
              </Layout>
            } />
              <Route path="/my-applications" element={
              <Layout>
                <MyApplicationsPage />
              </Layout>
            } />
            <Route path="/faq" element={
              <Layout>
                <FAQPage />
              </Layout>
            } />
            <Route path="/university/offers" element={
              <Layout>
                <UniversityOffersPage />
              </Layout>
            } />
             <Route path="/university/dashboard" element={
              <Layout>
                <UniversityDashboard />
              </Layout>
            } />
            <Route path="/compare" element={
              <Layout>
                <ComparePage />
              </Layout>
            } />
            <Route path="/wishlist" element={
              <Layout>
                <WishlistPage />
              </Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;