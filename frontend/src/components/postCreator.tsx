"use client";

import React, { useState } from "react";

type PostType = 'job' | 'event' | 'volunteer' | 'government';

 const PostCreator=()=> {
  const [postType, setPostType] = useState<PostType>('job');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("27.7172");
  const [longitude, setLongitude] = useState("85.3240");
  const [radius, setRadius] = useState("5000");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    const endpoint = postType === 'government' 
      ? "http://localhost:8001/api/government-post" 
      : "http://localhost:8001/api/post";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Ensure credentials are sent since the backend uses cookie-based auth
        credentials: "include", 
        body: JSON.stringify({
          title,
          description,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          radius_meters: parseInt(radius, 10),
          job_type: postType
        })
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Post created successfully!' });
        setTitle('');
        setDescription('');
      } else {
        const errorData = await res.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to create post.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
        
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create a New Post</h2>
          <p className="text-gray-500 mt-2">Publish an opportunity to the community or submit an official government mandate.</p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Post Type</label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value as PostType)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none shadow-sm appearance-none cursor-pointer"
            >
              <option value="job">Normal Job</option>
              <option value="event">Event</option>
              <option value="volunteer">Volunteer Project</option>
              <option value="government">Government Directive (Secure)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Community Cleanup Drive"
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details..."
              className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm placeholder:text-gray-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Latitude</label>
              <input
                type="text"
                required
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Longitude</label>
              <input
                type="text"
                required
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Radius (meters)</label>
              <input
                type="number"
                required
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full relative overflow-hidden group flex justify-center items-center py-4 px-4 text-sm font-bold rounded-xl text-white shadow-lg transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : postType === 'government' ? 'bg-gray-900 hover:bg-gray-800 hover:shadow-gray-900/30' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/30'}`}
            >
              {isSubmitting ? (
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-white"></div>
              ) : (
                <span>Publish Post</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostCreator