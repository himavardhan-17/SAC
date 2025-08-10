import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import slugify from 'slugify';
import { Mail, Phone, ArrowLeft, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const ClubDetail = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        if (!clubId) {
          setClub(null);
          setLoading(false);
          return;
        }
        const docRef = doc(db, 'clubs', clubId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setClub({ id: docSnap.id, ...docSnap.data() });
        } else {
          setClub(null);
        }
      } catch (err) {
        console.error('Error fetching club:', err);
        setClub(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubId]);

  const getClubLogoPath = (name: string) => {
    const slug = slugify(name, { lower: true, strict: true, replacement: '_' });
    return `/clubs/${slug}.png`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#383B65] flex justify-center items-center">
        <div className="text-gray-300 text-xl">Loading club details...</div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-[#383B65] text-gray-300 flex flex-col">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Club Not Found</h1>
            <Link to="/clubs" className="text-blue-400 hover:text-blue-600">
              ← Back to Clubs
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-300 overflow-hidden">
      {/* 🔒 Fixed Background Video (Muted) */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/sac_clubdetails.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* 🔳 Overlay to darken */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10" />

      <div className="relative z-20">
        <Navbar />
        <motion.main
          className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/clubs"
            className="inline-flex items-center text-blue-400 hover:text-blue-600 mb-8 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clubs
          </Link>

          {/* Club Info Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg overflow-hidden mb-12 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-6">
              <img
                src={getClubLogoPath(club.name)}
                alt={club.name}
                className="w-24 h-24 object-contain rounded-xl bg-white/10"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = '/clubs/default.png';
                }}
              />
              <div className="mt-4 md:mt-0">
                <h1 className="text-4xl font-bold mb-2 text-white">{club.name || 'Untitled Club'}</h1>
                <p className="text-xl text-gray-300">{club.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <Stat title="Active Members" value={club.members || 0} color="blue" />
              <Stat title="Events This Year" value={club.events_conducted || 0} color="purple" />
              <Stat title="Established" value={club.established_year || 'N/A'} color="green" />
              <Stat title="Category" value={club.category || 'Uncategorized'} color="orange" />
            </div>

            {(club.socials?.instagram || club.socials?.linkedin || club.socials?.whatsapp) && (
              <div className="mt-8 flex space-x-6 text-gray-300">
                {club.socials.instagram && (
                  <SocialLink url={club.socials.instagram} label="Instagram" icon={<Instagram className="w-6 h-6" />} />
                )}
                {club.socials.linkedin && (
                  <SocialLink url={club.socials.linkedin} label="LinkedIn" icon={<Linkedin className="w-6 h-6" />} />
                )}
                {club.socials.whatsapp && (
                  <SocialLink url={club.socials.whatsapp} label="WhatsApp" icon={<WhatsappIcon />} />
                )}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {club.mission && <SectionCard title="Our Mission" content={club.mission} />}

              {Array.isArray(club.what_we_do) && club.what_we_do.length > 0 && (
                <SectionCard title="What We Do">
                  <ul className="space-y-4">
                    {club.what_we_do.map((activity: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <p>{activity}</p>
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              )}

              {Array.isArray(club.recent_events) && club.recent_events.length > 0 && (
                <SectionCard title="Recent Events">
                  <div className="space-y-6">
                    {club.recent_events.map((event: any, i: number) => (
                      <div key={i} className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                        <p className="text-blue-300 text-sm mb-2">
                          {event.date || 'Date Unknown'} • {event.participants || 0} participants
                        </p>
                        <p>{event.description}</p>

                        {(event.socials?.instagram || event.socials?.linkedin) && (
                          <div className="flex space-x-4 mt-2 text-gray-400">
                            {event.socials.instagram && (
                              <SocialLink url={event.socials.instagram} label="Instagram" icon={<Instagram className="w-5 h-5" />} />
                            )}
                            {event.socials.linkedin && (
                              <SocialLink url={event.socials.linkedin} label="LinkedIn" icon={<Linkedin className="w-5 h-5" />} />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}
            </div>

            <div className="space-y-8">
              {club.leadership && (
                <SectionCard title="Leadership Team">
                  <div className="space-y-6">
                    {club.leadership.president && (
                      <LeaderCard {...club.leadership.president} position="President" />
                    )}
                    {club.leadership.vice_president && (
                      <LeaderCard {...club.leadership.vice_president} position="Vice President" />
                    )}
                    {club.leadership.secretary && (
                      <LeaderCard {...club.leadership.secretary} position="Secretary" />
                    )}
                  </div>
                </SectionCard>
              )}

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white text-center cursor-pointer select-none">
                <h3 className="text-xl font-bold mb-4">Interested in Joining?</h3>
                <p className="mb-6">Become part of a thriving student community!</p>
                <button className="bg-white text-[#039494] font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </motion.main>
        <Footer />
      </div>
    </div>
  );
};

// Utility Components

const SectionCard = ({ title, content, children }: any) => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-8">
    <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
    {content && <p className="text-gray-300 leading-relaxed">{content}</p>}
    {children}
  </div>
);

const Stat = ({ title, value, color }: { title: string; value: string | number; color: string }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold text-${color}-400`}>{value}</div>
    <div className="text-sm text-gray-400">{title}</div>
  </div>
);

const LeaderCard = ({ name, position, email, phone, socials }: any) => (
  <div className="text-left space-y-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-md border border-white/10">
    <h3 className="font-semibold text-white">{name}</h3>
    <p className="text-blue-400 text-sm font-medium">{position}</p>
    <div className="space-y-1">
      {email && <ContactRow icon={<Mail className="w-4 h-4 mr-1" />} text={<a href={`mailto:${email}`} className="hover:underline">{email}</a>} />}
      {phone && <ContactRow icon={<Phone className="w-4 h-4 mr-1" />} text={<a href={`tel:${phone}`} className="hover:underline">{phone}</a>} />}
      {(socials?.instagram || socials?.linkedin || socials?.whatsapp) && (
        <div className="flex space-x-4 mt-1 text-gray-300">
          {socials.instagram && <SocialLink url={socials.instagram} label="Instagram" icon={<Instagram className="w-5 h-5" />} />}
          {socials.linkedin && <SocialLink url={socials.linkedin} label="LinkedIn" icon={<Linkedin className="w-5 h-5" />} />}
          {socials.whatsapp && <SocialLink url={socials.whatsapp} label="WhatsApp" icon={<WhatsappIcon />} />}
        </div>
      )}
    </div>
  </div>
);

const ContactRow = ({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) => (
  <div className="flex items-center text-sm text-gray-400">{icon}<span className="truncate">{text}</span></div>
);

const SocialLink = ({ url, label, icon }: { url: string; label: string; icon: React.ReactNode }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-[#039494]">
    {icon}
  </a>
);

const WhatsappIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.52 3.478A11.815 11.815 0 0012 0C5.373 0 0 5.373 0 12c0 2.117.553 4.1 1.515 5.87L0 24l6.263-1.536A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12 0-3.21-1.252-6.222-3.48-8.522zm-8.42 16.102a7.82 7.82 0 01-4.198-1.224l-.3-.18-2.949.724.787-2.88-.196-.297a7.807 7.807 0 01-.387-.657c-.05-.1-.1-.183-.15-.263a7.788 7.788 0 01-1.092-3.556 7.828 7.828 0 011.835-5.265c.04-.06.08-.123.126-.185.01-.015.027-.04.042-.056a7.801 7.801 0 012.54-2.33c.02-.01.037-.015.055-.024a7.825 7.825 0 013.03-.777c.385 0 .752.07 1.088.21a7.827 7.827 0 015.5 6.554c.018.13.03.26.04.388a7.79 7.79 0 01-.514 3.457c-.033.065-.067.13-.102.195a7.824 7.824 0 01-5.22 4.518z" />
  </svg>
);

export default ClubDetail;
