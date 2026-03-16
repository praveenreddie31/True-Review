import React, { useState, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sparkles, Image as ImageIcon, Video as VideoIcon, UploadCloud } from 'lucide-react';

const WriteReviewPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', rating: '5', category: 'Product', location: ''
  });
  const [media, setMedia] = useState({ image: null, video: null });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setMedia({ ...media, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login first.');
    setLoading(true);
    
    const form = new FormData();
    Object.keys(formData).forEach(key => form.append(key, formData[key]));
    if (media.image) form.append('image', media.image);
    if (media.video) form.append('video', media.video);

    try {
      const res = await api.post('reviews/', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data.is_flagged) {
        alert('Your review was flagged by our AI as suspicious and is pending moderation.');
      } else {
        alert('Review posted successfully! You earned points.');
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to submit review.');
    }
    setLoading(false);
  };

  if (!user) return <div className="text-center mt-20">Please log in to write a review.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
          <Sparkles size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Write a Review</h2>
          <p className="text-gray-500">Share your experience and earn rewards</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
        <h4 className="font-semibold text-amber-800 mb-2 border-b border-amber-200 pb-2">How to earn points:</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>📝 Text review = <strong>5 points</strong></li>
          <li>📸 Add an image = <strong>+10 points</strong></li>
          <li>🎥 Add a video = <strong>+20 points</strong></li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <input name="title" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" onChange={handleChange} required placeholder="Summarize your experience" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select name="category" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white" onChange={handleChange}>
              <option>Product</option>
              <option>Restaurant</option>
              <option>Hotel</option>
              <option>Movie</option>
              <option>Service</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Rating</label>
            <select name="rating" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white" onChange={handleChange}>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Location / Brand</label>
          <input name="location" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" onChange={handleChange} required placeholder="e.g. New York City, Apple, etc." />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Description</label>
          <textarea name="description" rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none" onChange={handleChange} required placeholder="Provide a detailed, genuine account of your experience..."></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <ImageIcon className="mx-auto text-indigo-500 mb-2" size={32} />
            <div className="text-sm font-medium text-gray-700">Add an Image</div>
            <div className="text-xs text-indigo-600 mt-1 font-semibold">+10 pts</div>
            {media.image && <div className="text-xs text-green-600 mt-2 truncate bg-green-50 rounded p-1">{media.image.name}</div>}
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
            <input type="file" name="video" accept="video/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <VideoIcon className="mx-auto text-purple-500 mb-2" size={32} />
            <div className="text-sm font-medium text-gray-700">Add a Video</div>
            <div className="text-xs text-purple-600 mt-1 font-semibold">+20 pts</div>
            {media.video && <div className="text-xs text-green-600 mt-2 truncate bg-green-50 rounded p-1">{media.video.name}</div>}
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg mt-8 disabled:bg-indigo-400">
          {loading ? 'Analyzing & Submitting...' : <><UploadCloud size={20} /> Publish Review</>}
        </button>
      </form>
    </div>
  );
};

export default WriteReviewPage;
