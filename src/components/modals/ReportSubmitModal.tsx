import React, { useState } from 'react';
import { X, ShieldCheck, FileCheck, CheckCircle2, Lock, Download, Printer } from 'lucide-react';
import { Checkpoint, FieldNote } from '../../types';
import { sound } from '../../utils/audio';

interface ReportSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkpoints: Checkpoint[];
  notes: FieldNote[];
  onSubmitComplete: () => void;
}

export const ReportSubmitModal: React.FC<ReportSubmitModalProps> = ({
  isOpen,
  onClose,
  checkpoints,
  notes,
  onSubmitComplete,
}) => {
  const [officerSignature, setOfficerSignature] = useState<string>('James Wilson #GS-1048');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const completedCount = checkpoints.filter((c) => c.status === 'completed').length;
  const hash = '0x8f3c...b29e71';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    sound.playRadioChirp();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playScanSuccess();
      onSubmitComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl text-slate-900 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black tracking-wider uppercase text-white">PATROL REPORT AUDIT</div>
              <div className="text-[10px] text-emerald-400 font-mono">ISO-27001 AUDIT HASH SIGNING</div>
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
          <div className="p-6 text-center space-y-4 my-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto drop-shadow-md" />
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase">
                PATROL REPORT CERTIFIED & FILED
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Transmitted to Westfield Business Center property manager and Golden Shield central dispatch.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>AUDIT HASH:</span>
                <span className="font-bold text-slate-900">SHA-256_{Math.random().toString(36).substring(2, 10)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>TIMESTAMP:</span>
                <span className="font-bold text-slate-900">2026-10-23T10:15:22Z</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>OFFICER BADGE:</span>
                <span className="font-bold text-slate-900">#GS-1048</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
            {/* Summary card */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Patrol Mission Summary
              </div>
              <div className="text-sm font-bold text-slate-900">Westfield Business Center • Sector B</div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                <span className="text-slate-600">Verified Checkpoints:</span>
                <span className="font-bold text-emerald-600">{completedCount} of {checkpoints.length} Complete</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Field Notes / Photos:</span>
                <span className="font-bold text-slate-900">{notes.length} Logged</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Anomalies Detected:</span>
                <span className="font-bold text-emerald-600">0 (Normal)</span>
              </div>
            </div>

            {/* Officer Signature */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Officer Digital Signature
              </label>
              <input
                type="text"
                value={officerSignature}
                onChange={(e) => setOfficerSignature(e.target.value)}
                className="w-full text-xs font-mono font-bold p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500"
                required
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                By submitting, you certify that all checkpoint inspections were physically performed in accordance with Golden Shield SOP.
              </span>
            </div>

            {/* Cryptographic hash badge */}
            <div className="p-3 bg-slate-900 text-slate-300 rounded-xl text-[10px] font-mono flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>ISO-27001 AUDIT HASH:</span>
              </div>
              <span className="text-emerald-400 font-bold">{hash}</span>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                <FileCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'SIGNING & SUBMITTING...' : 'COMPLETE & SUBMIT PATROL REPORT'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
