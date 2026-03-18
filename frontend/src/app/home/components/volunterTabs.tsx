"use client";

import React, { useEffect, useState } from "react";

interface Volunteer {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export default function VolunterTabs() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/post/volunteers");
        if (res.ok) {
          const data = await res.json();
          setVolunteers(data);
        }
      } catch (err) {
        console.error("Error fetching volunteers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 w-full bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl p-8 transition-all hover:shadow-2xl min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Volunteer Projects</h2>
        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">{volunteers.length} active</span>
      </div>
      
      {volunteers.length === 0 ? (
        <p className="text-gray-500 italic text-center py-10">No volunteer projects at the moment.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {volunteers.map(vol => (
            <div key={vol.id} className="relative group p-5 bg-white/70 hover:bg-white shadow-sm hover:shadow-[0_10px_20px_rgba(168,85,247,0.15)] border border-purple-100 hover:border-purple-300 rounded-2xl transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-200 to-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 opacity-50"></div>
              
              <h3 className="relative text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors pr-4">{vol.title}</h3>
              <p className="relative text-gray-600 mt-2 line-clamp-3 text-sm">{vol.description}</p>
              
              <div className="relative mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700">
                  {vol.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(vol.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
