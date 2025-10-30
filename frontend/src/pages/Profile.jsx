// frontend/src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { getCurrentUser, isClubUser } from '../utils/auth';
import axios from 'axios';
import { getAuthHeader } from '../utils/auth';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const isClub = isClubUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          {isClub ? 'Club Profile' : 'My Profile'}
        </h1>
        
        {/* Profile content here */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {isClub ? 'Club Account' : 'Personal Account'}
              </span>
            </div>
          </div>

          {/* Add profile fields based on user type */}
          {isClub && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <p className="text-gray-800">{user?.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Club Type</label>
                <p className="text-gray-800">{user?.clubType || 'Not specified'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}