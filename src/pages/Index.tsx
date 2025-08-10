
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSAC from '../components/AboutSAC';
import ClubsSection from '../components/ClubsSection';
import EventsSection from '../components/EventsSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* <AboutSAC />
      <ClubsSection />
      <EventsSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
