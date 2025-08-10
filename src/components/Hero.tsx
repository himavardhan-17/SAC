import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '@/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

interface FeaturedEvent {
  id: string;
  title: string;
  date: string;
  description: string;
}

//  Counter animation
const useCounter = (end: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(end / (duration / 30));
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 30);
    return () => clearInterval(interval);
  }, [end, duration]);
  return count;
};

//  Your local hero images
const heroImages = [
  "/hero/1.jpg",
  "/hero/2.jpg",
  "/hero/3.jpg",
  "/hero/4.jpg",
  "/hero/5.jpg"
];

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [featuredEvent, setFeaturedEvent] = useState<FeaturedEvent | null>(null);

  const clubsCount = useCounter(20);
  const membersCount = useCounter(500);
  const eventsCount = useCounter(50);

  //  Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  //  Load featured event from Firestore
  useEffect(() => {
    const loadFeaturedEvent = async () => {
      try {
        const q = query(collection(db, 'featured_event'), where('is_active', '==', true));
        const snapshot = await getDocs(q);
        if (snapshot.empty) throw new Error('No active featured event found');

        const featuredData = snapshot.docs[0].data();
        const eventId = featuredData.event_id;

        const eventDoc = await getDoc(doc(db, 'events', eventId));
        const eventData = eventDoc.data();

        if (!eventData) throw new Error('Event data not found');

        setFeaturedEvent({
          id: eventId,
          title: eventData.title,
          date: eventData.date,
          description: eventData.description,
        });
      } catch (err) {
        console.error('Failed to retrieve featured event:', err);
        setFeaturedEvent({
          id: 'fallback',
          title: 'Inter-Club Championship',
          date: 'March 15th',
          description: 'A celebration of collaboration, talent, and teamwork',
        });
      }
    };

    loadFeaturedEvent();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/*  Carousel background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
      ></div>

      {/* 🕶️ Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/*  Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/40 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute z-20 right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/40 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/*  Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center text-white">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center px-8 py-3 bg-brand-primary text-white font-semibold rounded-full">
              <span>Student Affairs Cell - Vardhaman College</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Empowering Student
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-light block">
                Excellence
              </span>
            </h1>

            <p className="text-xl leading-relaxed max-w-3xl mx-auto opacity-90">
              SAC serves as the heartbeat of student life, connecting passionate minds through 20+ clubs where interests thrive and leadership begins.
            </p>
          </div>

          {/*  Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/clubs"
              className="inline-flex items-center justify-center px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200"
            >
              Explore Clubs <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200"
            >
              Upcoming Events <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/*  Club Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{clubsCount}+</div>
              <div className="text-sm text-white opacity-80 font-medium">Clubs Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{membersCount}+</div>
              <div className="text-sm text-white opacity-80 font-medium">Student Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{eventsCount}+</div>
              <div className="text-sm text-white opacity-80 font-medium">Events Every Year</div>
            </div>
          </div>

          {/*  Featured Event */}
          {featuredEvent && (
            <div className="flex flex-col items-center justify-center px-10 py-6 bg-brand-primary text-white font-semibold rounded-full shadow-lg max-w-4xl mx-auto text-center space-y-2">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold">Next Big Event</h3>
              </div>
              <p className="text-base font-semibold">{featuredEvent.title}</p>
              <p className="text-sm text-white opacity-80">
                {featuredEvent.date} – {featuredEvent.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
