import React, { useState } from 'react';
import { ArrowLeft, Briefcase, MapPin, CheckCircle2, Clock, Send } from 'lucide-react';

interface CareersPageProps {
  onBack: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onBack }) => {
  const [applied, setApplied] = useState<string | null>(null);

  const jobs = [
    {
      id: 'job-1',
      title: 'Customer Experience Executive',
      department: 'Support & Operations',
      location: 'Dhaka (On-site)',
      type: 'Full-time'
    },
    {
      id: 'job-2',
      title: 'E-commerce Content & Catalog Specialist',
      department: 'Marketing',
      location: 'Dhaka (Hybrid)',
      type: 'Full-time'
    },
    {
      id: 'job-3',
      title: 'Warehouse & Dispatch Supervisor',
      department: 'Logistics',
      location: 'Dhaka (On-site)',
      type: 'Full-time'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 pt-4 pb-20 px-3.5 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-blue-600 bg-white px-4 py-2 rounded-full border border-gray-200/80 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোমে ফিরে যান</span>
          </button>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/20">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              Join Our Fast-Growing Team
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              ক্যারিয়ার (Careers at Gadget Hub Mart)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              বাংলাদেশের দ্রুত বর্ধনশীল টেক অ্যাক্সেসরিজ ব্র্যান্ডের সাথে কাজ করে নিজের ক্যারিয়ারকে এগিয়ে নিন।
            </p>
          </div>
        </div>

        {/* Open Roles */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 mb-2">চলমান চাকুরীর সুযোগসমূহ (Open Positions)</h3>

          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 sm:p-5 rounded-2xl border border-gray-100 hover:border-blue-200 bg-gray-50/50 hover:bg-blue-50/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{job.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-1">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-semibold">{job.type}</span>
                  </div>
                </div>

                <button
                  onClick={() => setApplied(job.id)}
                  disabled={applied === job.id}
                  className={`px-5 py-2 rounded-full font-bold text-xs transition-colors shrink-0 cursor-pointer ${
                    applied === job.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0a192f] hover:bg-blue-600 text-white'
                  }`}
                >
                  {applied === job.id ? 'আবেদন জমা হয়েছে ✓' : 'আবেদন করুন'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Box */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs text-center space-y-2 text-xs text-gray-600">
          <h4 className="text-sm font-bold text-gray-900">অন্য কোনো পদে কাজ করতে আগ্রহী?</h4>
          <p className="max-w-md mx-auto">
            আপনার সিভি ও কাভার লেটার পাঠিয়ে দিন: <strong className="text-blue-600">careers@gadgethubmart.com</strong> এ।
          </p>
        </div>

      </div>
    </div>
  );
};
