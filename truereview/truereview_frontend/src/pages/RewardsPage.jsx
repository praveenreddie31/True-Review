import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Gift, CheckCircle, AlertCircle } from 'lucide-react';

const RewardsPage = () => {
  const [rewards, setRewards] = useState([]);
  const [myRedemptions, setMyRedemptions] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchRewards();
    if (user) fetchMyRedemptions();
  }, [user]);

  const fetchRewards = async () => {
    try {
      const res = await api.get('rewards/');
      setRewards(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyRedemptions = async () => {
    try {
      const res = await api.get('rewards/my-redemptions/');
      setMyRedemptions(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRedeem = async (id, pointsRequired) => {
    if (!user) return alert('Please login to redeem.');
    if (user.points < pointsRequired) return alert('Insufficient points!');
    
    try {
      await api.post(`rewards/${id}/redeem/`);
      alert('Reward redeemed successfully!');
      
      setUser({ ...user, points: user.points - pointsRequired });
      
      fetchRewards();
      fetchMyRedemptions();
    } catch (err) {
      alert(err.response?.data?.error || 'Redemption failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center space-y-4">
        <div className="inline-block bg-amber-50 p-4 rounded-full text-amber-500 mb-2">
          <Gift size={48} />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Reward Store</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Exchange your hard-earned points for premium rewards. More genuine reviews = more points!
        </p>
        
        {user && (
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200 mt-4">
            <span className="text-gray-600 font-medium">Your Balance:</span>
            <span className="text-2xl font-bold text-amber-600">{user.points} pts</span>
          </div>
        )}
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Gift size={24} className="text-indigo-600"/> Available Rewards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewards.map(reward => (
            <div key={reward.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition justify-between">
              <div>
                <div className="bg-gray-50 uppercase text-xs font-bold text-gray-500 tracking-wider px-3 py-1 rounded-lg inline-block mb-4">
                  {reward.brand}
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">{reward.reward_name}</h3>
                <p className="text-sm text-gray-500 mb-6">Stock available: <span className="font-semibold text-gray-700">{reward.stock}</span></p>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-lg font-bold text-amber-500">{reward.points_required} pts</div>
                <button 
                  onClick={() => handleRedeem(reward.id, reward.points_required)}
                  disabled={!user || user.points < reward.points_required}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition shadow-sm ${
                    !user ? 'bg-gray-200 text-gray-500 cursor-not-allowed' :
                    user.points >= reward.points_required 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
            </div>
          ))}
          {rewards.length === 0 && (
            <div className="col-span-3 text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm text-gray-500">
              No rewards available right now. Check back later!
            </div>
          )}
        </div>
      </div>

      {user && myRedemptions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle size={24} className="text-green-600"/> My Redemptions
          </h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                  <th className="p-4 font-semibold">Reward</th>
                  <th className="p-4 font-semibold">Brand</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {myRedemptions.map(r => (
                  <tr key={r.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition text-sm">
                    <td className="p-4 font-semibold text-gray-900">{r.reward_detail?.reward_name}</td>
                    <td className="p-4 text-gray-600">{r.reward_detail?.brand}</td>
                    <td className="p-4 text-gray-600">{new Date(r.redeem_date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium text-xs">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsPage;
