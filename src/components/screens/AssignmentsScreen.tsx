import React, { useState } from 'react';
import { SecurityAssignment, TabType } from '../../types';
import {
  Search,
  MapPin,
  Clock,
  Shield,
  ArrowRight,
  User,
  Users,
  Map,
  FileText,
  ArrowRightLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface AssignmentsScreenProps {
  assignments: SecurityAssignment[];
  onNavigateToTab: (tab: TabType) => void;
  onOpenTradeModal: () => void;
  onViewBriefing: (assignment: SecurityAssignment) => void;
}

export const AssignmentsScreen: React.FC<AssignmentsScreenProps> = ({
  assignments,
  onNavigateToTab,
  onOpenTradeModal,
  onViewBriefing,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  const [selectedMapSite, setSelectedMapSite] = useState<string | null>(null);

  const filteredAssignments = assignments.filter((asg) => {
    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === 'active') return asg.status === 'active';
    if (activeFilter === 'upcoming') return asg.status === 'confirmed' || asg.status === 'standby' || asg.status === 'scheduled';
    if (activeFilter === 'completed') return false; // None yet
    return true;
  });

  const activeAssignment = assignments.find((a) => a.status === 'active') || assignments[0];
  const scheduledRotations = filteredAssignments.filter((a) => a.id !== activeAssignment.id);

  return (
    <div className="space-y-4 pb-4 animate-in fade-in duration-200">
      {/* Page Title & Search Header */}
      <div className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
            OPERATIONAL DUTY
          </span>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Security Assignments</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search property, client, or site..."
            className="w-full text-xs font-medium pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400 text-slate-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-bold">
          <button
            onClick={() => {
              sound.playClick();
              setActiveFilter('all');
            }}
            className={`px-3 py-1.5 rounded-full transition-all shrink-0 ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All 5
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveFilter('active');
            }}
            className={`px-3 py-1.5 rounded-full transition-all shrink-0 flex items-center space-x-1 ${
              activeFilter === 'active'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Active 1</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveFilter('upcoming');
            }}
            className={`px-3 py-1.5 rounded-full transition-all shrink-0 ${
              activeFilter === 'upcoming'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Upcoming 3
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveFilter('completed');
            }}
            className={`px-3 py-1.5 rounded-full transition-all shrink-0 ${
              activeFilter === 'completed'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* ACTIVE DEPLOYMENT FEATURED CARD */}
      {activeAssignment && (activeFilter === 'all' || activeFilter === 'active') && (
        <div className="bg-white rounded-3xl p-5 border-2 border-emerald-500/40 shadow-md relative overflow-hidden">
          {/* Top category strip */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono">
                {activeAssignment.category}
              </span>
              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center space-x-1 font-mono uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>ACTIVE NOW</span>
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">{activeAssignment.postNumber}</span>
          </div>

          <h2 className="text-lg font-black text-slate-900 tracking-tight">{activeAssignment.title}</h2>

          <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{activeAssignment.address}</span>
          </div>

          {/* Shift Window & Deployment Tier */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-2xl">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">SHIFT WINDOW</span>
              <div className="flex items-center space-x-1 text-xs font-bold text-slate-800 mt-0.5 font-mono">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{activeAssignment.timeWindow}</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">DEPLOYMENT TIER</span>
              <div className="flex items-center space-x-1 text-xs font-bold text-slate-800 mt-0.5">
                <Shield className="w-3 h-3 text-amber-500" />
                <span>{activeAssignment.tier}</span>
              </div>
            </div>
          </div>

          {/* Assigned Unit */}
          <div className="mt-3 flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl text-xs">
            <div className="flex items-center space-x-2">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 font-medium">Assigned Unit:</span>
              <span className="font-bold text-slate-900">{activeAssignment.unitAssigned}</span>
            </div>
            {activeAssignment.ordersVersion && (
              <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {activeAssignment.ordersVersion}
              </span>
            )}
          </div>

          {/* Card Actions */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedMapSite(selectedMapSite ? null : activeAssignment.title);
              }}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Map className="w-3.5 h-3.5" />
              <span>{selectedMapSite ? 'Close Site Map' : 'Site Map & Gates'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onViewBriefing(activeAssignment);
              }}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
            >
              <span>View Full Briefing</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>

          {/* Interactive Site Map Preview if toggled */}
          {selectedMapSite && (
            <div className="mt-3 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-white text-xs space-y-2 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>SECTOR 4 PERIMETER BLUEPRINT</span>
                <span className="text-emerald-400">GATE ACCURACY ±0.02m</span>
              </div>
              <div className="h-32 bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:16px_16px] opacity-30"></div>
                <div className="relative z-10 text-center space-y-1">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-mono text-[10px] border border-emerald-500/30">
                    Gate A (Turnstiles) • Gate B (Maintenance) • Gate C (Dock)
                  </span>
                  <div className="text-[11px] text-slate-300">Biometric & RFID access points online</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCHEDULED POST ROTATIONS SECTION */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">
            SCHEDULED POST ROTATIONS
          </h3>
          <span className="text-[11px] font-bold text-slate-500 flex items-center space-x-1">
            <Filter className="w-3 h-3 text-slate-400" />
            <span>Sort by Date</span>
          </span>
        </div>

        <div className="space-y-3">
          {scheduledRotations.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                sound.playClick();
                onViewBriefing(item);
              }}
              className="bg-white hover:bg-slate-50 rounded-3xl p-4 border border-slate-200 shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  {item.category}
                </span>
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                    item.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'standby'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  • {item.status}
                </span>
              </div>

              <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 font-medium">{item.roleTag}</p>

              {/* Time & Date */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-slate-700 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.date} • {item.timeWindow}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Location & Supervisor info */}
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <div className="flex items-center space-x-1 truncate max-w-[200px]">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{item.address}</span>
                </div>
                {item.supervisor && (
                  <div className="flex items-center space-x-1 shrink-0">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{item.supervisor}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SHIFT SWAP UTILITY CARD */}
      <div className="p-4 bg-slate-50 rounded-3xl border border-dashed border-slate-300 flex items-center justify-between">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <ArrowRightLeft className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900">Need a Shift Swap?</div>
            <div className="text-[11px] text-slate-500">Submit trade requests 24h prior to post time</div>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenTradeModal();
          }}
          className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-colors shrink-0"
        >
          Request Trade
        </button>
      </div>
    </div>
  );
};
