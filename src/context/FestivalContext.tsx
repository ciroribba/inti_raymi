import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NightId, StageId, DJ, TicketItem, PurchasedTicketConfirmation } from '../types';
import { FESTIVAL_TICKETS } from '../data/festivalData';

interface FestivalContextType {
  selectedNight: NightId | 'all';
  setSelectedNight: (night: NightId | 'all') => void;
  selectedStage: StageId | 'all';
  setSelectedStage: (stage: StageId | 'all') => void;
  selectedDJ: DJ | null;
  setSelectedDJ: (dj: DJ | null) => void;
  activeTicket: TicketItem | null;
  ticketQuantity: number;
  setTicketQuantity: (q: number) => void;
  isCheckoutOpen: boolean;
  openCheckout: (ticket?: TicketItem, quantity?: number) => void;
  closeCheckout: () => void;
  appliedPromo: string;
  discountPercentage: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  confirmedOrder: PurchasedTicketConfirmation | null;
  setConfirmedOrder: (order: PurchasedTicketConfirmation | null) => void;
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

export const FestivalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedNight, setSelectedNight] = useState<NightId | 'all'>('all');
  const [selectedStage, setSelectedStage] = useState<StageId | 'all'>('all');
  const [selectedDJ, setSelectedDJ] = useState<DJ | null>(null);

  const [activeTicket, setActiveTicket] = useState<TicketItem | null>(FESTIVAL_TICKETS[0]);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [confirmedOrder, setConfirmedOrder] = useState<PurchasedTicketConfirmation | null>(null);

  const openCheckout = (ticket?: TicketItem, quantity: number = 1) => {
    if (ticket) {
      setActiveTicket(ticket);
    }
    setTicketQuantity(quantity);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const applyPromoCode = (code: string): boolean => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'SOL2026' || cleaned === 'INTI25') {
      setAppliedPromo(cleaned);
      setDiscountPercentage(25);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    setDiscountPercentage(0);
  };

  return (
    <FestivalContext.Provider
      value={{
        selectedNight,
        setSelectedNight,
        selectedStage,
        setSelectedStage,
        selectedDJ,
        setSelectedDJ,
        activeTicket,
        ticketQuantity,
        setTicketQuantity,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        appliedPromo,
        discountPercentage,
        applyPromoCode,
        removePromoCode,
        confirmedOrder,
        setConfirmedOrder,
      }}
    >
      {children}
    </FestivalContext.Provider>
  );
};

export function useFestival() {
  const ctx = useContext(FestivalContext);
  if (!ctx) {
    throw new Error('useFestival must be used within a FestivalProvider');
  }
  return ctx;
}

