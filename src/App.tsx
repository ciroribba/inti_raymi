import React from 'react';
import { FestivalProvider } from './context/FestivalContext';
import { NoiseOverlay } from './components/layout/NoiseOverlay';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { FlashSaleBanner } from './components/home/FlashSaleBanner';
import { LineupGrid } from './components/home/LineupGrid';
import { FestivalExperience } from './components/home/FestivalExperience';
import { TicketSelector } from './components/tickets/TicketSelector';
import { FaqSection } from './components/home/FaqSection';
import { Footer } from './components/layout/Footer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { DJModal } from './components/dj/DJModal';

export const App: React.FC = () => {
  return (
    <FestivalProvider>
      <div className="relative min-h-screen bg-[#050507] text-[#f4f4f5] selection:bg-[#d9ff00] selection:text-black font-sans">
        {/* Grain Noise & Custom Motion Cursor */}
        <NoiseOverlay />
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Landing Flow */}
        <main>
          <HeroSection />
          <FlashSaleBanner />
          <LineupGrid />
          <FestivalExperience />
          <TicketSelector />
          <FaqSection />
        </main>

        {/* Global Andes Footer */}
        <Footer />

        {/* Modals & Portals */}
        <CheckoutModal />
        <DJModal />
      </div>
    </FestivalProvider>
  );
};

export default App;

