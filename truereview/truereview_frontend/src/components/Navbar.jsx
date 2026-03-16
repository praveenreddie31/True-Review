import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 glass-panel">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
          <ShieldCheck size={28} />
          TrueReview
        </Link>
        <div className="flex gap-6 items-center font-medium text-gray-600">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/rewards" className="hover:text-indigo-600 transition">Rewards</Link>
          {user ? (
            <>
              <Link to="/write-review" className="text-indigo-600 hover:text-indigo-700 transition">Write Review</Link>
              <Link to="/profile" className="hover:text-indigo-600 transition">Profile</Link>
              <div className="flex items-center gap-4 border-l pl-4 ml-2 border-gray-200">
                <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-sm">
                  {user.points} pts
                </span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 border border-transparent rounded-lg transition">
                Log In
              </Link>
              <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
