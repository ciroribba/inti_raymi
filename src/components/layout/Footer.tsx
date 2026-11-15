import React, { useState } from 'react';
import { ArrowUp, Music, Radio, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { FESTIVAL_INFO } from '../../data/festivalData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] border-t border-[#232332] text-zinc-300 overflow-hidden pt-20 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-[#d9ff00]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid: Newsletter + Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1c1c28]">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d9ff00]/10 border border-[#d9ff00]/30 text-[#d9ff00] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSMISIÓN DE LA CUMBRE // ANDES 2026</span>
            </div>

            <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter text-white leading-tight">
              EL RITUAL CONTINÚA EN EL HORIZONTE.
            </h3>

            <p className="font-editorial italic text-xl text-zinc-300 max-w-xl leading-relaxed">
              &ldquo;Donde el viento milenario de la cordillera se fusiona con la precisión del pulso modular analógico. Un homenaje sagrado al Solsticio de Invierno.&rdquo;
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              <label htmlFor="footer-email" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                Únete a la lista prioritaria de anuncios y sets en vivo:
              </label>
              <div className="flex items-center bg-[#0d0d14] border border-[#232332] focus-within:border-[#d9ff00] transition-colors p-1">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@frecuencia.com"
                  required
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d9ff00] text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{subscribed ? 'LISTO' : 'ENVIAR'}</span>
                </button>
              </div>
              {subscribed && (
                <p className="text-xs font-mono text-[#d9ff00] mt-2">
                  ✓ Transmisión confirmada. Recibirás las coordenadas directas.
                </p>
              )}
            </form>
          </div>

          {/* Telemetry & Technical Specs (Lando Norris style data display) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 bg-[#0a0a10] border border-[#1c1c28] p-6 self-start">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block tracking-widest">LOCALIZACIÓN</span>
              <p className="font-mono text-xs font-bold text-white">{FESTIVAL_INFO.location}</p>
              <p className="font-mono text-[10px] text-zinc-400">{FESTIVAL_INFO.coordinates}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block tracking-widest">ALTITUD Y PRESIÓN</span>
              <p className="font-mono text-xs font-bold text-[#d9ff00]">{FESTIVAL_INFO.altitude}</p>
              <p className="font-mono text-[10px] text-zinc-400">640 hPa // Aclimatación guiada</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block tracking-widest">SISTEMA DE AUDIO</span>
              <p className="font-mono text-xs font-bold text-white">Funktion-One Vero 360°</p>
              <p className="font-mono text-[10px] text-zinc-400">320,000 W RMS // Ultra Low Distortion</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block tracking-widest">SUSTENTABILIDAD</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00f5d4]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Cero Huella</span>
              </div>
              <p className="font-mono text-[10px] text-zinc-400">Energía solar + Baterías Litio</p>
            </div>
          </div>
        </div>

        {/* Massive Typography Marquee / Showcase (Lando Norris Banner) */}
        <div className="py-12 border-b border-[#1c1c28]">
          <div className="flex items-center justify-between">
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-900 select-none">
              INTI-RAYMI
            </h1>
            <button
              onClick={scrollToTop}
              className="group p-4 border border-[#232332] bg-[#0d0d14] hover:border-[#d9ff00] transition-colors"
              title="Volver arriba"
            >
              <ArrowUp className="w-6 h-6 text-zinc-400 group-hover:text-[#d9ff00] group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            <p>© 2026 INTI-RAYMI SOUND ALLIANCE. TODOS LOS DERECHOS RESERVADOS.</p>
            <p className="text-[10px] text-zinc-500 mt-1 max-w-xl">
              * Proyecto conceptual para portfolio profesional. Los nombres de artistas se utilizan únicamente con fines ilustrativos y demostrativos de curaduría de diseño y arquitectura frontend.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#d9ff00] transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>INSTAGRAM</span>
            </a>
            <a href="https://soundcloud.com" target="_blank" rel="noreferrer" className="hover:text-[#d9ff00] transition-colors flex items-center gap-1">
              <Music className="w-3.5 h-3.5" />
              <span>SOUNDCLOUD</span>
            </a>
            <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-[#d9ff00] transition-colors flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" />
              <span>RADIO BROADCAST</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
