"use client";

import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export default function EventsTabs() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/post/events");
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error("Error fetching events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 w-full bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl p-8 transition-all hover:shadow-2xl min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Upcoming Events</h2>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">{events.length} listed</span>
      </div>
      
      {events.length === 0 ? (
        <p className="text-gray-500 italic text-center py-10">No events scheduled.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map(event => (
            <div key={event.id} className="group p-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 hover:from-emerald-50 hover:to-teal-50 border border-emerald-100/50 hover:border-emerald-300 shadow-sm hover:shadow-md rounded-2xl transition-all cursor-pointer">
              <h3 className="text-lg font-bold text-teal-900 group-hover:text-teal-600 transition-colors">{event.title}</h3>
              <p className="text-teal-700/80 mt-2 line-clamp-3 text-sm leading-relaxed">{event.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {event.status}
                </span>
                <span className="text-xs font-medium text-emerald-600/60">
                  {new Date(event.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
