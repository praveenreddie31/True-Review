import React, { useState, useEffect } from 'react';
import api from '../api';
import { Star, ThumbsUp, MapPin, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    let url = 'reviews/';
    const params = [];
    if (search) params.push(`search=${search}`);
    if (category) params.push(`category=${category}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    
    try {
      const res = await api.get(url);
      setReviews(res.data.results || res.data);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReviews();
  };

  const handleHelpful = async (id) => {
    try {
      await api.post(`reviews/${id}/helpful/`);
      fetchReviews();
    } catch (error) {
      console.error(error);
      alert('You must be logged in to vote.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Genuine Reviews, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Real Rewards.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Read verified experiences, track fake reviews using our advanced AI, and earn premium rewards for sharing your genuine feedback.
        </p>
        
        <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto flex gap-3">
          <input 
            type="text" 
            placeholder="Search by product, restaurant, or location..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-5 py-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition text-base"
          />
          <button type="submit" className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition shadow-md whitespace-nowrap">
            Search
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {['', 'Product', 'Restaurant', 'Hotel', 'Movie', 'Service'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${category === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
            >
              {cat || 'All Categories'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-xl text-gray-500 mb-4">No reviews found.</p>
            <Link to="/write-review" className="text-indigo-600 font-medium hover:underline">Be the first to write a review!</Link>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{review.title}</h3>
                  <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 mt-2">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">@{review.username}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={15}/> {review.location}</span>
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">{review.category}</span>
                  </div>
                </div>
                <div className="flex bg-amber-50 px-3 py-1.5 rounded-xl items-center gap-1.5 text-amber-500 border border-amber-100 shadow-sm">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold text-lg">{review.rating}.0</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 whitespace-pre-wrap text-lg leading-relaxed">{review.description}</p>
              
              {(review.image || review.video) && (
                <div className="flex gap-4 mb-6">
                  {review.image && (
                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-gray-200 shadow-sm group">
                      <img src={`http://localhost:8000${review.image}`} alt="Proof" className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white p-1.5 rounded-lg backdrop-blur-md"><ImageIcon size={16} /></div>
                    </div>
                  )}
                  {review.video && (
                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center group hover:bg-gray-100 transition duration-300">
                      <VideoIcon size={32} className="text-gray-300 group-hover:text-gray-400 transition" />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white p-1.5 rounded-lg backdrop-blur-md"><VideoIcon size={16} /></div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-2">
                <button 
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 px-4 py-2 rounded-xl transition"
                >
                  <ThumbsUp size={16} />
                  Helpful ({review.helpful_votes})
                </button>
                <span className="text-sm font-medium text-gray-400">
                  {new Date(review.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
