import React from 'react';
import { OfficerProfile } from '../../types';
import {
  Shield,
  Award,
  Smartphone,
  PhoneCall,
  CheckCircle2,
  Lock,
  Download,
  LogOut,
  MapPin,
  FileCheck,
  AlertOctagon,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProfileScreenProps {
  officer: OfficerProfile;
  onResetData: () => void;
  onOpenSOS: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  officer,
  onResetData,
  onOpenSOS,
}) => {
  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200">
      {/* Officer ID Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-emerald-500/50 flex items-center justify-center font-black text-xl text-amber-400 shadow-lg">
            JW
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">BADGE #{officer.badgeNumber}</span>
              <span className="px-2 py-0.2 bg-emerald-500/20 text-emerald-300 rounded-full text-[9px] font-mono border border-emerald-500/30 uppercase">
                {officer.tier}
              </span>
            </div>
            <h1 className="text-xl font-black text-white mt-0.5">{officer.name}</h1>
            <p className="text-xs text-slate-400 font-medium">{officer.rank}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs font-mono">
          <div>
            <span className="text-[9px] text-slate-500 uppercase block">DUTY STATUS</span>
            <span className="font-bold text-emerald-400 flex items-center space-x-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{officer.status}</span>
            </span>
          </div>
          <div>
            <span className="text-[9px] text-slate-500 uppercase block">ASSIGNED POST</span>
            <span className="font-bold text-slate-200 mt-0.5 truncate block">Westfield Center</span>
          </div>
        </div>
      </div>

      {/* CREDENTIALS & LICENSES */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center space-x-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Verified Security Credentials</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">California Exposed Firearm Permit</div>
              <div className="text-[11px] text-slate-500 font-mono">Permit #FQ-89210 • Exp: Nov 2027</div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              ACTIVE
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Red Cross First Aid / CPR / AED Certified</div>
              <div className="text-[11px] text-slate-500 font-mono">Cert #RC-2024-991 • Valid</div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              VERIFIED
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">ISO-27001 Cryptographic Auditor</div>
              <div className="text-[11px] text-slate-500 font-mono">Level 2 Field Verifier Token</div>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              SYNCED
            </span>
          </div>
        </div>
      </div>

      {/* HARDWARE & SENSOR TELEMETRY */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center space-x-2">
          <Smartphone className="w-4 h-4 text-slate-700" />
          <span>Device Telemetry Status</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[9px] text-slate-400 uppercase block">NFC READER</span>
            <span className="font-bold text-emerald-600">ONLINE (13.56 MHz)</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[9px] text-slate-400 uppercase block">GPS ACCURACY</span>
            <span className="font-bold text-emerald-600">±0.02m (RTK Lock)</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[9px] text-slate-400 uppercase block">BODYCAM LINK</span>
            <span className="font-bold text-slate-800">AXON Body 3 • Synced</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[9px] text-slate-400 uppercase block">RADIO CHANNEL</span>
            <span className="font-bold text-slate-800">SEC-TAC 4 (Encrypted)</span>
          </div>
        </div>
      </div>

      {/* EMERGENCY DISPATCH CONTACTS */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center space-x-2">
          <PhoneCall className="w-4 h-4 text-red-600" />
          <span>Emergency Dispatch Contacts</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Marcus Vance (Supervisor)</div>
              <div className="text-[11px] text-slate-500 font-mono">Direct Radio: #401</div>
            </div>
            <button
              onClick={() => sound.playClick()}
              className="px-3 py-1 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Call
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Central Security Dispatch 24/7</div>
              <div className="text-[11px] text-slate-500 font-mono">1-800-555-GS-SEC</div>
            </div>
            <button
              onClick={() => sound.playClick()}
              className="px-3 py-1 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Dispatch
            </button>
          </div>
        </div>
      </div>

      {/* LOGOUT & RESET ACTIONS */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => {
            sound.playEmergencyAlarm();
            onOpenSOS();
          }}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-md flex items-center justify-center space-x-2"
        >
          <AlertOctagon className="w-4 h-4" />
          <span>Trigger Emergency SOS</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onResetData();
          }}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors"
        >
          Reset Demo Data
        </button>
      </div>
    </div>
  );
};
