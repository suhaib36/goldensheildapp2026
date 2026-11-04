import React, { useState } from 'react';
import { Checkpoint } from '../../types';
import { X, QrCode, Radio, CheckCircle2, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkpoint: Checkpoint | null;
  onVerifySuccess: (checkpointId: string) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  checkpoint,
  onVerifySuccess,
}) => {
  const [scanMode, setScanMode] = useState<'NFC' | 'QR'>('NFC');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(false);

  if (!isOpen || !checkpoint) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    sound.playRadioChirp();

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      sound.playScanSuccess();

      setTimeout(() => {
        onVerifySuccess(checkpoint.id);
        setScanComplete(false);
        onClose();
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl text-white relative">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black tracking-wider uppercase text-emerald-400">HARDWARE SCANNER</div>
              <div className="text-[11px] text-slate-400 font-mono">TAG # {checkpoint.tagId}</div>
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

        {/* Scan Mode Toggle */}
        <div className="p-3 bg-slate-850 flex items-center justify-center border-b border-slate-800/80">
          <div className="bg-slate-800 p-1 rounded-xl flex space-x-1 border border-slate-700">
            <button
              onClick={() => {
                sound.playClick();
                setScanMode('NFC');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                scanMode === 'NFC' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>NFC TOUCH (13.56MHz)</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setScanMode('QR');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                scanMode === 'QR' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>OPTICAL QR</span>
            </button>
          </div>
        </div>

        {/* Simulated Camera Viewfinder / NFC Plate */}
        <div className="relative h-64 bg-slate-950 flex flex-col items-center justify-center overflow-hidden border-b border-slate-800">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

          {/* Target Reticle */}
          <div className="relative z-10 w-48 h-48 border-2 border-dashed border-emerald-500/60 rounded-2xl flex flex-col items-center justify-center p-4 bg-emerald-950/20">
            {/* Corner brackets */}
            <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></span>
            <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></span>
            <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></span>

            {/* Scanning Laser Beam */}
            {isScanning && (
              <div className="absolute left-2 right-2 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-scan-laser"></div>
            )}

            {scanComplete ? (
              <div className="text-center animate-in zoom-in duration-200">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-2 drop-shadow-[0_0_10px_#10b981]" />
                <span className="text-sm font-black text-emerald-300 uppercase tracking-widest">
                  TAG VERIFIED
                </span>
                <p className="text-[10px] text-emerald-400/80 font-mono mt-1">ISO-14443A Crypt Token OK</p>
              </div>
            ) : isScanning ? (
              <div className="text-center space-y-2">
                <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="text-xs font-mono text-emerald-300 font-bold">
                  {scanMode === 'NFC' ? 'READING NFC CONTACT...' : 'ACQUIRING QR CODE...'}
                </div>
                <div className="text-[10px] text-slate-400">Geofence accuracy: ±0.02m</div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                {scanMode === 'NFC' ? (
                  <Radio className="w-12 h-12 text-emerald-400/80 mx-auto animate-pulse" />
                ) : (
                  <QrCode className="w-12 h-12 text-emerald-400/80 mx-auto" />
                )}
                <div className="text-xs font-semibold text-slate-300">
                  {scanMode === 'NFC' ? 'Hold phone against NFC tag' : 'Align QR code inside box'}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                  READY FOR INPUT
                </div>
              </div>
            )}
          </div>

          {/* GPS Coordinate HUD */}
          <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>LAT {checkpoint.coordinates.lat.toFixed(4)}° N • LON {Math.abs(checkpoint.coordinates.lng).toFixed(4)}° W</span>
            </span>
            <span className="text-emerald-400 font-semibold">GPS LOCK OK</span>
          </div>
        </div>

        {/* Checkpoint Details info */}
        <div className="p-4 bg-slate-900 space-y-3">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CHECKPOINT TARGET</div>
            <div className="text-sm font-bold text-white mt-0.5">{checkpoint.name}</div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              {checkpoint.instructions || 'Perform biometric and visual safety log verification.'}
            </p>
          </div>

          {/* Trigger Scan Button */}
          {!scanComplete && (
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-98 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isScanning ? 'TRANSMITTING VERIFICATION...' : `SIMULATE ${scanMode} SCAN & VERIFY`}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
