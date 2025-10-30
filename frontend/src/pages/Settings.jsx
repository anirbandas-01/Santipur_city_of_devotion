// frontend/src/pages/Settings.jsx
import { useState } from 'react';
import { Shield, Bell, Lock, Globe, Trash2 } from 'lucide-react';

export default function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Settings</h1>
        
        <div className="space-y-6">
          {/* Security Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Security</h2>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Change Password
            </button>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="text-purple-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <button
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  emailNotifs ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  emailNotifs ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Trash2 className="text-red-600" size={24} />
              <h2 className="text-xl font-bold text-red-800">Danger Zone</h2>
            </div>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back.
            </p>
            <button className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}