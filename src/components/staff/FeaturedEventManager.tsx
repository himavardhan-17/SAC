import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '@/firebase'; // ✅ make sure this exports `db`
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Star, Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface FeaturedEvent {
  id: string;
  event_id: string;
  is_active: boolean;
}

const FeaturedEventManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
    fetchFeatured();
  }, []);

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'events'));
      const eventsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Event[];
      setEvents(eventsList);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to fetch events', variant: 'destructive' });
    }
  };

  const fetchFeatured = async () => {
    try {
      const q = query(collection(db, 'featured_event'), where('is_active', '==', true));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data() as FeaturedEvent;
        const eventRef = doc(db, 'events', docData.event_id);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          setFeaturedEvent({ id: eventSnap.id, ...eventSnap.data() } as Event);
          setSelectedEventId(eventSnap.id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeaturedEvent = async () => {
    if (!selectedEventId) {
      toast({
        title: 'Error',
        description: 'Please select an event',
        variant: 'destructive'
      });
      return;
    }

    try {
      // deactivate all existing
      const q = query(collection(db, 'featured_event'), where('is_active', '==', true));
      const snapshot = await getDocs(q);
      await Promise.all(
        snapshot.docs.map((docSnap) =>
          updateDoc(doc(db, 'featured_event', docSnap.id), { is_active: false })
        )
      );

      // insert new
      await addDoc(collection(db, 'featured_event'), {
        event_id: selectedEventId,
        is_active: true
      });

      toast({
        title: 'Success',
        description: 'Featured event updated successfully'
      });

      fetchFeatured();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update featured event',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) return <div className="text-center py-8 animate-pulse">Loading featured event manager...</div>;

  return (
    <Card className="bg-white shadow-brand border-0">
      <CardHeader>
        <CardTitle className="text-brand-primary flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>Next Big Event Manager</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {featuredEvent && (
          <div className="bg-brand-light p-4 rounded-lg border border-brand-neutral">
            <h3 className="font-semibold text-brand-primary mb-2">Currently Featured:</h3>
            <div className="flex items-center space-x-2 text-brand-secondary">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{featuredEvent.title}</span>
            </div>
            <p className="text-sm text-brand-secondary mt-1">{featuredEvent.date}</p>
            <p className="text-sm text-brand-secondary mt-1">{featuredEvent.description}</p>
          </div>
        )}

        <div className="space-y-4">
          <label className="text-sm font-medium text-brand-primary">Select New Featured Event:</label>
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger className="border-brand-neutral focus:border-brand-primary">
              <SelectValue placeholder="Choose an event to feature" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-brand-secondary">{event.date}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={updateFeaturedEvent}
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-brand-light transition-all duration-200 hover-scale"
        >
          Update Featured Event
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedEventManager;
