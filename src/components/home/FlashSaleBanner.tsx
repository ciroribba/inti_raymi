import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Copy, Check, ArrowRight } from 'lucide-react';
import { useFlashSale } from '../../hooks/useFlashSale';
import { useFestival } from '../../context/FestivalContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const FlashSaleBanner: React.FC = () => {
  const { hours, minutes, seconds, milliseconds, spots, code, discountPercentage, copied, copyCode } = useFlashSale();
  const { openCheckout, applyPromoCode } = useFestival();
  const { playClick, playSubDrop } = useSoundEffect();

  const handleApplyAndCheckout = () => {
    playSubDrop();
    applyPromoCode(code);
    openCheckout();
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-r from-[#0d0d14] via-[#141422] to-[#0d0d14] border border-[#d9ff00]/40 p-6 md:p-8 shadow-[0_0_35px_rgba(217,255,0,0.15)]"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        }}
      >
        {/* Subtle angled background neon stripes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#d9ff00]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Urgency & Deal Information */}
          <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff4a11]/20 border border-[#ff4a11]/50 text-[#ff4a11] text-xs font-mono uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 animate-bounce" />
              <span>OFERTA RELÁMPAGO // SOLSTICIO TIER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a11] animate-ping" />
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white leading-tight">
              OBTÉN <span className="text-[#d9ff00] underline decoration-[#d9ff00]/40">{discountPercentage}% OFF</span> EN CUALQUIER TICKET
            </h3>

            <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-xl">
              Usa el código <span className="text-[#d9ff00] font-bold tracking-widest">{code}</span> antes de que expire el cronómetro.
              <span className="text-white ml-2 block sm:inline">¡Solo restan <strong>{spots} cupos</strong> con descuento!</span>
            </p>
          </div>

          {/* Right: Unified Action Card (Timer on top, Buttons below) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-3.5 w-full">
            {/* Live Kinetic Countdown Timer (Fixed Width & Tabular Numbers) */}
            <div className="flex items-center justify-between w-full max-w-[400px] bg-black/70 border border-[#232332] px-4 py-3.5 font-mono select-none shadow-inner">
              <div className="text-center w-14 shrink-0">
                <span className="font-display font-black text-2xl sm:text-3xl text-white block tabular-nums leading-none">
                  {hours}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 block mt-1">HORAS</span>
              </div>
              <span className="text-[#d9ff00] font-black text-xl shrink-0">:</span>

              <div className="text-center w-14 shrink-0">
                <span className="font-display font-black text-2xl sm:text-3xl text-white block tabular-nums leading-none">
                  {minutes}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 block mt-1">MIN</span>
              </div>
              <span className="text-[#d9ff00] font-black text-xl shrink-0">:</span>

              <div className="text-center w-14 shrink-0">
                <span className="font-display font-black text-2xl sm:text-3xl text-white block tabular-nums leading-none">
                  {seconds}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 block mt-1">SEG</span>
              </div>
              <span className="text-[#d9ff00] font-black text-xl shrink-0">:</span>

              <div className="text-center w-14 shrink-0">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#d9ff00] block tabular-nums leading-none">
                  {milliseconds}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#d9ff00] block mt-1">MS</span>
              </div>
            </div>

            {/* Buttons: Cohesive two-button row aligned with the timer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-[400px]">
              <button
                onClick={() => {
                  playClick();
                  copyCode();
                }}
                className="w-full px-2.5 py-3 bg-[#171724] border border-[#232332] hover:border-[#d9ff00] text-zinc-300 font-mono text-[11px] uppercase tracking-tight flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#d9ff00] shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                <span className="truncate">{copied ? '¡COPIADO!' : `COPIAR ${code}`}</span>
              </button>

              <button
                onClick={handleApplyAndCheckout}
                className="w-full px-2 py-3 bg-[#d9ff00] text-black font-display font-black text-[10px] uppercase tracking-tight hover:bg-white hover:shadow-[0_0_20px_rgba(217,255,0,0.5)] transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              >
                <span className="whitespace-nowrap shrink-0">APLICAR Y COMPRAR</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

