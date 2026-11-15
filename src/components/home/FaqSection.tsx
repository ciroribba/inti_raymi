import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FESTIVAL_FAQ } from '../../data/festivalData';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { playClick } = useSoundEffect();

  const toggle = (idx: number) => {
    playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#08080e] border-t border-[#232332] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#d9ff00] text-xs font-mono uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GUÍA DE EXPEDICIÓN // PREGUNTAS FRECUENTES</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter text-white">
            INFORMACIÓN ESENCIAL
          </h2>

          <p className="font-editorial italic text-xl text-zinc-400">
            Todo lo que necesitas conocer antes de ascender a los 3,820 metros de altitud.
          </p>
        </div>

        <div className="space-y-4">
          {FESTIVAL_FAQ.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-[#0d0d14] border border-[#232332] overflow-hidden transition-colors hover:border-zinc-500"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d9ff00] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm font-mono text-zinc-400 leading-relaxed border-t border-[#1c1c28] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

