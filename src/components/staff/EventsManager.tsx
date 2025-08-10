import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Calendar, MapPin, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  featured: boolean;
  registrations: number;
}

const EventsManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Omit<Event, 'id' | 'registrations'>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    organizer: '',
    featured: false
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const fetchedEvents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        registrations: 0, // Default if not in Firestore
        ...doc.data()
      })) as Event[];

      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({ title: 'Error', description: 'Failed to fetch events', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingEvent) {
        const eventRef = doc(db, 'events', editingEvent.id);
        await updateDoc(eventRef, {
          ...formData,
          updated_at: serverTimestamp()
        });
        toast({ title: 'Success', description: 'Event updated successfully' });
      } else {
        await addDoc(collection(db, 'events'), {
          ...formData,
          registrations: 0,
          created_at: serverTimestamp()
        });
        toast({ title: 'Success', description: 'Event created successfully' });
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({ title: 'Error', description: 'Failed to save event', variant: 'destructive' });
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({ ...event });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteDoc(doc(db, 'events', id));
      toast({ title: 'Success', description: 'Event deleted successfully' });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({ title: 'Error', description: 'Failed to delete event', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      organizer: '',
      featured: false
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  if (isLoading) {
    return <div className="text-center py-8 animate-pulse text-brand-secondary">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-primary">Events Management</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-brand-primary hover:bg-brand-primary/90 text-brand-light transition-all duration-300 hover-scale"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {showForm && (
        <Card className="bg-white shadow-brand border-0 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-brand-primary">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['title', 'category', 'date', 'time', 'location', 'organizer'] as const).map((field) => (
                  <Input
                    key={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    required
                    className="border-brand-neutral focus:border-brand-primary transition-all duration-200"
                  />
                ))}
              </div>

              <Textarea
                placeholder="Event Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-brand-neutral focus:border-brand-primary transition-all duration-200"
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm text-brand-secondary">Featured Event</label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-brand-primary text-brand-light">
                  {editingEvent ? 'Update' : 'Create'} Event
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="bg-white shadow-brand border-0 hover:shadow-brand-lg transition-all duration-300 hover-scale">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-brand-neutral rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-brand-primary flex items-center space-x-2">
                      <span>{event.title}</span>
                      {event.featured && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
                    </CardTitle>
                    <p className="text-sm text-brand-secondary">{event.category}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-brand-secondary">{event.description}</p>
              <div className="space-y-2 text-sm text-brand-secondary">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-brand-primary" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-purple-600" />
                  <span>{event.registrations} registrations</span>
                </div>
              </div>
              <div className="text-xs text-brand-secondary border-t border-brand-neutral pt-2">
                Organized by: {event.organizer}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsManager;
