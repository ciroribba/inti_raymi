import React from 'react';
import { motion } from 'framer-motion';
import { Play, MapPin, Zap } from 'lucide-react';
import { FESTIVAL_INFO } from '../../data/festivalData';
import { useFestival } from '../../context/FestivalContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const HeroSection: React.FC = () => {
  const { openCheckout } = useFestival();
  const { playClick, playSubDrop } = useSoundEffect();

  const scrollToSection = (id: string) => {
    playClick();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12 bg-[#050507]">
      {/* Background Graphic & Textured Mountain Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Cinematic dark mountain backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform motion-safe:animate-pulse"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')`,
            animationDuration: '12s',
          }}
        />

        {/* Gradient Voids (Lando Norris high-contrast darkness) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-transparent to-[#050507]" />

        {/* Ambient Neon Blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#d9ff00]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#00f5d4]/10 rounded-full blur-[160px]" />

        {/* Sacred Geometry / Andean Topography Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="sacred-topo" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 0 60 Q 30 10 60 60 T 120 60 M 0 30 Q 30 80 60 30 T 120 30 M 0 90 Q 30 40 60 90 T 120 90"
                fill="none"
                stroke="#d9ff00"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-topo)" />
        </svg>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* Top Badges & Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 sm:gap-6 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d9ff00]/10 border border-[#d9ff00]/40 text-[#d9ff00] text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#d9ff00] animate-ping" />
            <span>SOLSTICIO ANDINO 2026</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-wider backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-[#00f5d4]" />
            <span>VALLE DE LA PUNA // {FESTIVAL_INFO.altitude}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#ff4a11]" />
            <span>3 NOCHES • 3 ESCENARIOS • 320KW VERO</span>
          </div>
        </motion.div>

        {/* Oversized Kinetic Typography (Lando Norris style) */}
        <div className="space-y-2 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tighter uppercase leading-[0.85] text-white flex flex-wrap items-baseline gap-x-6">
              <span>INTI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9ff00] via-white to-[#00f5d4]">
                RAYMI
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2"
          >
            <p className="font-editorial italic text-3xl sm:text-4xl md:text-5xl text-zinc-200 tracking-tight max-w-2xl">
              &ldquo;Sonidos del Sol Eterno&rdquo;
            </p>

            <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-md uppercase tracking-wider leading-relaxed">
              La convergencia sónica más alta del planeta. Frecuencias modulares, techno implacable y rituales sagrados a 3,820 metros de altitud sobre el nivel del mar.
            </p>
          </motion.div>
        </div>

        {/* Action Controls & Interactive CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4"
        >
          {/* Main Neon CTA */}
          <button
            onClick={() => {
              playSubDrop();
              openCheckout();
            }}
            className="group relative px-8 py-4 bg-[#d9ff00] text-black font-display font-black text-base sm:text-lg uppercase tracking-wider transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(217,255,0,0.7)] flex items-center gap-3 cursor-pointer"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
            }}
          >
            <span>RESERVAR ENTRADAS</span>
            <span className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform" />
          </button>

          {/* Secondary Lineup CTA */}
          <button
            onClick={() => scrollToSection('#lineup')}
            className="group px-7 py-4 border border-[#232332] bg-[#0d0d14]/80 backdrop-blur-sm text-white font-mono text-xs sm:text-sm uppercase tracking-widest hover:border-[#d9ff00] hover:text-[#d9ff00] transition-all flex items-center gap-3 cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#d9ff00] group-hover:scale-125 transition-transform" />
            <span>EXPLORAR LINE-UP</span>
          </button>

          {/* Quick Urgency Metric Tag */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0d0d14] border border-[#232332]">
            <div className="flex -space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d9ff00] animate-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff4a11]" />
            </div>
            <span className="font-mono text-xs text-zinc-300">
              <strong className="text-white">TIER 2</strong> EN CURSO // 84% VENDIDO
            </span>
          </div>
        </motion.div>
      </div>

      {/* Kinetic Marquee Ticker at bottom of Hero (Lando Norris signature banner) */}
      <div className="relative z-10 w-full mt-12 py-3 bg-[#0d0d14] border-y border-[#232332] overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <span className="text-[#d9ff00] font-bold">● INTI STAGE: AMELIE LENS • REINIER ZONNEVELD • BORIS BREJCHA • INDIRA PAGANOTTO</span>
          <span className="text-zinc-600">//</span>
          <span className="text-[#00f5d4] font-bold">● PACHA STAGE: TALE OF US • STEPHAN BODZIN • ADRIATIQUE • MATHAME</span>
          <span className="text-zinc-600">//</span>
          <span className="text-[#ff4a11] font-bold">● KOLLA STAGE: NICOLA CRUZ • SATORI • ACID PAULI • CHANCHA VÍA CIRCUITO</span>
          <span className="text-zinc-600">//</span>
          <span className="text-white">FUNKTION-ONE VERO 360° • 3,820 M.S.N.M. • 19—21 JUNIO 2026</span>
          <span className="text-zinc-600">//</span>
          <span className="text-[#d9ff00]">SOLSTICIO DE INVIERNO • CORDILLERA DE LOS ANDES</span>
        </div>
      </div>
    </section>
  );
};
