import { safeStorage } from './safeStorage';
import { Order } from '../types';

const DELETED_ORDERS_KEY = 'ghm_deleted_order_ids';
const SYNC_CHANNEL_NAME = 'ghm_order_sync_channel';

// Get Set of all deleted order IDs
export const getDeletedOrderIds = (): Set<string> => {
  try {
    const raw = safeStorage.getItem(DELETED_ORDERS_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return new Set(arr);
      }
    }
  } catch (e) {
    console.error('Error reading deleted order IDs:', e);
  }
  return new Set<string>();
};

// Permanently record an order as deleted so it never resurrects
export const markOrderAsDeleted = (orderId: string) => {
  if (!orderId) return;
  try {
    const set = getDeletedOrderIds();
    set.add(orderId);
    safeStorage.setItem(DELETED_ORDERS_KEY, JSON.stringify(Array.from(set)));
    
    // Broadcast deletion event to all other open tabs/windows
    broadcastDeletedOrder(orderId);
  } catch (e) {
    console.error('Error recording deleted order:', e);
  }
};

// Broadcast new order to any open Admin Panel tabs
export const broadcastNewOrder = (order: Order) => {
  if (typeof window === 'undefined') return;
  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
      bc.postMessage({ type: 'NEW_ORDER', order });
      setTimeout(() => bc.close(), 100);
    }
  } catch (e) {}
};

// Broadcast order deletion to all open tabs
export const broadcastDeletedOrder = (orderId: string) => {
  if (typeof window === 'undefined') return;
  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
      bc.postMessage({ type: 'ORDER_DELETED', orderId });
      setTimeout(() => bc.close(), 100);
    }
  } catch (e) {}
};

// Subscribe to real-time order sync events across tabs
export const subscribeToOrderSync = (
  onNewOrder: (order: Order) => void,
  onDeletedOrder: (orderId: string) => void
): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  let bc: BroadcastChannel | null = null;
  if ('BroadcastChannel' in window) {
    try {
      bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
      bc.onmessage = (event) => {
        const data = event.data;
        if (!data) return;
        if (data.type === 'NEW_ORDER' && data.order) {
          onNewOrder(data.order);
        } else if (data.type === 'ORDER_DELETED' && data.orderId) {
          onDeletedOrder(data.orderId);
        }
      };
    } catch (e) {}
  }

  // Cross-tab storage fallback for older browsers
  const handleStorage = (event: StorageEvent) => {
    if (event.key === 'ghm_orders' && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const newest = parsed[0];
          const deleted = getDeletedOrderIds();
          if (newest && newest.id && !deleted.has(newest.id)) {
            onNewOrder(newest);
          }
        }
      } catch (e) {}
    }
  };

  window.addEventListener('storage', handleStorage);

  return () => {
    if (bc) {
      bc.close();
    }
    window.removeEventListener('storage', handleStorage);
  };
};

// Pleasant browser Web Audio chime for instant order notifications
export const playOrderNotificationSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // First tone (pleasant high chime)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc1.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
    gain1.gain.setValueAtTime(0.12, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.4);

    // Second harmonious tone
    setTimeout(() => {
      try {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1174.66, ctx.currentTime); // D6
        gain2.gain.setValueAtTime(0.08, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.3);
      } catch (e) {}
    }, 120);
  } catch (e) {
    // Autoplay restrictions handle gracefully
  }
};
