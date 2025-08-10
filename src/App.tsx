import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { StaffAuthProvider } from "./contexts/StaffAuthContext";

import Index from "./pages/Index";
import About from "./pages/About";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import ClubDetail from "./pages/ClubDetail";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import NotFound from "./pages/NotFound";

import Preloader from "./components/Preloader";
import PageTransitionLoader from "./components/PageTransitionLoader";

const queryClient = new QueryClient();

const transitionRoutes = ["/about",  "/contact"];

const AppContent: React.FC = () => {
  const location = useLocation();
  const [showTransition, setShowTransition] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (
      location.pathname !== currentPath &&
      transitionRoutes.includes(location.pathname)
    ) {
      setShowTransition(true);
      const timer = setTimeout(() => {
        setShowTransition(false);
        setCurrentPath(location.pathname);
      }, 6000); // Video duration

      return () => clearTimeout(timer);
    } else {
      setCurrentPath(location.pathname);
    }
  }, [location.pathname, currentPath]);

  return (
    <>
      {showTransition && <PageTransitionLoader />}
      {!showTransition && (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/club/:clubId" element={<ClubDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

const App: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (showPreloader) return <Preloader />;

  return (
    <QueryClientProvider client={queryClient}>
      <StaffAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </StaffAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
