// components/Contact.tsx
"use client";
import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Add message to Firestore
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: serverTimestamp(),
        read: false
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'pushkarshinde006@gmail.com',
      href: 'mailto:pushkarshinde006@gmail.com'
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub',
      value: 'github.com/Pushkar3232',
      href: 'https://github.com/Pushkar3232'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/pushkarshinde6',
      href: 'https://linkedin.com/in/pushkarshinde6/'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-2">
              Ready to collaborate? Let's discuss your project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-8">Contact Information</h3>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-gray-900 font-semibold text-sm sm:text-base">{info.title}</h4>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200 text-xs sm:text-sm truncate">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability Status */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-200">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Project Availability
                </h4>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  Available for freelance work and exciting opportunities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm border border-green-200">
                    Available
                  </span>
                  <span className="px-2.5 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm border border-blue-200">
                    Quick Response
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-8">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 text-sm sm:text-base"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 sm:py-3 px-5 sm:px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center space-x-2 text-green-700 bg-green-50 rounded-lg p-2.5 sm:p-3 border border-green-200">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-700 bg-red-50 rounded-lg p-2.5 sm:p-3 border border-red-200">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">Something went wrong. Please try again later.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;