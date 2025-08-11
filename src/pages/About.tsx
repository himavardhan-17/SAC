// src/pages/About.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Lightbulb, Rocket } from 'lucide-react';

const About = () => {
  

  const timeline = [
    { year: "2020", event: "Founded SAC", description: "Official launch of the Student Affairs Cell." },
    { year: "2021", event: "First Tech Fest", description: "Hosted VCE’s inaugural technology festival." },
    { year: "2022", event: "20+ Clubs Onboarded", description: "Expanded to more than 20 active student clubs." },
    { year: "2023", event: "Inter-College Debuts", description: "Initiated cross-college competitions and fests." },
    { year: "2024", event: "500+ Members Strong", description: "Grew to a thriving community of 500+ active students." }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0 opacity-100"
      >
        <source src="/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional: Remove or modify the overlay to prevent blocking the video */}
      {/* <div className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-sm bg-transparent" /> */}

      <div className="relative z-20">
        <Navbar />

        {/* Intro Banner */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md mb-6">
              The Story Behind
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 block">
                Student Affairs Cell
              </span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto">
              More than just an organization—SAC is a student-powered movement turning campus life into a journey of growth, creativity, and community.
            </p>
          </div>
        </motion.section>

        {/* Mission and Values */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-blue">How It All Started</h2>
              <p className="text-lg text-black/80 leading-relaxed">
                A few years ago, students at VCE noticed something missing — while academics thrived, there wasn’t a common ground for creativity, passion, and talent to shine.
              </p>
              <p className="text-lg text-black/80 leading-relaxed">
                That realization sparked the creation of SAC — not a top-down committee, but a student-led initiative aimed at empowering peers, celebrating individuality, and reimagining college life.
              </p>
              <div className="bg-blue-50 bg-opacity-60 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Rocket className="w-5 h-5 mr-2" />
                  Our Mission Today
                </h3>
                <p className="text-blue-800">
                  To create a vibrant campus environment where every student is encouraged, supported, and celebrated for who they are and what they love to do.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/80 rounded-2xl shadow-xl p-8 space-y-6 backdrop-blur"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 text-center">Our Core Values</h3>
              <div className="space-y-4">
                {[{ icon: <Heart className="w-6 h-6 text-blue-600" />, title: "Passion", desc: "We act with heart, energy, and care in every initiative." },
                  { icon: <Target className="w-6 h-6 text-purple-600" />, title: "Purpose", desc: "Everything we do aligns with a bigger impact for students." },
                  { icon: <Users className="w-6 h-6 text-green-600" />, title: "Community", desc: "We're stronger together — SAC thrives on student bonds." },
                  { icon: <Lightbulb className="w-6 h-6 text-orange-600" />, title: "Innovation", desc: "We’re never static — always exploring new ways to engage." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg flex-shrink-0 ${i === 0 ? 'bg-blue-100' : i === 1 ? 'bg-purple-100' : i === 2 ? 'bg-green-100' : 'bg-orange-100'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Leadership */}
      

        {/* Timeline */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Milestones That Define Us</h2>
            <p className="text-xl text-gray-600">Here’s a glimpse of our growth and key moments.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            <div className="space-y-20">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  className={`flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{entry.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{entry.event}</h3>
                      <p className="text-gray-600">{entry.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;
