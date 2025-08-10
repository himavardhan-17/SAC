import React from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary text-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-bold">Student Affairs Cell</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              We foster personal and professional growth by supporting a wide range of clubs, initiatives, and events at Vardhaman College of Engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-brand-secondary transition-colors">About SAC</a></li>
              <li><a href="/clubs" className="hover:text-brand-secondary transition-colors">Clubs</a></li>
              <li><a href="/events" className="hover:text-brand-secondary transition-colors">Events</a></li>
              <li><a href="/contact" className="hover:text-brand-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-bold">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="w-4 h-4 text-brand-secondary" />
                <span>sacell@vardhaman.org</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="w-4 h-4 text-brand-secondary" />
                <span>+91 97015 26805</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-secondary" />
                <span>VCE Campus, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-bold">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.instagram.com/student_affairs_vce/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-light hover:text-pink-400 transition-colors duration-200"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@studentaffairscell-vardham2026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-light hover:text-red-500 transition-colors duration-200"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-brand-light border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
          Brought to you by the Connect Club
          </p>
          <p className="text-sm opacity-80 mt-1">
            &copy; {new Date().getFullYear()} Vardhaman College of Engineering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
