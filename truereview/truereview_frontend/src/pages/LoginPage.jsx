import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-center mb-6">
        <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
          <ShieldCheck size={32} />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Welcome Back</h2>
      {error && <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
            value={username} onChange={e => setUsername(e.target.value)} required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
            value={password} onChange={e => setPassword(e.target.value)} required 
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md">
          Sign In
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600 text-sm">
        Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
