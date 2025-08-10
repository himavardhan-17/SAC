// src/components/PageTransitionWrapper.tsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Index from "../pages/Index";
import About from "../pages/About";
import Clubs from "../pages/Clubs";
import ClubDetail from "../pages/ClubDetail";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import StaffLogin from "../pages/StaffLogin";
import StaffDashboard from "../pages/StaffDashboard";
import NotFound from "../pages/NotFound";

import PageTransitionLoader from "./PageTransitionLoader";

const PageTransitionWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);

  const transitionRoutes = ["/about", "/events", "/contact"];

  useEffect(() => {
    if (nextPath && !showTransition) {
      navigate(nextPath);
      setNextPath(null);
    }
  }, [showTransition, nextPath, navigate]);

  const handleRouteChange = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (path === location.pathname) return;

    if (!transitionRoutes.includes(path)) {
      navigate(path);
      return;
    }

    setShowTransition(true);
    setNextPath(path);

    setTimeout(() => {
      setShowTransition(false);
    }, 6000); // duration of video
  };

  const shouldShowLoader =
    showTransition && transitionRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowLoader && <PageTransitionLoader />}

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
    </>
  );
};

export default PageTransitionWrapper;
