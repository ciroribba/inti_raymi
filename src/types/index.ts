export type StageId = 'inti' | 'pacha' | 'kolla';

export interface Stage {
  id: StageId;
  name: string;
  codename: string;
  subtitle: string;
  genre: string;
  description: string;
  soundSystem: string;
  visualRig: string;
  accentColor: string;
  tagColor: string;
  altitude: string;
}

export type NightId = 'noche-1' | 'noche-2' | 'noche-3';

export interface FestivalNight {
  id: NightId;
  number: number;
  dateStr: string;
  title: string;
  subtitle: string;
  hours: string;
  ritual: string;
}

export interface DJ {
  id: string;
  name: string;
  stageId: StageId;
  nightId: NightId;
  timeSlot: string;
  origin: string;
  countryCode: string;
  genre: string;
  imageUrl: string;
  bio: string;
  bpm: number;
  featuredTrack: string;
  tags: string[];
  isHeadliner: boolean;
  socials: {
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
  };
}

export type TicketCategory = 'single-stage' | 'day-pass' | 'full-pass' | 'vip-solar';

export interface TicketItem {
  id: string;
  category: TicketCategory;
  title: string;
  subtitle: string;
  nightId?: NightId;
  stageId?: StageId;
  price: number;
  originalPrice?: number;
  totalStock: number;
  remainingStock: number;
  tier: string;
  badge?: string;
  perks: string[];
  isPopular?: boolean;
}

export interface CartItem {
  ticket: TicketItem;
  quantity: number;
}

export interface FlashSaleState {
  isActive: boolean;
  code: string;
  discountPercentage: number;
  endsAt: number; // timestamp
  spotsRemaining: number;
}

export interface PurchasedTicketConfirmation {
  orderId: string;
  passId: string;
  qrPayload: string;
  ticketName: string;
  tier: string;
  quantity: number;
  totalPaid: number;
  discountApplied: number;
  buyerName: string;
  buyerEmail: string;
  buyerDoc: string;
  cardLastFour: string;
  timestamp: string;
}

