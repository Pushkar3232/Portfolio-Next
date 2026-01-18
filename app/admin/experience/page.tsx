// app/admin/experience/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { 
  Building, 
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,

  MapPin,
  Calendar,
  Users,
  Target,
  Sparkles,
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  imageUrl: string;
  isActive: boolean;
  order: number;
  timestamp: any;
}

const ExperienceAdmin: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    duration: '',
    location: '',
    description: '',
    responsibilities: [''],
    skills: [''],
    imageUrl: '',
    isActive: true,
    order: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const experiencesData: Experience[] = [];
        querySnapshot.forEach((doc) => {
          experiencesData.push({
            id: doc.id,
            ...doc.data()
          } as Experience);
        });
        setExperiences(experiencesData);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', 'portfolio_uploads'); // Create this preset in Cloudinary dashboard
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

  const handleAddResponsibility = () => {
    setFormData(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, '']
    }));
  };

  const handleRemoveResponsibility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((item, i) => i === index ? value : item)
    }));
  };

  const openModal = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience);
      setFormData({
        role: experience.role,
        company: experience.company,
        duration: experience.duration,
        location: experience.location,
        description: experience.description,
        responsibilities: experience.responsibilities,
        skills: experience.skills,
        imageUrl: experience.imageUrl,
        isActive: experience.isActive,
        order: experience.order
      });
    } else {
      setEditingExperience(null);
      setFormData({
        role: '',
        company: '',
        duration: '',
        location: '',
        description: '',
        responsibilities: [''],
        skills: [''],
        imageUrl: '',
        isActive: true,
        order: experiences.length
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExperience(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty responsibilities and skills
    const filteredData = {
      ...formData,
      responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
      skills: formData.skills.filter(s => s.trim() !== '')
    };

    try {
      if (editingExperience) {
        await updateDoc(doc(db, 'experiences', editingExperience.id), {
          ...filteredData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'experiences'), {
          ...filteredData,
          timestamp: serverTimestamp()
        });
      }
      closeModal();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Failed to save experience');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteDoc(doc(db, 'experiences', id));
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Failed to delete experience');
      }
    }
  };

  const toggleActive = async (experience: Experience) => {
    try {
      await updateDoc(doc(db, 'experiences', experience.id), {
        isActive: !experience.isActive
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">Experience Management</h1>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Experience Entries</h2>
            <p className="text-gray-600 mt-1">Manage your professional experience</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Experience
          </button>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Header with Status */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{exp.role}</h3>
                  <p className="text-blue-600 font-semibold text-lg flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    {exp.company}
                  </p>
                </div>
                <button
                  onClick={() => toggleActive(exp)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    exp.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {exp.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>

              {/* Main Content Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Image */}
                <div className="md:col-span-1">
                  {exp.imageUrl ? (
                    <div className="relative group">
                      <img
                        src={exp.imageUrl}
                        alt={exp.role}
                        className="w-full h-48 rounded-xl object-cover shadow-md"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 rounded-xl bg-gray-100 flex items-center justify-center">
                      <Building className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <MapPin className="w-4 h-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center text-sm font-medium text-blue-700 mb-1">
                        <Target className="w-4 h-4 mr-1" />
                        Responsibilities
                      </div>
                      <p className="text-2xl font-bold text-blue-900">{exp.responsibilities.length}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center text-sm font-medium text-purple-700 mb-1">
                        <Sparkles className="w-4 h-4 mr-1" />
                        Skills
                      </div>
                      <p className="text-2xl font-bold text-purple-900">{exp.skills.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openModal(exp)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Experiences Yet</h3>
              <p className="text-gray-600">Add your first experience entry to get started</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {editingExperience ? 'Edit Experience' : 'Add New Experience'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Image
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Current Position or Jan 2020 - Dec 2023"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Responsibilities */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Responsibility
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.responsibilities.map((resp, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter responsibility"
                      />
                      {formData.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveResponsibility(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Skills</label>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Skill
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter skill"
                      />
                      {formData.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
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
                  <label className="ml-2 text-sm text-gray-700">Active</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  {editingExperience ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceAdmin;