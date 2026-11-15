import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';
import { FESTIVAL_STAGES, FESTIVAL_NIGHTS } from '../../data/festivalData';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import { DJImage } from './DJImage';

export const DJModal: React.FC = () => {
  const { selectedDJ, setSelectedDJ, setSelectedNight } = useFestival();
  const { playClick, playSubDrop } = useSoundEffect();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!selectedDJ) return null;

  const stage = FESTIVAL_STAGES.find((s) => s.id === selectedDJ.stageId);
  const night = FESTIVAL_NIGHTS.find((n) => n.id === selectedDJ.nightId);

  const handleClose = () => {
    playClick();
    setIsPlaying(false);
    setSelectedDJ(null);
  };

  const togglePlay = () => {
    playClick();
    setIsPlaying(!isPlaying);
  };

  const handleViewNightTickets = () => {
    playSubDrop();
    setSelectedNight(selectedDJ.nightId);
    handleClose();
    const ticketsEl = document.querySelector('#tickets');
    if (ticketsEl) {
      ticketsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-start p-2 sm:p-4 md:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-[#0a0a10] border border-[#232332] text-white shadow-2xl my-2 sm:my-8 max-h-[96vh] sm:max-h-[90vh] overflow-y-auto"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        >
          {/* Header Close Button - Sticky on mobile */}
          <button
            onClick={handleClose}
            className="sticky top-3 float-right mr-3 z-30 p-2.5 bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 hover:text-[#d9ff00] hover:border-[#d9ff00] transition-colors cursor-pointer shadow-lg"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Column: Big Artist Portrait */}
            <div className="md:col-span-5 relative aspect-square md:aspect-auto h-72 md:h-full bg-zinc-950 overflow-hidden">
              <DJImage
                src={selectedDJ.imageUrl}
                alt={selectedDJ.name}
                name={selectedDJ.name}
                stageId={selectedDJ.stageId}
                className="w-full h-full min-h-[280px]"
                imgClassName="w-full h-full object-cover object-center filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-[#0a0a10]/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a10]" />

              <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1">
                <span
                  className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase border"
                  style={{
                    borderColor: stage?.accentColor,
                    color: stage?.accentColor,
                    backgroundColor: `${stage?.accentColor}15`,
                  }}
                >
                  {stage?.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-300">
                  {night?.dateStr}
                </span>
              </div>
            </div>

            {/* Right Column: Bio, Track & Telemetry */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-[#d9ff00]" />
                    <span>{selectedDJ.origin}</span>
                    <span>//</span>
                    <span>{selectedDJ.bpm} BPM</span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
                    {selectedDJ.name}
                  </h3>

                  <p className="font-editorial italic text-lg text-zinc-400">
                    {selectedDJ.genre}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#1c1c28] text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Calendar className="w-4 h-4 text-[#00f5d4]" />
                    <span>{night?.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="w-4 h-4 text-[#d9ff00]" />
                    <span>{selectedDJ.timeSlot} HRS</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
                  {selectedDJ.bio}
                </p>

                {/* Simulated Audio Preview */}
                <div className="p-3 bg-[#12121e] border border-[#232332] flex items-center justify-between gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-[#d9ff00] text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                  </button>

                  <div className="overflow-hidden flex-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">CORTE EXCLUSIVO:</span>
                    <span className="text-xs font-mono font-bold text-white truncate block">
                      {selectedDJ.featuredTrack}
                    </span>
                  </div>

                  {/* Equalizer animation */}
                  <div className="flex items-end gap-1 h-5 shrink-0">
                    <span className={`w-1 bg-[#d9ff00] ${isPlaying ? 'animate-wave-1' : 'h-1.5'}`} />
                    <span className={`w-1 bg-[#d9ff00] ${isPlaying ? 'animate-wave-2' : 'h-3'}`} />
                    <span className={`w-1 bg-[#d9ff00] ${isPlaying ? 'animate-wave-3' : 'h-2'}`} />
                    <span className={`w-1 bg-[#d9ff00] ${isPlaying ? 'animate-wave-4' : 'h-2.5'}`} />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#1c1c28]">
                <button
                  onClick={handleViewNightTickets}
                  className="w-full py-3.5 bg-[#d9ff00] text-black font-display font-black text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>VER ENTRADAS PARA {night?.dateStr}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
