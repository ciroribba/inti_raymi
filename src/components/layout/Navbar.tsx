import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Ticket, Compass, ArrowUpRight } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import { FESTIVAL_INFO } from '../../data/festivalData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCheckout } = useFestival();
  const { soundEnabled, toggleSound, playClick } = useSoundEffect();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'LINEUP 2026', href: '#lineup' },
    { name: 'ESCENARIOS', href: '#stages' },
    { name: 'EXPERIENCIA', href: '#experience' },
    { name: 'ENTRADAS', href: '#tickets' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050507]/90 backdrop-blur-md border-b border-[#232332]/80 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#050507]/90 via-[#050507]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#"
            onClick={() => playClick()}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="relative w-9 h-9 border border-[#d9ff00] bg-[#050507] flex items-center justify-center transition-transform group-hover:scale-105">
              {/* Rotating Sol Glyph */}
              <div className="w-4 h-4 rounded-full bg-[#d9ff00] animate-pulse" />
              <div className="absolute inset-0 border border-[#d9ff00]/40 -rotate-45 transition-transform group-hover:rotate-0" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tighter text-white group-hover:text-[#d9ff00] transition-colors">
                  {FESTIVAL_INFO.name}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 bg-[#d9ff00]/10 border border-[#d9ff00]/30 text-[#d9ff00] uppercase tracking-widest">
                  2026
                </span>
              </div>
              <p className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase hidden sm:block">
                {FESTIVAL_INFO.coordinates} // {FESTIVAL_INFO.altitude}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-[#d9ff00] transition-colors py-1 group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d9ff00] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Audio Ambience Synthesizer Toggle */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-mono transition-all ${
                soundEnabled
                  ? 'border-[#d9ff00] text-[#d9ff00] bg-[#d9ff00]/10 shadow-[0_0_15px_rgba(217,255,0,0.2)]'
                  : 'border-[#232332] text-zinc-400 hover:text-white hover:border-zinc-500 bg-[#0d0d14]'
              }`}
              title={soundEnabled ? 'Silenciar audio sensorial' : 'Activar audio sensorial'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 bg-[#d9ff00] animate-wave-1" />
                    <span className="w-0.5 bg-[#d9ff00] animate-wave-2" />
                    <span className="w-0.5 bg-[#d9ff00] animate-wave-3" />
                  </div>
                  <span className="hidden md:inline text-[10px] tracking-wider font-bold">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[10px] tracking-wider">AUDIO OFF</span>
                </>
              )}
            </button>

            {/* Prominent High-Impact Ticket CTA (Lando Norris style) */}
            <button
              onClick={() => {
                playClick();
                openCheckout();
              }}
              className="relative group overflow-hidden bg-[#d9ff00] text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-6 py-2.5 transition-all duration-200 hover:bg-white hover:shadow-[0_0_25px_rgba(217,255,0,0.6)] flex items-center gap-2"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>GET TICKETS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 text-zinc-300 hover:text-white border border-[#232332] bg-[#0d0d14]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#d9ff00]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-30 bg-[#050507]/98 backdrop-blur-xl border-b border-[#232332] flex flex-col justify-between p-6 lg:hidden"
          >
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d9ff00] tracking-widest pb-3 border-b border-[#232332]">
                <Compass className="w-4 h-4 animate-spin text-[#d9ff00]" />
                <span>NAVEGACIÓN DEL FESTIVAL</span>
              </div>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between text-2xl font-display font-extrabold uppercase tracking-tight text-zinc-100 hover:text-[#d9ff00] py-2 border-b border-zinc-900"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-600" />
                </motion.a>
              ))}
            </div>

            <div className="pt-6 border-t border-[#232332] space-y-4">
              <div className="text-[11px] font-mono text-zinc-400 space-y-1">
                <p>COORD: {FESTIVAL_INFO.coordinates}</p>
                <p>ALTITUD: {FESTIVAL_INFO.altitude} // 3 DÍAS Y NOCHES</p>
              </div>

              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  openCheckout();
                }}
                className="w-full py-4 bg-[#d9ff00] text-black font-display font-black text-center uppercase tracking-wider text-base"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                }}
              >
                COMPRAR PASES AHORA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

