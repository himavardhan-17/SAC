import React, { useState } from 'react';
import { Menu, X, Users, Calendar, Trophy, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Home', route: '/', icon: null },
    { label: 'About SAC', route: '/about', icon: Users },
    { label: 'Clubs', route: '/clubs', icon: Trophy },
    { label: 'Events', route: '/events', icon: Calendar },
    { label: 'Contact', route: '/contact', icon: null },
    { label: 'Staff Login', route: '/staff/login', icon: ShieldCheck }
  ];

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background shadow-brand sticky top-0 z-50 border-b border-border backdrop-blur-md transition-all duration-300 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-4 group transition-all duration-500 ease-in-out">
            {/* VCE Logo with Sparkle */}
            <div className="relative w-12 h-12">
              <img
                src="/logos/vce-logo.png"
                alt="VCE Logo"
                className="w-full h-full rounded-full object-cover z-10 relative group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 z-0 animate-sparkle pointer-events-none" />
            </div>

            {/* SAC Logo with Sparkle */}
            <div className="relative w-12 h-12">
              <img
                src="/logos/sac-logo.png"
                alt="SAC Logo"
                className="w-full h-full rounded-full object-cover z-10 relative group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 z-0 animate-sparkle pointer-events-none" />
            </div>

            {/* Text */}
            <div className="hidden sm:block leading-tight ml-1 animate-slide-in-left">
              <h1 className="text-xl font-bold text-foreground">Student Affairs Cell</h1>
              <p className="text-xs text-muted-foreground">Vardhaman College of Engineering</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 items-center animate-slide-in-right">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.route}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-all duration-300 hover:scale-105 ${
                  isCurrent(link.route)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-muted transition-all"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in-down">
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.route}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-base font-medium flex items-center gap-2 transition-all duration-200 ${
                  isCurrent(link.route)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
