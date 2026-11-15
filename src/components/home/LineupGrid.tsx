import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Radio, Sparkles, Disc3, Info } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';
import { LINEUP_ARTISTS, FESTIVAL_NIGHTS, FESTIVAL_STAGES } from '../../data/festivalData';
import { DJ, NightId, StageId } from '../../types';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import { DJImage } from '../dj/DJImage';

export const LineupGrid: React.FC = () => {
  const {
    selectedNight,
    setSelectedNight,
    selectedStage,
    setSelectedStage,
    setSelectedDJ,
  } = useFestival();
  const { playClick, playHover } = useSoundEffect();

  // Filter DJs based on active filters
  const filteredDJs = useMemo(() => {
    return LINEUP_ARTISTS.filter((dj) => {
      const matchNight = selectedNight === 'all' || dj.nightId === selectedNight;
      const matchStage = selectedStage === 'all' || dj.stageId === selectedStage;
      return matchNight && matchStage;
    });
  }, [selectedNight, selectedStage]);

  const getStageColor = (stageId: StageId) => {
    switch (stageId) {
      case 'inti':
        return {
          border: 'border-[#d9ff00]',
          text: 'text-[#d9ff00]',
          bg: 'bg-[#d9ff00]/10',
          glow: 'hover:shadow-[0_0_30px_rgba(217,255,0,0.25)]',
        };
      case 'pacha':
        return {
          border: 'border-[#00f5d4]',
          text: 'text-[#00f5d4]',
          bg: 'bg-[#00f5d4]/10',
          glow: 'hover:shadow-[0_0_30px_rgba(0,245,212,0.25)]',
        };
      case 'kolla':
        return {
          border: 'border-[#ff4a11]',
          text: 'text-[#ff4a11]',
          bg: 'bg-[#ff4a11]/10',
          glow: 'hover:shadow-[0_0_30px_rgba(255,74,17,0.25)]',
        };
    }
  };

  const handleCardClick = (dj: DJ) => {
    playClick();
    setSelectedDJ(dj);
  };

  return (
    <section id="lineup" className="relative py-28 bg-[#050507] text-white overflow-hidden">
      {/* Background Topo Lines */}
      <div className="absolute inset-0 bg-topo-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Lando Norris style) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#232332]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#d9ff00] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ROSTER DE ARTISTAS // 3 DÍAS Y NOCHES</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-white">
              LINE-UP OFICIAL <span className="text-[#d9ff00]">2026</span>
            </h2>

            <p className="font-editorial italic text-2xl text-zinc-400 max-w-xl">
              18 pioneros de la vanguardia electrónica mundial distribuidos en 3 templos acústicos simultáneos.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-4 bg-[#0d0d14] border border-[#232332] p-4 self-start font-mono text-xs">
            <div className="text-right">
              <span className="text-zinc-500 block text-[10px]">TOTAL PRESENTACIONES</span>
              <span className="text-white font-bold text-lg">{filteredDJs.length} ACTS</span>
            </div>
            <div className="w-px h-8 bg-[#232332]" />
            <div className="text-left">
              <span className="text-zinc-500 block text-[10px]">CUMBRE SONICA</span>
              <span className="text-[#d9ff00] font-bold text-lg">3,820 M</span>
            </div>
          </div>
        </div>

        {/* Filter Controls: Nights & Stages */}
        <div className="pt-8 pb-10 space-y-4">
          {/* Night Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 shrink-0 mr-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> NOCHE:
            </span>

            <button
              onClick={() => {
                playClick();
                setSelectedNight('all');
              }}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                selectedNight === 'all'
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#0d0d14] text-zinc-400 border border-[#232332] hover:text-white hover:border-zinc-500'
              }`}
            >
              TODAS LAS NOCHES (18 ACTS)
            </button>

            {FESTIVAL_NIGHTS.map((night) => (
              <button
                key={night.id}
                onClick={() => {
                  playClick();
                  setSelectedNight(night.id as NightId);
                }}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedNight === night.id
                    ? 'bg-[#d9ff00] text-black font-bold shadow-[0_0_15px_rgba(217,255,0,0.3)]'
                    : 'bg-[#0d0d14] text-zinc-400 border border-[#232332] hover:text-white hover:border-zinc-500'
                }`}
              >
                NOCHE {night.number}: {night.dateStr}
              </button>
            ))}
          </div>

          {/* Stage Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 shrink-0 mr-2 flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" /> PISTA:
            </span>

            <button
              onClick={() => {
                playClick();
                setSelectedStage('all');
              }}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                selectedStage === 'all'
                  ? 'bg-zinc-200 text-black font-bold'
                  : 'bg-[#0d0d14] text-zinc-400 border border-[#232332] hover:text-white'
              }`}
            >
              TODAS LAS PISTAS
            </button>

            {FESTIVAL_STAGES.map((stage) => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    playClick();
                    setSelectedStage(stage.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer border ${
                    isSelected
                      ? `${stage.tagColor} font-bold shadow-md`
                      : 'bg-[#0d0d14] text-zinc-400 border-[#232332] hover:text-white hover:border-zinc-600'
                  }`}
                >
                  {stage.name} ({stage.subtitle.split('&')[0]})
                </button>
              );
            })}
          </div>
        </div>

        {/* DJs Grid (Asymmetrical Hall of Fame cards) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredDJs.map((dj, index) => {
              const style = getStageColor(dj.stageId);
              const stageData = FESTIVAL_STAGES.find((s) => s.id === dj.stageId);

              return (
                <motion.div
                  key={dj.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onMouseEnter={playHover}
                  onClick={() => handleCardClick(dj)}
                  className={`group relative bg-[#0d0d14] border border-[#232332] overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/40 ${style.glow}`}
                  style={{
                    clipPath:
                      'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
                  }}
                >
                  {/* Artist Image with Zoom & Dark Gradient */}
                  <div className="relative aspect-4/3 overflow-hidden bg-zinc-950">
                    <DJImage
                      src={dj.imageUrl}
                      alt={dj.name}
                      name={dj.name}
                      stageId={dj.stageId}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover object-center filter grayscale contrast-125 transition-all duration-700 group-hover:scale-108 group-hover:grayscale-0"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-transparent" />

                    {/* Stage Badge (Top Left) */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase border ${style.border} ${style.bg} ${style.text} backdrop-blur-md`}
                      >
                        {stageData?.name}
                      </span>
                    </div>

                    {/* Headliner Badge (Top Right) */}
                    {dj.isHeadliner && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-widest bg-[#d9ff00] text-black">
                          <Sparkles className="w-3 h-3" /> HEADLINER
                        </span>
                      </div>
                    )}

                    {/* Time Slot Tag (Bottom Right overlay) */}
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                      {dj.timeSlot} HRS
                    </div>
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                        <span>{dj.origin}</span>
                        <span className="text-zinc-400">{dj.bpm} BPM</span>
                      </div>

                      <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white group-hover:text-[#d9ff00] transition-colors leading-tight">
                        {dj.name}
                      </h3>

                      <p className="font-editorial italic text-sm text-zinc-400 mt-1">
                        {dj.genre}
                      </p>
                    </div>

                    {/* Simulated Audio Preview Bar */}
                    <div className="p-2.5 bg-black/60 border border-zinc-900 rounded-none flex items-center justify-between gap-3 group/track">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Disc3 className="w-4 h-4 text-[#d9ff00] shrink-0 group-hover/track:animate-spin" />
                        <span className="text-[11px] font-mono text-zinc-300 truncate">
                          {dj.featuredTrack}
                        </span>
                      </div>

                      {/* Mini Waveform visualization */}
                      <div className="flex items-end gap-0.5 h-3 shrink-0">
                        <span className="w-0.5 h-1.5 bg-[#d9ff00] group-hover:animate-wave-1" />
                        <span className="w-0.5 h-3 bg-[#d9ff00] group-hover:animate-wave-2" />
                        <span className="w-0.5 h-2 bg-[#d9ff00] group-hover:animate-wave-3" />
                        <span className="w-0.5 h-2.5 bg-[#d9ff00] group-hover:animate-wave-4" />
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#1c1c28] text-xs font-mono">
                      <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
                        N{dj.nightId.split('-')[1]} // {stageData?.codename.split('//')[0]}
                      </span>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-[#d9ff00] group-hover:underline text-[11px] font-bold"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>VER DOSSIER</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

