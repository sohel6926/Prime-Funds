// src/utils/feeUtils.ts — Shared fee calculation engine
import { FeeSettings } from '../types';

export interface FeeCalculationResult {
  proFee: number;
  procFee: number;
  total: number;
  isProcFree: boolean;
  procDisplay: string;
  formattedProFee: string;
  formattedTotal: string;
}

/**
 * Robustly calculates fees and totals from FeeSettings.
 * Handles cases where processing fee is 0, fixed amount, percentage,
 * or custom text (including when user inputs numbers like "199" in text fields).
 */
export function calculateFeeTotals(fees?: Partial<FeeSettings> | null): FeeCalculationResult {
  const currency = fees?.currencySymbol || '₹';
  const proFee = Math.max(0, Number(fees?.professionalFee || 0));

  const rawCustomText = (fees?.processingFeeCustomText || '').trim();
  // Check if custom text is a numeric value (e.g. "199" or "₹199" or "250.00")
  const cleanedCustomNumber = parseFloat(rawCustomText.replace(/[^0-9.]/g, ''));
  const isPureNumberInCustomText = !isNaN(cleanedCustomNumber) && cleanedCustomNumber > 0 && /^\s*₹?\s*\d+(\.\d+)?\s*$/.test(rawCustomText);

  let procFee = 0;
  let isProcFree = false;
  let procDisplay = 'FREE';

  if (fees?.processingFeeType === 'percentage') {
    procFee = Math.max(0, Number(fees?.processingFee || 0));
    isProcFree = procFee === 0;
    procDisplay = isProcFree ? (rawCustomText || 'FREE') : `${procFee}%`;
  } else if (fees?.processingFeeType === 'fixed') {
    procFee = Math.max(0, Number(fees?.processingFee ?? (isPureNumberInCustomText ? cleanedCustomNumber : 0)));
    isProcFree = procFee === 0;
    procDisplay = isProcFree ? (rawCustomText || 'FREE') : `${currency}${procFee}`;
  } else {
    // Mode is 'free' / default
    if (isPureNumberInCustomText) {
      // User entered a numeric fee into the custom input
      procFee = cleanedCustomNumber;
      isProcFree = false;
      procDisplay = `${currency}${procFee}`;
    } else if (Number(fees?.processingFee || 0) > 0) {
      procFee = Number(fees?.processingFee);
      isProcFree = false;
      procDisplay = `${currency}${procFee}`;
    } else {
      procFee = 0;
      isProcFree = true;
      procDisplay = rawCustomText || 'FREE';
    }
  }

  const total = proFee + (fees?.processingFeeType === 'percentage' ? 0 : procFee);

  return {
    proFee,
    procFee,
    total,
    isProcFree,
    procDisplay,
    formattedProFee: proFee > 0 ? `${currency}${proFee}` : 'FREE',
    formattedTotal: total > 0 ? `${currency}${total}` : 'FREE'
  };
}
