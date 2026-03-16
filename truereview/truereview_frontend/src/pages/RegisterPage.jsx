import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username might be taken.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-center mb-6">
        <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
          <ShieldCheck size={32} />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Create Account</h2>
      {error && <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm text-center mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input name="username" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input name="email" type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input name="password" type="password" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" onChange={handleChange} required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md">
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600 text-sm">
        Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
