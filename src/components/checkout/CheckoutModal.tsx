import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Download,
  QrCode,
  Tag,
  Loader2,
} from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';
import { FESTIVAL_TICKETS } from '../../data/festivalData';
import { PurchasedTicketConfirmation } from '../../types';
import { useSoundEffect } from '../../hooks/useSoundEffect';

// Zod validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, 'El nombre completo es requerido (mínimo 3 caracteres)'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  documentId: z.string().min(6, 'Número de DNI o Pasaporte requerido'),
  cardholderName: z.string().min(3, 'Nombre tal como figura en la tarjeta'),
  cardNumber: z
    .string()
    .min(16, 'Número de tarjeta inválido (16 dígitos)')
    .regex(/^[\d\s]+$/, 'Solo números permitidos'),
  cardExp: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato MM/AA inválido'),
  cardCvc: z.string().regex(/^[0-9]{3,4}$/, 'CVC debe tener 3 o 4 dígitos'),
  acceptTerms: z.boolean().refine((val) => val === true, 'Debes aceptar los términos y condiciones'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    activeTicket,
    ticketQuantity,
    appliedPromo,
    discountPercentage,
    applyPromoCode,
    removePromoCode,
    confirmedOrder,
    setConfirmedOrder,
  } = useFestival();

  const { playClick, playSubDrop } = useSoundEffect();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const currentTicket = activeTicket || FESTIVAL_TICKETS[0];

  // Pricing calculations
  const subtotal = currentTicket.price * ticketQuantity;
  const discountAmount = appliedPromo ? (subtotal * discountPercentage) / 100 : 0;
  const serviceFee = 4.5 * ticketQuantity;
  const total = Math.max(0, subtotal - discountAmount + serviceFee);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      documentId: '',
      cardholderName: '',
      cardNumber: '',
      cardExp: '',
      cardCvc: '',
      acceptTerms: true,
    },
  });

  // Watch form fields for live credit card render
  const watchedCardNumber = watch('cardNumber') || '';
  const watchedCardholder = watch('cardholderName') || '';
  const watchedCardExp = watch('cardExp') || '';

  // Detect card network
  const getCardBrand = (number: string) => {
    const clean = number.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'VISA';
    if (/^5[1-5]/.test(clean)) return 'MASTERCARD';
    if (/^3[47]/.test(clean)) return 'AMEX';
    return 'TARJETA DE CRÉDITO/DÉBITO';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setValue('cardNumber', formatted, { shouldValidate: true });
  };

  const handleCardExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setValue('cardExp', raw, { shouldValidate: true });
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!promoInput.trim()) return;

    const ok = applyPromoCode(promoInput);
    if (ok) {
      setPromoError('');
    } else {
      setPromoError('Código inválido. Prueba con SOL2026.');
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    playSubDrop();
    setIsProcessing(true);

    // Simulated high-tech banking verification pipeline
    setProcessingStep('1/3 - Encriptando token bancario en red PCI DSS...');
    await new Promise((r) => setTimeout(r, 900));

    setProcessingStep('2/3 - Bloqueando cupo oficial en Los Andes...');
    await new Promise((r) => setTimeout(r, 1000));

    setProcessingStep('3/3 - Generando QR dinámico antifraude y pase digital...');
    await new Promise((r) => setTimeout(r, 900));

    const confirmation: PurchasedTicketConfirmation = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      passId: `INTI-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      qrPayload: `INTI-PASS-SECURE-HASH-${Math.random()}`,
      ticketName: currentTicket.title,
      tier: currentTicket.tier,
      quantity: ticketQuantity,
      totalPaid: total,
      discountApplied: discountAmount,
      buyerName: data.fullName,
      buyerEmail: data.email,
      buyerDoc: data.documentId,
      cardLastFour: data.cardNumber.replace(/\s+/g, '').slice(-4) || '8842',
      timestamp: new Date().toLocaleString('es-AR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    setIsProcessing(false);
    setConfirmedOrder(confirmation);

    // Fire fireworks celebration!
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d9ff00', '#00f5d4', '#ffffff', '#ff4a11'],
      });
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    playClick();
    closeCheckout();
    if (confirmedOrder) {
      setConfirmedOrder(null);
      reset();
    }
  };

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCheckoutOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop with items-start on mobile to prevent top cutoff bug */}
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-start p-2 sm:p-4 md:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#0a0a10] border border-[#232332] text-white shadow-2xl my-2 sm:my-8 flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        >
          {/* Top Modal Header - FIXED & STICKY AT TOP */}
          <div className="sticky top-0 z-30 shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-[#232332] bg-[#0d0d14]/98 backdrop-blur-md">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 bg-[#d9ff00] text-black font-display font-black flex items-center justify-center text-sm shrink-0">
                IR
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-black text-sm sm:text-xl uppercase tracking-tight text-white truncate">
                  {confirmedOrder ? 'PASE CONFIRMADO // ACCESO AUTORIZADO' : 'CHECKOUT SEGURO // INTI-RAYMI 2026'}
                </h3>
                <p className="font-mono text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1 truncate">
                  <Lock className="w-3 h-3 text-[#d9ff00] shrink-0" />
                  <span>CONEXIÓN CIFRADA SSL 256-BIT • EMISIÓN DIRECTA</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 sm:p-2.5 text-zinc-400 hover:text-white border border-[#232332] bg-[#141420] transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 text-zinc-300 hover:text-[#d9ff00]" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto flex-1 overscroll-contain">
            {/* Conditional: Success Confirmation OR Payment Form */}
          {confirmedOrder ? (
            /* SUCCESS TICKET PASS VIEW */
            <div className="p-6 sm:p-10 space-y-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#d9ff00]/10 border border-[#d9ff00] flex items-center justify-center text-[#d9ff00]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white">
                  ¡OPERACIÓN EXITOSA!
                </h2>
                <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
                  Tus entradas han sido emitidas y sincronizadas con el sistema de acreditación de alta montaña. Se envió una copia a <strong>{confirmedOrder.buyerEmail}</strong>.
                </p>
              </div>

              {/* Digital Pass Card Mockup */}
              <div className="max-w-md mx-auto bg-[#0d0d14] border-2 border-[#d9ff00] p-6 relative overflow-hidden shadow-[0_0_40px_rgba(217,255,0,0.2)]">
                <div className="flex items-center justify-between pb-4 border-b border-[#232332]">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#d9ff00] tracking-widest block font-bold">
                      FESTIVAL PASS // 3,820 M.S.N.M.
                    </span>
                    <h4 className="font-display font-black text-xl text-white">
                      INTI-RAYMI 2026
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 bg-[#d9ff00] text-black font-mono text-[11px] font-bold">
                    {confirmedOrder.passId}
                  </span>
                </div>

                <div className="py-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>TITULAR:</span>
                    <span className="text-white font-bold">{confirmedOrder.buyerName.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>DOCUMENTO:</span>
                    <span className="text-white font-bold">{confirmedOrder.buyerDoc}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>TICKET:</span>
                    <span className="text-[#d9ff00] font-bold">{confirmedOrder.ticketName}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>CANTIDAD:</span>
                    <span className="text-white font-bold">{confirmedOrder.quantity} PASES</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>TOTAL ABONADO:</span>
                    <span className="text-white font-bold">${confirmedOrder.totalPaid} USD</span>
                  </div>
                </div>

                {/* Simulated QR Code */}
                <div className="pt-4 border-t border-[#232332] flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">CÓDIGO DE INGRESO:</span>
                    <span className="text-[9px] font-mono text-zinc-400">Válido en molinetes RFID</span>
                  </div>
                  <div className="p-2 bg-white text-black">
                    <QrCode className="w-14 h-14" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  onClick={() => alert(`Descargando comprobante oficial para ${confirmedOrder.buyerName}...`)}
                  className="w-full py-3.5 bg-[#d9ff00] text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>DESCARGAR TICKET (PDF)</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-3.5 bg-[#171724] border border-[#232332] text-white font-mono text-xs uppercase tracking-wider hover:border-zinc-500 transition-all cursor-pointer"
                >
                  FINALIZAR Y CERRAR
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Details & Card inputs */}
              <div className="lg:col-span-7 space-y-6">
                {/* 3D Interactive Card Preview */}
                <div className="relative aspect-16/9 bg-gradient-to-tr from-[#12121e] via-[#1a1a2e] to-[#0d0d14] border border-[#d9ff00]/40 p-5 rounded-lg flex flex-col justify-between shadow-[0_0_30px_rgba(217,255,0,0.15)] text-white font-mono">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-8 rounded bg-gradient-to-r from-amber-400 to-amber-200 opacity-90 border border-amber-500 shadow-inner" />
                    <span className="font-display font-black text-sm tracking-widest text-[#d9ff00]">
                      {getCardBrand(watchedCardNumber)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400">NÚMERO DE TARJETA</span>
                    <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-zinc-100">
                      {watchedCardNumber || '•••• •••• •••• ••••'}
                    </div>
                  </div>

                  <div className="flex items-end justify-between text-xs">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-zinc-400 block">TITULAR</span>
                      <span className="font-bold tracking-wider uppercase text-zinc-200">
                        {watchedCardholder || 'NOMBRE Y APELLIDO'}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-widest text-zinc-400 block">VENCE</span>
                      <span className="font-bold tracking-wider text-zinc-200">
                        {watchedCardExp || 'MM/AA'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        {...register('fullName')}
                        placeholder="Ej. Martín Soler"
                        className="w-full bg-[#12121a] border border-[#232332] px-3 py-2 text-sm text-white focus:border-[#d9ff00] focus:outline-none font-mono"
                      />
                      {errors.fullName && (
                        <p className="text-[10px] text-red-400 font-mono mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        DNI / Pasaporte
                      </label>
                      <input
                        {...register('documentId')}
                        placeholder="Número de documento"
                        className="w-full bg-[#12121a] border border-[#232332] px-3 py-2 text-sm text-white focus:border-[#d9ff00] focus:outline-none font-mono"
                      />
                      {errors.documentId && (
                        <p className="text-[10px] text-red-400 font-mono mt-1">{errors.documentId.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      Email de Recepción de Entradas
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="nombre@correo.com"
                      className="w-full bg-[#12121a] border border-[#232332] px-3 py-2 text-sm text-white focus:border-[#d9ff00] focus:outline-none font-mono"
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-400 font-mono mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      {...register('cardholderName')}
                      placeholder="MARTIN SOLER"
                      className="w-full bg-[#12121a] border border-[#232332] px-3 py-2 text-sm text-white focus:border-[#d9ff00] focus:outline-none font-mono uppercase"
                    />
                    {errors.cardholderName && (
                      <p className="text-[10px] text-red-400 font-mono mt-1">{errors.cardholderName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      Número de Tarjeta (16 dígitos)
                    </label>
                    <div className="relative">
                      <input
                        value={watchedCardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4532 •••• •••• ••••"
                        maxLength={19}
                        className="w-full bg-[#12121a] border border-[#232332] px-3 py-2 text-sm text-white focus:border-[#d9ff00] focus:outline-none font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-zinc-500 absolute right-3 top-3" />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-[10px] text-red-400 font-mono mt-1">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        Vencimiento (MM/AA)
                      </label>
                      <input
                        value={watchedCardExp}
                        onChange={handleCardExpChange}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full bg-[#12121a] border border-[#232332] px-3 py-2 text-sm text-white focus:border-[#d9ff00] focus:outline-none font-mono"
                      />
                      {errors.cardExp && (
                        <p className="text-[10px] text-red-400 font-mono mt-1">{errors.cardExp.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        {...register('cardCvc')}
                        placeholder="123"
                        maxLength={4}
                        className="w-full bg-[#12121a] border border-[#232332] px-3 py-2 text-sm text-white focus:border-[#d9ff00] focus:outline-none font-mono"
                      />
                      {errors.cardCvc && (
                        <p className="text-[10px] text-red-400 font-mono mt-1">{errors.cardCvc.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Terms acceptance */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2 cursor-pointer text-xs font-mono text-zinc-400">
                      <input
                        type="checkbox"
                        {...register('acceptTerms')}
                        className="mt-0.5 accent-[#d9ff00]"
                      />
                      <span>
                        Acepto los términos de acreditación, el protocolo ecológico "Leave No Trace" y las normas de alta montaña.
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-[10px] text-red-400 font-mono mt-1">{errors.acceptTerms.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#d9ff00] text-black font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:shadow-[0_0_25px_rgba(217,255,0,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                    }}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>PROCESANDO PAGO...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>CONFIRMAR PAGO — ${total.toFixed(2)} USD</span>
                      </>
                    )}
                  </button>

                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-black/60 border border-[#d9ff00]/40 text-center text-xs font-mono text-[#d9ff00]"
                    >
                      {processingStep}
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Right Column: Order Summary & Coupon */}
              <div className="lg:col-span-5 bg-[#0f0f18] border border-[#232332] p-6 flex flex-col justify-between self-start space-y-6">
                <div>
                  <h4 className="font-display font-black text-lg uppercase tracking-tight text-white pb-3 border-b border-[#232332]">
                    RESUMEN DE COMPRA
                  </h4>

                  {/* Selected Ticket Overview */}
                  <div className="py-4 space-y-2 border-b border-[#232332]">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-[#d9ff00] uppercase font-bold tracking-wider">
                          {currentTicket.tier}
                        </span>
                        <h5 className="font-display font-bold text-sm text-white">
                          {currentTicket.title}
                        </h5>
                        <p className="font-mono text-[11px] text-zinc-400">
                          {currentTicket.subtitle}
                        </p>
                      </div>
                      <span className="font-mono text-sm font-bold text-white shrink-0">
                        ${currentTicket.price} USD
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2">
                      <span>CANTIDAD:</span>
                      <span className="font-bold text-white">{ticketQuantity} UNIDADES</span>
                    </div>
                  </div>

                  {/* Promo Code Applicator */}
                  <div className="py-4 border-b border-[#232332] space-y-2">
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      ¿Tienes un código de descuento?
                    </span>

                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-2.5 bg-[#d9ff00]/10 border border-[#d9ff00]/40 text-xs font-mono">
                        <div className="flex items-center gap-1.5 text-[#d9ff00] font-bold">
                          <Tag className="w-3.5 h-3.5" />
                          <span>{appliedPromo} (-{discountPercentage}%)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            playClick();
                            removePromoCode();
                          }}
                          className="text-zinc-400 hover:text-white underline text-[10px]"
                        >
                          Eliminar
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Ej. SOL2026"
                          className="w-full bg-[#141420] border border-[#232332] px-3 py-1.5 text-xs text-white uppercase focus:border-[#d9ff00] focus:outline-none font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-3 py-1.5 bg-[#1f1f2e] border border-[#232332] hover:border-white text-xs font-mono font-bold text-white shrink-0 cursor-pointer"
                        >
                          APLICAR
                        </button>
                      </div>
                    )}

                    {promoError && (
                      <p className="text-[10px] text-red-400 font-mono">{promoError}</p>
                    )}
                  </div>

                  {/* Breakdown Math */}
                  <div className="py-4 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>SUBTOTAL ({ticketQuantity} PASES):</span>
                      <span className="text-white">${subtotal.toFixed(2)} USD</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-[#d9ff00]">
                        <span>DESCUENTO ({discountPercentage}%):</span>
                        <span>-${discountAmount.toFixed(2)} USD</span>
                      </div>
                    )}

                    <div className="flex justify-between text-zinc-400">
                      <span>COSTO DE SERVICIO Y PLATAFORMA:</span>
                      <span className="text-white">${serviceFee.toFixed(2)} USD</span>
                    </div>
                  </div>
                </div>

                {/* Final Total */}
                <div className="pt-4 border-t-2 border-[#d9ff00] space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">TOTAL FINAL</span>
                    <span className="font-display font-black text-3xl text-white">
                      ${total.toFixed(2)} <span className="text-xs font-mono text-zinc-400">USD</span>
                    </span>
                  </div>

                  <p className="text-[10px] font-mono text-zinc-500 text-right">
                    Incluye IVA e impuestos andinos aplicables.
                  </p>
                </div>
              </div>
            </div>
          )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
