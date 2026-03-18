"use client";

import React, { useState } from "react";
import JobTabs from "./jobTabs";
import EventsTabs from "./eventsTabs";
import VolunterTabs from "./volunterTabs";

type TabType = 'jobs' | 'events' | 'volunteers';

const  MainTabContainer=()=> {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 py-8">
      {/* Tab Navigation */}
      <div className="flex bg-white/10 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-white/20 relative w-fit mx-auto transition-all">
        {/* Animated background indicator could be added here, but simple style works well too */}
        
        <button
          onClick={() => setActiveTab('jobs')}
          className={`relative z-10 px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ease-out ${
            activeTab === 'jobs' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          Jobs
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`relative z-10 px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ease-out ${
            activeTab === 'events' 
              ? 'bg-emerald-500 text-white shadow-md' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          Events
        </button>

        <button
          onClick={() => setActiveTab('volunteers')}
          className={`relative z-10 px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ease-out ${
            activeTab === 'volunteers' 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          Volunteer Projects
        </button>
      </div>

      {/* Tab Content with simple fade-in transition */}
      <div className="w-full animate-in fade-in zoom-in-95 duration-500 rounded-3xl overflow-hidden mt-4">
        {activeTab === 'jobs' && <JobTabs />}
        {activeTab === 'events' && <EventsTabs />}
        {activeTab === 'volunteers' && <VolunterTabs />}
      </div>
    </div>
  );
}


export default MainTabContainer