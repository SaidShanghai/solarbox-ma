import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

// Critical: eagerly loaded (landing page)
import Index from "./pages/Index";

// Lazy-loaded routes
const Diagnostic = lazy(() => import("./pages/Diagnostic"));
const Results = lazy(() => import("./pages/Results"));
const Profil = lazy(() => import("./pages/Profil"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CGV = lazy(() => import("./pages/CGV"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NosSolutions = lazy(() => import("./pages/NosSolutions"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/diagnostic" element={<Diagnostic />} />
              <Route path="/resultats" element={<Results />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/admin" element={<Navigate to="/profil" replace />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cgv" element={<CGV />} />
              <Route path="/nos-solutions" element={<NosSolutions />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<Navigate to="/a-propos" replace />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
