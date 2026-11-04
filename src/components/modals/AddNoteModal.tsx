import React, { useState } from 'react';
import { X, FileText, Camera, Upload, Check, AlertCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (category: string, note: string, imageUrl?: string) => void;
  mode?: 'note' | 'photo';
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
  mode = 'note',
}) => {
  const [category, setCategory] = useState<string>('Perimeter Check');
  const [content, setContent] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    'Perimeter Check',
    'Egress Obstruction',
    'Lock / Barrier Inspection',
    'Suspicious Loitering',
    'Visitor Log Anomaly',
    'Maintenance Notice',
  ];

  const samplePhotos = [
    { name: 'Turnstile_Log_01.jpg', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Fire_Door_LevelB1.jpg', url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80' },
    { name: 'Loading_Dock_Seal.jpg', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedPhoto) return;

    sound.playRadioChirp();
    onAddNote(category, content || 'Evidence photo logged and uploaded to encrypted patrol audit trail.', selectedPhoto || undefined);
    setContent('');
    setSelectedPhoto(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
              {mode === 'photo' ? <Camera className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4 text-amber-400" />}
            </div>
            <div>
              <div className="text-xs font-black tracking-wider uppercase text-slate-900">
                {mode === 'photo' ? 'EVIDENCE PHOTO UPLOADER' : 'OFFICER TACTICAL LOGGER'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">ISO-27001 AUDIT COMPLIANT</div>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
              Observation Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-800"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Note Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
              Field Log Description
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="e.g., Egress doors inspected, latch fully engaged, emergency panic hardware operational."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Photo Attachment Section */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
              <span>Attach Evidence Photo</span>
              <span className="text-[9px] text-emerald-600 font-bold uppercase">GPS Geo-Tagged</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {samplePhotos.map((p) => {
                const isSelected = selectedPhoto === p.url;
                return (
                  <button
                    type="button"
                    key={p.name}
                    onClick={() => {
                      sound.playClick();
                      setSelectedPhoto(isSelected ? null : p.url);
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-video ${
                      isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <span className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                    <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white text-[8px] font-mono px-1 py-0.5 truncate text-left">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-2 flex items-center space-x-1.5 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>All attachments automatically watermarked with Officer ID, LAT/LON & ISO timestamp.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Log Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
