// components/EducationAdmin.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  orderBy,
  query 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  GraduationCap, 
  Award, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  Calendar,
  BookOpen,
  Trophy
} from 'lucide-react';

interface EducationData {
  id?: string;
  degree: string;
  status: string;
  institution: string;
  year: string;
  description: string;
}

interface Certificate {
  id?: string;
  title: string;
  provider: string;
  date: string;
  image: string;
  credentialUrl: string;
  category: string;
}

const EducationAdmin: React.FC = () => {
  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<EducationData | null>(null);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [educationForm, setEducationForm] = useState<EducationData>({
    degree: '',
    status: '',
    institution: '',
    year: '',
    description: ''
  });

  const [certForm, setCertForm] = useState<Certificate>({
    title: '',
    provider: '',
    date: '',
    image: '',
    credentialUrl: '',
    category: 'AI/ML'
  });

  // Fetch data from Firebase
  useEffect(() => {
    // Fetch Education
    const educationQuery = query(
      collection(db, 'education'),
      orderBy('year', 'desc')
    );
    
    const unsubEducation = onSnapshot(educationQuery, (snapshot) => {
      const data: EducationData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as EducationData);
      });
      setEducationData(data);
    });

    // Fetch Certificates
    const certQuery = query(
      collection(db, 'certificates'),
      orderBy('date', 'desc')
    );
    
    const unsubCerts = onSnapshot(certQuery, (snapshot) => {
      const data: Certificate[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Certificate);
      });
      setCertificates(data);
      setIsLoading(false);
    });

    return () => {
      unsubEducation();
      unsubCerts();
    };
  }, []);

  // Education CRUD operations
  const handleSaveEducation = async () => {
    try {
      if (editingEducation) {
        // Update existing
        await updateDoc(doc(db, 'education', editingEducation.id!), educationForm);
      } else {
        // Add new
        await addDoc(collection(db, 'education'), educationForm);
      }
      resetEducationForm();
    } catch (error) {
      console.error('Error saving education:', error);
      alert('Error saving education. Please try again.');
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await deleteDoc(doc(db, 'education', id));
      } catch (error) {
        console.error('Error deleting education:', error);
        alert('Error deleting education. Please try again.');
      }
    }
  };

  const startEditEducation = (edu: EducationData) => {
    setEditingEducation(edu);
    setEducationForm(edu);
    setShowEducationForm(true);
  };

  const resetEducationForm = () => {
    setEducationForm({
      degree: '',
      status: '',
      institution: '',
      year: '',
      description: ''
    });
    setEditingEducation(null);
    setShowEducationForm(false);
  };

  // Certificate CRUD operations
  const handleSaveCertificate = async () => {
    try {
      if (editingCert) {
        await updateDoc(doc(db, 'certificates', editingCert.id!), certForm);
      } else {
        await addDoc(collection(db, 'certificates'), certForm);
      }
      resetCertForm();
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Error saving certificate. Please try again.');
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteDoc(doc(db, 'certificates', id));
      } catch (error) {
        console.error('Error deleting certificate:', error);
        alert('Error deleting certificate. Please try again.');
      }
    }
  };

  const startEditCertificate = (cert: Certificate) => {
    setEditingCert(cert);
    setCertForm(cert);
    setShowCertForm(true);
  };

  const resetCertForm = () => {
    setCertForm({
      title: '',
      provider: '',
      date: '',
      image: '',
      credentialUrl: '',
      category: 'AI/ML'
    });
    setEditingCert(null);
    setShowCertForm(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading education data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Education Management</h1>
          <p className="text-gray-600">Manage your education and certifications</p>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3" />
              Education
            </h2>
            <button
              onClick={() => setShowEducationForm(!showEducationForm)}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </button>
          </div>

          {/* Education Form */}
          {showEducationForm && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingEducation ? 'Edit Education' : 'Add New Education'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    value={educationForm.degree}
                    onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Diploma in Computer Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <input
                    type="text"
                    value={educationForm.status}
                    onChange={(e) => setEducationForm({ ...educationForm, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Recently Graduated"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                  <input
                    type="text"
                    value={educationForm.institution}
                    onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Technical Institute"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="text"
                    value={educationForm.year}
                    onChange={(e) => setEducationForm({ ...educationForm, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2025"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={educationForm.description}
                  onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the program..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveEducation}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={resetEducationForm}
                  className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Education List */}
          <div className="space-y-4">
            {educationData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No education entries yet. Click "Add Education" to create one.
              </div>
            ) : (
              educationData.map((edu) => (
                <div key={edu.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                      <p className="text-gray-700 font-medium mb-2">{edu.institution}</p>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{edu.status} • {edu.year}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{edu.description}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => startEditEducation(edu)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(edu.id!)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Award className="w-6 h-6 mr-3" />
              Certifications
            </h2>
            <button
              onClick={() => setShowCertForm(!showCertForm)}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </button>
          </div>

          {/* Certificate Form */}
          {showCertForm && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Certificate title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                  <input
                    type="text"
                    value={certForm.provider}
                    onChange={(e) => setCertForm({ ...certForm, provider: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., LinkedIn Learning"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="text"
                    value={certForm.date}
                    onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={certForm.category}
                    onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="AI/ML">AI/ML</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Development">Development</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={certForm.image}
                    onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/images/cert.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credential URL</label>
                  <input
                    type="url"
                    value={certForm.credentialUrl}
                    onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveCertificate}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={resetCertForm}
                  className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-gray-500">
                No certificates yet. Click "Add Certificate" to create one.
              </div>
            ) : (
              certificates.map((cert) => (
                <div key={cert.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 flex-1">{cert.title}</h3>
                    <div className="flex space-x-2 ml-2">
                      <button
                        onClick={() => startEditCertificate(cert)}
                        className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCertificate(cert.id!)}
                        className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{cert.provider}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {cert.date}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                      {cert.category}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{educationData.length}</h4>
            <p className="text-gray-600 text-sm">Education Entries</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{certificates.length}</h4>
            <p className="text-gray-600 text-sm">Certificates</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">
              {certificates.filter(c => c.category === 'AI/ML').length}
            </h4>
            <p className="text-gray-600 text-sm">AI/ML Certs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationAdmin;