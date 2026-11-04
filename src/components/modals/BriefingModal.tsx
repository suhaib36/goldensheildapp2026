import React from 'react';
import { SecurityAssignment } from '../../types';
import { X, Shield, FileText, CheckCircle2, MapPin, Clock, Users, AlertTriangle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: SecurityAssignment | null;
}

export const BriefingModal: React.FC<BriefingModalProps> = ({ isOpen, onClose, assignment }) => {
  if (!isOpen || !assignment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl text-slate-900 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black tracking-wider uppercase text-white">OPERATIONAL BRIEFING</div>
              <div className="text-[10px] text-emerald-400 font-mono">{assignment.postNumber} • ORDERS V4.2</div>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
              {assignment.category}
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-0.5">{assignment.title}</h2>
            <div className="flex items-center space-x-1.5 text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{assignment.address}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Deployment Window:</span>
              <span className="font-bold text-slate-900 font-mono">{assignment.timeWindow}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Security Tier:</span>
              <span className="font-bold text-amber-600">{assignment.tier}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Assigned Unit:</span>
              <span className="font-bold text-slate-900">{assignment.unitAssigned}</span>
            </div>
          </div>

          {/* Standard Operating Directives */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-2">Standard Operating Directives</h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Maintain constant radio vigilance on SEC-TAC 4. Respond within 45s of hail.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Verify NFC tags sequentially. Minimum dwell time at Reception console: 3 minutes.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Inspect fire egress locks and ensure zero impediment along emergency routes.</span>
              </li>
            </ul>
          </div>

          {/* Special Post Notice */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Access Gate Keycode Notice</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Gate B is restricted for maintenance. Direct all courier shipments to Loading Bay 3 via Rear Service Gate.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase rounded-xl transition-colors"
          >
            Acknowledge & Return
          </button>
        </div>
      </div>
    </div>
  );
};
