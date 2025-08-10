import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Trophy,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (videoRef.current) {
        videoRef.current.muted = newMuted;
      }
      return newMuted;
    });
  };

  const categoryColors = {
    Technical: 'bg-blue-100 text-blue-800 border-blue-200',
    Cultural: 'bg-purple-100 text-purple-800 border-purple-200',
    Literary: 'bg-green-100 text-green-800 border-green-200',
    Arts: 'bg-orange-100 text-orange-800 border-orange-200',
    'Multi-Club': 'bg-pink-100 text-pink-800 border-pink-200',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading events...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* 🔊 Background Video */}
      <video
        ref={videoRef}
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="campus.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />
      {/* Overlay for readability */}
      {/* <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" /> */}

      {/* 🔇 Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-30 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition backdrop-blur"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-black" /> : <Volume2 className="w-5 h-5 text-black" />}
      </button>

      {/* Page Content */}
      <div className="relative z-20">
        <Navbar />

        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Campus Events Calendar
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Keep track of everything happening across campus — from tech fests to art shows, and everything in between.
              </p>
            </div>

            {/* Featured Events */}
            {events.some((e) => e.featured) && (
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <h2 className="text-2xl font-bold text-white">Featured Events</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {events
                    .filter((e) => e.featured)
                    .map((event) => (
                      <EventCard key={event.id} event={event} categoryColors={categoryColors} full />
                    ))}
                </div>
              </div>
            )}

            {/* All Events */}
            <h2 className="text-2xl font-bold text-white mb-6">All Upcoming Events</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} categoryColors={categoryColors} />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

const EventCard = ({
  event,
  categoryColors,
  full = false,
}: {
  event: any;
  categoryColors: any;
  full?: boolean;
}) => (
  <div
    className={`bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
      full ? 'hover:shadow-2xl' : 'hover:shadow-lg'
    }`}
  >
    <div className={`p-${full ? '8' : '6'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`text-${full ? '5xl' : '3xl'}`}>{event.image || '🎉'}</div>
        <span
          className={`${
            categoryColors[event.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
          } px-3 py-1 rounded-full text-sm font-medium border`}
        >
          {event.category}
        </span>
      </div>

      <h3 className={`text-${full ? '2xl' : 'lg'} font-bold text-gray-900 mb-2`}>{event.title}</h3>
      <p className="text-gray-700 mb-4">{event.description}</p>

      <div className="space-y-2 text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          <span>Organized by {event.organizer}</span>
        </div>
        <div className="flex items-center">
          <Trophy className="w-4 h-4 mr-2" />
          <span>{event.registrations} registrations</span>
        </div>
      </div>
    </div>
  </div>
);

export default Events;
