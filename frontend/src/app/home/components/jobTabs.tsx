"use client";

import React, { useEffect, useState } from "react";

interface Job {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export default function JobTabs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch normal jobs
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/post/jobs", {
          // Adjust frontend API URL properly in production
          // We assume Next.js rewrites or absolute url 
        });
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (err) {
        console.error("Error fetching jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 w-full bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-xl p-8 transition-all hover:shadow-2xl min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Available Jobs</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">{jobs.length} open</span>
      </div>
      
      {jobs.length === 0 ? (
        <p className="text-gray-500 italic text-center py-10">No jobs available right now.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <div key={job.id} className="group p-5 bg-white/60 hover:bg-white/90 border border-transparent hover:border-blue-200 shadow-sm hover:shadow-md rounded-2xl transition-all cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2 text-sm">{job.description}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {job.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
