import React from 'react';
import { Pin, Calendar, ChevronRight } from 'lucide-react';

const notices = [
  { id: 1, title: 'Annual General Meeting (AGM) 2026', date: 'March 25, 2026', category: 'Governance', urgent: true },
  { id: 2, title: 'Lift Maintenance - Block B', date: 'March 20, 2026', category: 'Security', urgent: false },
  { id: 3, title: 'Water Tank Cleaning Schedule', date: 'March 22, 2026', category: 'Operations', urgent: false }
];

const NoticeBoard = () => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <h4 className="font-bold flex items-center gap-2">
          <Pin size={16} className="text-emerald-500" />
          Society Notices
        </h4>
        <span className="text-[10px] font-black text-slate-500 uppercase">View Archive</span>
      </div>
      <div className="divide-y divide-white/5">
        {notices.map(notice => (
          <div key={notice.id} className="p-4 hover:bg-white/5 transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${notice.urgent ? 'bg-rose-500/20 text-rose-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {notice.category}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Calendar size={10} /> {notice.date}
                  </span>
                </div>
                <p className="font-medium group-hover:text-emerald-400 transition-colors">{notice.title}</p>
              </div>
              <ChevronRight size={16} className="text-slate-600 group-hover:text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
