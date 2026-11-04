import React, { useState } from 'react';
import { X, ArrowRightLeft, User, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ShiftSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShiftSwapModal: React.FC<ShiftSwapModalProps> = ({ isOpen, onClose }) => {
  const [partner, setPartner] = useState<string>('Sarah Jenkins (Tier 1 Armed)');
  const [targetShift, setTargetShift] = useState<string>('Metro Financial Plaza • Oct 24 (07:00 AM – 03:00 PM)');
  const [reason, setReason] = useState<string>('Schedule conflict with family appointment');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playRadioChirp();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl text-slate-900">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black tracking-wider uppercase text-white">SHIFT TRADE REQUEST</div>
              <div className="text-[10px] text-amber-400 font-mono">SUBMIT 24H PRIOR TO POST</div>
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

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-black text-slate-900 uppercase">Trade Request Dispatched</h3>
            <p className="text-xs text-slate-500">
              Pending review by Supervisor Marcus Vance and Officer {partner}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Your Current Shift
              </label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 flex items-center justify-between font-medium">
                <span>Westfield Business Center</span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Oct 24 • 08:00 - 18:00
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Request Trade With Officer
              </label>
              <select
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Sarah Jenkins (Tier 1 Armed)">Sarah Jenkins (Tier 1 Armed)</option>
                <option value="Capt. Donald Hayes (Executive Escort)">Capt. Donald Hayes (Executive Escort)</option>
                <option value="Alex Chen (Tech Security)">Alex Chen (Tech Security)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Target Replacement Shift
              </label>
              <select
                value={targetShift}
                onChange={(e) => setTargetShift(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Metro Financial Plaza • Oct 24 (07:00 AM – 03:00 PM)">Metro Financial Plaza • Oct 24 (07:00 AM – 03:00 PM)</option>
                <option value="Apex Tech Campus • Oct 26 (10:00 PM – 06:00 AM)">Apex Tech Campus • Oct 26 (10:00 PM – 06:00 AM)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Justification / Trade Notes
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 resize-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <ArrowRightLeft className="w-4 h-4 text-amber-400" />
              <span>Submit Trade Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
