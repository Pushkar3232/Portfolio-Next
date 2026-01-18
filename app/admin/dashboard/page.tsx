// app/admin/dashboard/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import AdminNavbar from '../../../components/AdminNavbar';
import { 
  Mail, 
  Search,
  Filter,
  CheckCircle,
  Trash2,
  Eye,
  Clock,
  User,
  MessageCircle,
  Settings,
  Bell,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: any;
  read: boolean;
}

const AdminDashboard: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData: Message[] = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({
            id: doc.id,
            ...doc.data()
          } as Message);
        });
        setMessages(messagesData);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user, loading, router]);

  useEffect(() => {
    let filtered = messages;
    if (filterStatus === 'unread') {
      filtered = filtered.filter(msg => !msg.read);
    } else if (filterStatus === 'read') {
      filtered = filtered.filter(msg => msg.read);
    }
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterStatus]);

  const markAsRead = async (messageId: string) => {
    try {
      await updateDoc(doc(db, 'messages', messageId), { read: true });
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', messageId));
        setSelectedMessage(null);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  const unreadCount = messages.filter(msg => !msg.read).length;
  const totalMessages = messages.length;
  const readCount = totalMessages - unreadCount;

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar 
        currentPage="dashboard" 
        title="Admin Dashboard" 
        subtitle="Portfolio Management" 
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900">{totalMessages}</p>
                <p className="text-sm text-gray-500 mt-2">All time</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Unread Messages</p>
                <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
                <p className="text-sm text-gray-500 mt-2">Needs attention</p>
              </div>
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Mail className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Read Messages</p>
                <p className="text-3xl font-bold text-green-600">{readCount}</p>
                <p className="text-sm text-gray-500 mt-2">Completed</p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages by name, email, subject, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'unread' | 'read')}
                  className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-colors min-w-[140px] font-medium"
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
              
              <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Messages ({filteredMessages.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {filteredMessages.length} of {totalMessages}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No messages found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {searchTerm ? 'Try adjusting your search criteria' : 'Messages will appear here when received'}
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.read) {
                          markAsRead(message.id);
                        }
                      }}
                      className={`p-6 cursor-pointer hover:bg-blue-50 transition-all duration-200 ${
                        !message.read 
                          ? 'bg-blue-25 border-l-4 border-l-blue-500' 
                          : selectedMessage?.id === message.id 
                            ? 'bg-blue-50' 
                            : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {message.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center">
                              {message.name}
                              {!message.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600">{message.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimestamp(message.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="ml-13">
                        <h4 className="font-medium text-gray-800 mb-1">{message.subject}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {message.message.slice(0, 120)}...
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Details Panel */}
          <div className="xl:col-span-1">
            {selectedMessage ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm sticky top-24">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Message Details</h2>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedMessage.name}</h3>
                      <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{selectedMessage.subject}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <div className="text-gray-900 bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                        {selectedMessage.message}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Received</label>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        {formatTimestamp(selectedMessage.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="flex-1 flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-medium transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-medium transition-all duration-200">
                      <Mail className="w-4 h-4 mr-2" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center sticky top-24">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">No Message Selected</h3>
                <p className="text-sm text-gray-500">
                  Select a message from the list to view its details
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;