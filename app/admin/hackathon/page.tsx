// app/admin/hackathon/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import AdminNavbar from '../../../components/AdminNavbar';
import { 
  Trophy,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  Calendar,
  MapPin,
  Award,
  Users,
  Target,
  Loader2
} from 'lucide-react';

interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  achievement: string;
  technologies: string[];
  teamSize: string;
  imageUrl: string;
  projectUrl?: string;
  isActive: boolean;
  order: number;
  timestamp: any;
}

const HackathonAdmin: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    date: '',
    location: '',
    description: '',
    achievement: '',
    technologies: [''],
    teamSize: '',
    imageUrl: '',
    projectUrl: '',
    isActive: true,
    order: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      const q = query(collection(db, 'hackathons'), orderBy('order', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const hackathonsData: Hackathon[] = [];
        querySnapshot.forEach((doc) => {
          hackathonsData.push({
            id: doc.id,
            ...doc.data()
          } as Hackathon);
        });
        setHackathons(hackathonsData);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user, loading, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', 'portfolio_uploads');
    uploadFormData.append('cloud_name', 'dzli7gxtt');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dzli7gxtt/image/upload`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleAddTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, '']
    }));
  };

  const handleRemoveTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const handleTechnologyChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.map((item, i) => i === index ? value : item)
    }));
  };

  const openModal = (hackathon?: Hackathon) => {
    if (hackathon) {
      setEditingHackathon(hackathon);
      setFormData({
        title: hackathon.title,
        organizer: hackathon.organizer,
        date: hackathon.date,
        location: hackathon.location,
        description: hackathon.description,
        achievement: hackathon.achievement,
        technologies: hackathon.technologies,
        teamSize: hackathon.teamSize,
        imageUrl: hackathon.imageUrl,
        projectUrl: hackathon.projectUrl || '',
        isActive: hackathon.isActive,
        order: hackathon.order
      });
    } else {
      setEditingHackathon(null);
      setFormData({
        title: '',
        organizer: '',
        date: '',
        location: '',
        description: '',
        achievement: '',
        technologies: [''],
        teamSize: '',
        imageUrl: '',
        projectUrl: '',
        isActive: true,
        order: hackathons.length
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHackathon(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredData = {
      ...formData,
      technologies: formData.technologies.filter(t => t.trim() !== '')
    };

    try {
      if (editingHackathon) {
        await updateDoc(doc(db, 'hackathons', editingHackathon.id), {
          ...filteredData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'hackathons'), {
          ...filteredData,
          timestamp: serverTimestamp()
        });
      }
      closeModal();
    } catch (error) {
      console.error('Error saving hackathon:', error);
      alert('Failed to save hackathon');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this hackathon?')) {
      try {
        await deleteDoc(doc(db, 'hackathons', id));
      } catch (error) {
        console.error('Error deleting hackathon:', error);
        alert('Failed to delete hackathon');
      }
    }
  };

  const toggleActive = async (hackathon: Hackathon) => {
    try {
      await updateDoc(doc(db, 'hackathons', hackathon.id), {
        isActive: !hackathon.isActive
      });
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar 
        currentPage="hackathon" 
        title="Hackathon Management" 
        subtitle="Manage your hackathon achievements" 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hackathon Entries</h2>
            <p className="text-gray-600 mt-1">Manage your hackathon participations and achievements</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Hackathon
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{hackathon.title}</h3>
                  <p className="text-blue-600 font-semibold text-lg">{hackathon.organizer}</p>
                </div>
                <button
                  onClick={() => toggleActive(hackathon)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    hackathon.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {hackathon.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1">
                  {hackathon.imageUrl ? (
                    <img
                      src={hackathon.imageUrl}
                      alt={hackathon.title}
                      className="w-full h-48 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {hackathon.date}
                    </div>
                    <div className="flex items-center px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hackathon.location}
                    </div>
                    <div className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      Team: {hackathon.teamSize}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center text-yellow-800 font-semibold mb-1">
                      <Award className="w-4 h-4 mr-2" />
                      Achievement
                    </div>
                    <p className="text-yellow-700 text-sm">{hackathon.achievement}</p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">{hackathon.description}</p>

                  <div>
                    <div className="flex items-center text-gray-700 font-semibold mb-2 text-sm">
                      <Target className="w-4 h-4 mr-2" />
                      Technologies Used
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hackathon.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openModal(hackathon)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hackathon.id)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {hackathons.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Hackathons Yet</h3>
              <p className="text-gray-600">Add your first hackathon entry to get started</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {editingHackathon ? 'Edit Hackathon' : 'Add New Hackathon'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hackathon Image
                </label>
                <div className="flex items-center space-x-4">
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  )}
                  <label className="flex items-center px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Hackathon Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                    placeholder="e.g., Smart India Hackathon 2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Organizer *</label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                    placeholder="e.g., Government of India"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Date *</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                    placeholder="e.g., Dec 2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                    placeholder="e.g., Delhi, India"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Team Size *</label>
                  <input
                    type="text"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                    placeholder="e.g., 4 members"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Project URL</label>
                  <input
                    type="url"
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Achievement */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Achievement *</label>
                <input
                  type="text"
                  value={formData.achievement}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                  placeholder="e.g., Winner - First Prize"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                  placeholder="Describe the project and your contribution..."
                  required
                />
              </div>

              {/* Technologies */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-800">Technologies Used</label>
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    + Add Technology
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.technologies.map((tech, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => handleTechnologyChange(index, e.target.value)}
                        className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                        placeholder="e.g., React, Node.js"
                      />
                      {formData.technologies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(index)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Status & Order */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm font-semibold text-gray-800">Active (Show on portfolio)</label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingHackathon ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonAdmin;
