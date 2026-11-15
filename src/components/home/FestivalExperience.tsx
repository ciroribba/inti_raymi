import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wind, Mountain, Radio, Volume2, ShieldCheck } from 'lucide-react';
import { FESTIVAL_STAGES } from '../../data/festivalData';
import { useFestival } from '../../context/FestivalContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const FestivalExperience: React.FC = () => {
  const { setSelectedStage } = useFestival();
  const { playClick } = useSoundEffect();

  const handleStageSelect = (stageId: typeof FESTIVAL_STAGES[0]['id']) => {
    playClick();
    setSelectedStage(stageId);
    const lineupEl = document.querySelector('#lineup');
    if (lineupEl) {
      lineupEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'inti':
        return <Sun className="w-6 h-6 text-[#d9ff00]" />;
      case 'pacha':
        return <Mountain className="w-6 h-6 text-[#00f5d4]" />;
      case 'kolla':
        return <Wind className="w-6 h-6 text-[#ff4a11]" />;
      default:
        return <Radio className="w-6 h-6 text-[#d9ff00]" />;
    }
  };

  return (
    <section id="stages" className="relative py-28 bg-[#08080d] border-t border-[#232332] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f5d4]/10 border border-[#00f5d4]/40 text-[#00f5d4] text-xs font-mono uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5" />
            <span>ARQUITECTURA ACÚSTICA // 3 TEMPLOS</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            3 PISTAS SIMULTÁNEAS EN LA CORDILLERA
          </h2>

          <p className="font-editorial italic text-2xl text-zinc-400">
            Cada escenario responde a una frecuencia, un sub-ritmo de la electrónica y una coordenada sagrada de Los Andes.
          </p>
        </div>

        {/* 3 Stages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {FESTIVAL_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative bg-[#0d0d14] border border-[#232332] p-8 flex flex-col justify-between group hover:border-zinc-500 transition-all duration-300"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              }}
            >
              {/* Glow accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
                style={{ backgroundColor: stage.accentColor }}
              />

              <div className="space-y-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-black/60 border border-zinc-800">
                    {getStageIcon(stage.id)}
                  </div>
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                    ALT: {stage.altitude}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    {stage.codename}
                  </span>
                  <h3 className="font-display font-black text-3xl uppercase tracking-tight text-white mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: stage.accentColor }}>
                    {stage.subtitle}
                  </p>
                </div>

                <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                  {stage.description}
                </p>

                {/* Sound System & Visual Spec Boxes */}
                <div className="space-y-3 pt-4 border-t border-[#1c1c28] text-xs font-mono">
                  <div className="flex items-start gap-2">
                    <Volume2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-400 uppercase block text-[10px]">SISTEMA DE AUDIO:</span>
                      <span className="text-white font-medium">{stage.soundSystem}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Radio className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-400 uppercase block text-[10px]">DISEÑO LUMÍNICO:</span>
                      <span className="text-zinc-300">{stage.visualRig}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-8 mt-6 border-t border-[#1c1c28]">
                <button
                  onClick={() => handleStageSelect(stage.id)}
                  className="w-full py-3 bg-[#171724] border border-[#232332] hover:border-white text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                >
                  <span>FILTRAR LINE-UP DE ESTE ESCENARIO</span>
                  <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Immersion & Sanctuary Lore Strip */}
        <div id="experience" className="bg-[#050507] border border-[#232332] p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d9ff00]" />
                <span>EXPERIENCIA DE ALTURA SOSTENIBLE // PROTOCOLO ANDINO</span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
                CONEXIÓN SAGRADA A 3,820 METROS DE ALTITUD
              </h3>

              <p className="font-editorial italic text-xl text-zinc-300 leading-relaxed">
                INTI-RAYMI no es solo un festival: es un santuario temporal donde la comunidad electrónica mundial rinde tributo a las fuerzas elementales de la tierra, el viento y el sol andino.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono text-zinc-400">
                <div className="p-3 bg-[#0d0d14] border border-zinc-800">
                  <strong className="text-white block mb-1">DOMOS DE OXÍGENO 24/7</strong>
                  Salas de descanso presurizadas con té de coca botánico y asistencia médica continua.
                </div>
                <div className="p-3 bg-[#0d0d14] border border-zinc-800">
                  <strong className="text-[#00f5d4] block mb-1">ENERGÍA 100% RENOVABLE</strong>
                  Granjas de paneles solares fotovoltaicos y cero huella plástica en toda la cordillera.
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-[#0d0d14] border border-[#232332] text-center space-y-3">
              <span className="font-display font-black text-6xl text-[#d9ff00]">360°</span>
              <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                CAMPO ACÚSTICO VOLUMÉTRICO
              </span>
              <p className="font-mono text-[11px] text-zinc-400">
                Calibración sónica personalizada para la baja presión barométrica de alta montaña.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

