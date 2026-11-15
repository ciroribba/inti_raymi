import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Check, ShieldAlert, Sparkles, Layers, Flame } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';
import { FESTIVAL_TICKETS } from '../../data/festivalData';
import { TicketCategory, TicketItem } from '../../types';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const TicketSelector: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TicketCategory | 'all'>('all');
  const { openCheckout } = useFestival();
  const { playClick, playSubDrop } = useSoundEffect();

  // Quantities state per ticket
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'tkt-full-pass': 1,
    'tkt-vip-solar': 1,
  });

  const getQuantity = (id: string) => quantities[id] || 1;

  const setQuantity = (id: string, delta: number) => {
    playClick();
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, Math.min(6, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const filteredTickets = activeCategory === 'all'
    ? FESTIVAL_TICKETS
    : FESTIVAL_TICKETS.filter((t) => t.category === activeCategory);

  const handleCheckoutClick = (ticket: TicketItem) => {
    playSubDrop();
    openCheckout(ticket, getQuantity(ticket.id));
  };

  return (
    <section id="tickets" className="relative py-28 bg-[#050507] text-white overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-[#d9ff00]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#232332]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d9ff00]/10 border border-[#d9ff00]/40 text-[#d9ff00] text-xs font-mono uppercase tracking-widest">
              <Ticket className="w-3.5 h-3.5" />
              <span>SISTEMA DE BOLETERÍA // CUPOS EN TIEMPO REAL</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
              SELECCIÓN DE ENTRADAS <span className="text-[#d9ff00]">2026</span>
            </h2>

            <p className="font-editorial italic text-2xl text-zinc-400 max-w-xl">
              Elige entre pases por pista individual, pases por día completo o la experiencia total de 3 noches.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0d0d14] border border-[#232332] p-4 font-mono text-xs text-zinc-300">
            <ShieldAlert className="w-4 h-4 text-[#ff4a11] shrink-0" />
            <span>
              Capacidad restringida por protocolo ecológico. <strong className="text-white">Emisión limitada.</strong>
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pt-8 pb-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 shrink-0 mr-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> TIPO:
          </span>

          <button
            onClick={() => {
              playClick();
              setActiveCategory('all');
            }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-black font-bold'
                : 'bg-[#0d0d14] text-zinc-400 border border-[#232332] hover:text-white hover:border-zinc-500'
            }`}
          >
            TODOS LOS PASES ({FESTIVAL_TICKETS.length})
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveCategory('single-stage');
            }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeCategory === 'single-stage'
                ? 'bg-[#d9ff00] text-black font-bold shadow-md'
                : 'bg-[#0d0d14] text-zinc-400 border border-[#232332] hover:text-white'
            }`}
          >
            PISTA INDIVIDUAL
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveCategory('day-pass');
            }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeCategory === 'day-pass'
                ? 'bg-[#d9ff00] text-black font-bold shadow-md'
                : 'bg-[#0d0d14] text-zinc-400 border border-[#232332] hover:text-white'
            }`}
          >
            DÍA COMPLETO (3 PISTAS)
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveCategory('full-pass');
            }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeCategory === 'full-pass'
                ? 'bg-[#d9ff00] text-black font-bold shadow-md'
                : 'bg-[#0d0d14] text-zinc-400 border border-[#232332] hover:text-white'
            }`}
          >
            FULL FESTIVAL (3 NOCHES)
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveCategory('vip-solar');
            }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              activeCategory === 'vip-solar'
                ? 'bg-[#00f5d4] text-black font-bold shadow-md'
                : 'bg-[#0d0d14] text-zinc-400 border border-[#232332] hover:text-white'
            }`}
          >
            VIP SOLAR ALL ACCESS
          </button>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredTickets.map((ticket, idx) => {
              const qty = getQuantity(ticket.id);
              const percentSold = Math.round(((ticket.totalStock - ticket.remainingStock) / ticket.totalStock) * 100);
              const isLowStock = ticket.remainingStock <= 15;

              return (
                <motion.div
                  key={ticket.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`relative bg-[#0d0d14] border p-7 flex flex-col justify-between transition-all duration-300 hover:border-zinc-400 ${
                    ticket.isPopular
                      ? 'border-[#d9ff00] shadow-[0_0_30px_rgba(217,255,0,0.15)]'
                      : 'border-[#232332]'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  }}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-white/5 border border-zinc-800 text-zinc-300">
                      {ticket.tier}
                    </span>

                    {ticket.badge && (
                      <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                        isLowStock
                          ? 'bg-[#ff4a11] text-white animate-pulse'
                          : 'bg-[#d9ff00] text-black'
                      }`}>
                        {isLowStock && <Flame className="w-3 h-3" />}
                        {ticket.badge}
                      </span>
                    )}
                  </div>

                  {/* Main Ticket Information */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white leading-tight">
                        {ticket.title}
                      </h3>
                      <p className="font-mono text-xs text-zinc-400 mt-1">
                        {ticket.subtitle}
                      </p>
                    </div>

                    {/* Stock Urgency Progress Bar */}
                    <div className="space-y-1.5 p-3 bg-black/60 border border-zinc-900">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-zinc-400">DISPONIBILIDAD:</span>
                        <span className={`font-bold ${isLowStock ? 'text-[#ff4a11]' : 'text-[#d9ff00]'}`}>
                          {ticket.remainingStock} CUPOS ({percentSold}% VENDIDO)
                        </span>
                      </div>

                      <div className="w-full bg-zinc-900 h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${
                            isLowStock ? 'bg-[#ff4a11]' : 'bg-[#d9ff00]'
                          }`}
                          style={{ width: `${percentSold}%` }}
                        />
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="py-2 flex items-baseline gap-3 border-y border-[#1c1c28]">
                      <span className="font-display font-black text-4xl text-white">
                        ${ticket.price}
                      </span>
                      <span className="font-mono text-xs text-zinc-400 uppercase">USD / TICKET</span>

                      {ticket.originalPrice && (
                        <span className="font-mono text-xs text-zinc-500 line-through ml-auto">
                          ${ticket.originalPrice} USD
                        </span>
                      )}
                    </div>

                    {/* Perks List */}
                    <ul className="space-y-2.5 text-xs font-mono text-zinc-300 py-2">
                      {ticket.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#d9ff00] shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantity and Checkout Actions */}
                  <div className="pt-6 mt-4 border-t border-[#1c1c28] space-y-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400 uppercase">CANTIDAD:</span>
                      <div className="flex items-center border border-[#232332] bg-black">
                        <button
                          type="button"
                          onClick={() => setQuantity(ticket.id, -1)}
                          disabled={qty <= 1}
                          className="px-3 py-1 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-bold text-white min-w-8 text-center">{qty}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(ticket.id, 1)}
                          disabled={qty >= 6}
                          className="px-3 py-1 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleCheckoutClick(ticket)}
                      className="w-full py-3.5 bg-[#d9ff00] text-black font-display font-black text-xs uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(217,255,0,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>COMPRAR {qty > 1 ? `(${qty}) ENTRADAS` : 'ENTRADA'} — ${ticket.price * qty} USD</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

