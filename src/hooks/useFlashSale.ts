import { useState, useEffect, useCallback } from 'react';
import { INITIAL_FLASH_SALE } from '../data/festivalData';

export function useFlashSale() {
  const [targetTime] = useState<number>(() => {
    const saved = localStorage.getItem('inti_flash_sale_end');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (parsed > Date.now()) return parsed;
    }
    const newEnd = Date.now() + 45 * 60 * 1000 + 32 * 1000;
    localStorage.setItem('inti_flash_sale_end', newEnd.toString());
    return newEnd;
  });

  const [remainingTime, setRemainingTime] = useState<number>(() => Math.max(0, targetTime - Date.now()));
  const [spots, setSpots] = useState<number>(INITIAL_FLASH_SALE.spotsRemaining);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(0, targetTime - Date.now());
      setRemainingTime(diff);

      // Randomly decrement a spot every 45-90 seconds to create high conversion urgency
      if (Math.random() < 0.05 && spots > 3) {
        setSpots((prev) => Math.max(3, prev - 1));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [targetTime, spots]);

  const copyCode = useCallback(() => {
    navigator.clipboard?.writeText(INITIAL_FLASH_SALE.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);
  const milliseconds = Math.floor((remainingTime % 1000) / 10);

  return {
    isActive: remainingTime > 0,
    code: INITIAL_FLASH_SALE.code,
    discountPercentage: INITIAL_FLASH_SALE.discountPercentage,
    spots,
    copied,
    copyCode,
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    milliseconds: String(milliseconds).padStart(2, '0'),
  };
}

