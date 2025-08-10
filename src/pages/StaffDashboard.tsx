import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStaffAuth } from '@/contexts/StaffAuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Calendar, Users, Settings } from 'lucide-react';
import EventsManager from '@/components/staff/EventsManager';
import ClubsManager from '@/components/staff/ClubsManager';
import FeaturedEventManager from '@/components/staff/FeaturedEventManager';

const StaffDashboard = () => {
  const { staff, logout, isLoading } = useStaffAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    if (!isLoading && !staff) {
      navigate('/staff/login');
    }
  }, [staff, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="animate-pulse text-brand-secondary">Loading...</div>
      </div>
    );
  }

  if (!staff) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-light animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-brand-neutral shadow-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Replaced Settings icon with SAC logo */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="/logos/sac-logo.png"
                  alt="SAC Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-brand-primary">SAC Dashboard</h1>
                <p className="text-sm text-brand-secondary">Welcome, {staff.full_name}</p>
              </div>
            </div>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 hover-scale border-brand-neutral text-brand-secondary"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-lg bg-white shadow-brand">
            <TabsTrigger 
              value="events" 
              className="flex items-center space-x-2 transition-all duration-200 data-[state=active]:bg-brand-primary data-[state=active]:text-brand-light"
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger 
              value="clubs"
              className="flex items-center space-x-2 transition-all duration-200 data-[state=active]:bg-brand-primary data-[state=active]:text-brand-light"
            >
              <Users className="w-4 h-4" />
              <span>Clubs</span>
            </TabsTrigger>
            <TabsTrigger 
              value="featured"
              className="flex items-center space-x-2 transition-all duration-200 data-[state=active]:bg-brand-primary data-[state=active]:text-brand-light"
            >
              <Settings className="w-4 h-4" />
              <span>Featured</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6 animate-fade-in">
            <EventsManager />
          </TabsContent>

          <TabsContent value="clubs" className="space-y-6 animate-fade-in">
            <ClubsManager />
          </TabsContent>

          <TabsContent value="featured" className="space-y-6 animate-fade-in">
            <FeaturedEventManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
