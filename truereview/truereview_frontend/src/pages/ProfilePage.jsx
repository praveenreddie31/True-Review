import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Gift, Star, Award } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="text-center mt-20">Please log in to view profile.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-4xl font-bold mb-4">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-1">@{user.username}</h2>
        <p className="text-gray-500 mb-8">{user.email}</p>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <Gift className="mx-auto text-amber-500 mb-2" size={32} />
            <div className="text-3xl font-bold text-gray-900">{user.points}</div>
            <div className="text-sm text-gray-500 font-medium mt-1">Reward Points</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <Star className="mx-auto text-indigo-500 mb-2" size={32} />
            <div className="text-3xl font-bold text-gray-900">{user.total_reviews}</div>
            <div className="text-sm text-gray-500 font-medium mt-1">Total Reviews</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <Award className="mx-auto text-purple-500 mb-2" size={32} />
            <div className="text-3xl font-bold text-gray-900">{user.badges ? 1 : 0}</div>
            <div className="text-sm text-gray-500 font-medium mt-1">Badges</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
