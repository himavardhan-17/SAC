import React, { useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const defaultForm = {
  name: '',
  description: '',
  category: '',
  logo: '',
  events_conducted: 0,
  mission: '',
  established_year: new Date().getFullYear(),
  socials: { instagram: '', linkedin: '' },
  what_we_do: [''],
  recent_events: [{ name: '', date: '', description: '', participants: 0 }],
  leadership: [
    { role: 'President', name: '', email: '', phone: '', instagram: '', linkedin: '' },
    { role: 'Vice President', name: '', email: '', phone: '', instagram: '', linkedin: '' },
    { role: 'Secretary', name: '', email: '', phone: '', instagram: '', linkedin: '' }
  ]
};

const ClubsManager = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>(defaultForm);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    const querySnapshot = await getDocs(collection(db, 'clubs'));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setClubs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        updated_at: serverTimestamp(),
        events_conducted: Number(formData.events_conducted),
        established_year: Number(formData.established_year)
      };

      if (isEditing) {
        await updateDoc(doc(db, 'clubs', isEditing), payload);
        toast({ title: 'Club updated successfully' });
      } else {
        await addDoc(collection(db, 'clubs'), {
          ...payload,
          created_at: serverTimestamp()
        });
        toast({ title: 'Club added successfully' });
      }

      fetchClubs();
      resetForm();
    } catch (error) {
      console.error(error);
      toast({ title: 'Error saving club', variant: 'destructive' });
    }
  };

  const handleEdit = (club: any) => {
    setFormData({
      ...defaultForm,
      ...club,
      what_we_do: Array.isArray(club.what_we_do) ? club.what_we_do : [''],
      recent_events: Array.isArray(club.recent_events)
        ? club.recent_events
        : [{ name: '', date: '', description: '', participants: 0 }],
      leadership: Array.isArray(club.leadership)
        ? club.leadership
        : defaultForm.leadership,
      socials: club.socials || { instagram: '', linkedin: '' }
    });
    setIsEditing(club.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this club?')) return;
    await deleteDoc(doc(db, 'clubs', id));
    toast({ title: 'Club deleted' });
    fetchClubs();
  };

  const resetForm = () => {
    setFormData(defaultForm);
    setIsEditing(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-primary">Clubs Management</h2>
        <Button onClick={() => setShowForm(true)} className="bg-brand-primary text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Club
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Club' : 'Add New Club'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['name', 'description', 'category', 'logo', 'mission', 'events_conducted', 'established_year'].map(field => (
                  <Input
                    key={field}
                    placeholder={field}
                    value={formData[field]}
                    onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                    required
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Instagram URL"
                  value={formData.socials.instagram}
                  onChange={e => setFormData({ ...formData, socials: { ...formData.socials, instagram: e.target.value } })}
                />
                <Input
                  placeholder="LinkedIn URL"
                  value={formData.socials.linkedin}
                  onChange={e => setFormData({ ...formData, socials: { ...formData.socials, linkedin: e.target.value } })}
                />
              </div>

              <div className="space-y-2">
                <label>What We Do</label>
                {formData.what_we_do.map((item: string, idx: number) => (
                  <Input
                    key={idx}
                    value={item}
                    onChange={e => {
                      const updated = [...formData.what_we_do];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, what_we_do: updated });
                    }}
                  />
                ))}
                <Button type="button" variant="outline" onClick={() => setFormData({ ...formData, what_we_do: [...formData.what_we_do, ''] })}>
                  Add Activity
                </Button>
              </div>

              <div className="space-y-2">
                <label>Recent Events</label>
                {formData.recent_events.map((event: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['name', 'date', 'description', 'participants'].map(field => (
                      <Input
                        key={field}
                        placeholder={field}
                        value={event[field]}
                        onChange={e => {
                          const updated = [...formData.recent_events];
                          updated[idx][field] = e.target.value;
                          setFormData({ ...formData, recent_events: updated });
                        }}
                      />
                    ))}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => setFormData({
                  ...formData,
                  recent_events: [...formData.recent_events, { name: '', date: '', description: '', participants: 0 }]
                })}>
                  Add Recent Event
                </Button>
              </div>

              <div className="space-y-2">
                <label>Leadership</label>
                {formData.leadership.map((leader: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-2">
                    <Input value={leader.role} readOnly />
                    <Input placeholder="Name" value={leader.name} onChange={e => {
                      const updated = [...formData.leadership];
                      updated[idx].name = e.target.value;
                      setFormData({ ...formData, leadership: updated });
                    }} />
                    <Input placeholder="Email" value={leader.email} onChange={e => {
                      const updated = [...formData.leadership];
                      updated[idx].email = e.target.value;
                      setFormData({ ...formData, leadership: updated });
                    }} />
                    <Input placeholder="Phone" value={leader.phone} onChange={e => {
                      const updated = [...formData.leadership];
                      updated[idx].phone = e.target.value;
                      setFormData({ ...formData, leadership: updated });
                    }} />
                    <Input placeholder="Instagram" value={leader.instagram} onChange={e => {
                      const updated = [...formData.leadership];
                      updated[idx].instagram = e.target.value;
                      setFormData({ ...formData, leadership: updated });
                    }} />
                    <Input placeholder="LinkedIn" value={leader.linkedin} onChange={e => {
                      const updated = [...formData.leadership];
                      updated[idx].linkedin = e.target.value;
                      setFormData({ ...formData, leadership: updated });
                    }} />
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-brand-primary text-white">
                  {isEditing ? 'Update Club' : 'Create Club'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {clubs.map(club => (
          <Card key={club.id} className="shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{club.name}</CardTitle>
                  <p className="text-sm text-gray-500">{club.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(club)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(club.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{club.description}</p>
              <p className="text-xs text-gray-600 mt-2">Events Conducted: {club.events_conducted}</p>
              <p className="text-xs text-gray-600">Established: {club.established_year}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClubsManager;
