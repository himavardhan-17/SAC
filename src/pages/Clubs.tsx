import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Code,
  Palette,
  BookOpen,
  Music,
  Calendar,
  Zap,
  Leaf,
  Flame,
  Film,
  Gamepad2,
  Dumbbell,
  ChefHat,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MotionLink = motion(Link);

const iconMap: Record<string, React.ElementType> = {
  Technical: Code,
  Cultural: Music,
  Literary: BookOpen,
  "Creative Arts": Palette,
  Environment: Leaf,
  Sensors: Flame,
  Cooking: ChefHat,
  Cinematics: Film,
  Sports: Dumbbell,
  Gaming: Gamepad2,
};

const colorMap: Record<string, string> = {
  Technical: "#3D52A0",
  Cultural: "#7091E6",
  Literary: "#8697C4",
  "Creative Arts": "#ADBBDA",
  Environment: "#A2D9A2",
  Sensors: "#F4B183",
  Cooking: "#FFD699",
  Cinematics: "#B28DFF",
  Sports: "#FFA07A",
  Gaming: "#88CDF6",
};

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

const Clubs = () => {
  const [clubsByCategory, setClubsByCategory] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "clubs"));
        const clubs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const grouped: Record<string, any[]> = {};
        for (const club of clubs) {
          const category = (club.category || "Others").trim();
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(club);
        }

        setClubsByCategory(grouped);
      } catch (err) {
        console.error("Failed to fetch clubs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) return null;

  if (!Object.keys(clubsByCategory).length) {
    return (
      <div className="text-center py-24 text-[#8697C4] min-h-screen">
        No clubs found. Please check back later.
      </div>
    );
  }

  return (
    <>
      {/* 🔥 Fixed video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-30 pointer-events-none"
      >
        <source src="/clubsvce.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay for readability */}
      {/* <div className="fixed inset-0 bg-[#EDEFF8]/60 -z-20 pointer-events-none" /> */}

      <div className="min-h-screen relative text-[#3D52A0] flex flex-col">
        <Navbar />

        <main className="flex-grow pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3D52A0]">
              Our Student Clubs
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white">
              Explore your interests and meet like-minded peers in over 20 active student clubs.
            </p>
          </div>

          {Object.entries(clubsByCategory).map(([category, clubs]) => {
            const Icon = iconMap[category] || Code;
            const bgColor = colorMap[category] || "#8697C4";

            return (
              <section key={category} className="mb-16">
                <div className="flex items-center mb-8">
                  <div
                    style={{ backgroundColor: bgColor }}
                    className="p-3 rounded-xl mr-4 flex items-center justify-center"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#3D52A0]">{category} Clubs</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {clubs.map((club) => {
                    const logoFile = slugify(club.name) + ".png";

                    return (
                      <MotionLink
                        key={club.id}
                        to={`/club/${club.id}`}
                        className="rounded-2xl shadow-lg overflow-hidden border border-[#ADBBDA] hover:border-[#7091E6] transition-colors duration-300"
                        style={{ backgroundColor: "#F5F8FF" }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0 15px 30px rgba(112,145,230,0.4)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <div className="p-8">
                          <div className="flex items-center justify-center w-20 h-20 bg-[#ADBBDA] rounded-full mx-auto mb-6 overflow-hidden">
                            <img
                              src={`/clubs/${logoFile}`}
                              alt={club.name}
                              className="w-20 h-20 object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/clubs/default.png";
                              }}
                            />
                          </div>

                          <h3 className="text-xl font-bold text-center mb-3 text-[#3D52A0]">
                            {club.name}
                          </h3>
                          <p className="text-[#738084] text-center mb-6">{club.description}</p>

                          <div className="flex justify-center items-center text-sm text-[#7091E6] mb-4 gap-6">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1 text-[#3D52A0]" />
                              <span>{club.events_conducted || 0} events</span>
                            </div>

                            {club.socials?.instagram && (
                              <a
                                href={club.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-400 hover:text-pink-500"
                                aria-label={`${club.name} Instagram`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  className="w-5 h-5"
                                >
                                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.5 2a1 1 0 110 2 1 1 0 010-2zm-4.25 1.5a5.75 5.75 0 110 11.5 5.75 5.75 0 010-11.5zm0 1.5a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5z" />
                                </svg>
                              </a>
                            )}

                            {club.socials?.linkedin && (
                              <a
                                href={club.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-500"
                                aria-label={`${club.name} LinkedIn`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  className="w-5 h-5"
                                >
                                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7 0h4.7v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.3 0 6.3 3.5 6.3 8v9.5H17V15.3c0-2.9-.1-6.6-4-6.6-4 0-4.6 3.1-4.6 6.4V24H7V8z" />
                                </svg>
                              </a>
                            )}
                          </div>

                          <div className="text-center">
                            <span className="inline-flex items-center text-[#7091E6] font-semibold group cursor-pointer">
                              Learn More
                              <Zap className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </MotionLink>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Clubs;
