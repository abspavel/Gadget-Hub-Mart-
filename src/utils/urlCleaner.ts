/**
 * URL Tracking Parameter Cleaner
 * Strips aggressive Facebook, Google, and marketing tracking parameters 
 * (fbclid, aem, fb_param, utm_*, etc.) from the URL, while preserving essential application
 * query params (if any) and route path.
 * 
 * Silently saves attribution to sessionStorage so Meta Pixel / Analytics can continue
 * reporting accurate ad conversions without bloating the customer's browser URL bar.
 */

// List of tracking query parameters to strip
export const TRACKING_PARAMS = [
  'fbclid',
  'aem',
  'fb_param',
  'fb_action_ids',
  'fb_action_types',
  'fb_source',
  '_fbc',
  '_fbp',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'gclid',
  'gclsrc',
  'dclid',
  'wbraid',
  'gbraid',
  'ttclid',
  'twclid',
  'igshid',
  'msclkid',
  'mc_cid',
  'mc_eid'
];

export interface CleanUrlResult {
  hasTracking: boolean;
  cleanUrl: string;
  cleanPathAndSearch: string;
  extractedParams: Record<string, string>;
}

/**
 * Checks the current URL or provided URL for tracking parameters,
 * stores attribution, and cleanly redirects/rewrites via window.history.replaceState.
 */
export function cleanTrackingParameters(inputUrl?: string): CleanUrlResult {
  if (typeof window === 'undefined') {
    return {
      hasTracking: false,
      cleanUrl: inputUrl || '',
      cleanPathAndSearch: inputUrl || '',
      extractedParams: {}
    };
  }

  const currentUrl = inputUrl || window.location.href;
  
  try {
    const parsed = new URL(currentUrl, window.location.origin);
    const searchParams = parsed.searchParams;
    const extractedParams: Record<string, string> = {};
    let hasTracking = false;

    // Detect and extract all tracking parameters
    for (const param of TRACKING_PARAMS) {
      if (searchParams.has(param)) {
        hasTracking = true;
        const value = searchParams.get(param);
        if (value) {
          extractedParams[param] = value;
        }
        searchParams.delete(param);
      }
    }

    // Also detect any key starting with 'utm_' or 'fb_'
    const allKeys = Array.from(searchParams.keys());
    for (const key of allKeys) {
      if (key.startsWith('utm_') || key.startsWith('fb_')) {
        hasTracking = true;
        const val = searchParams.get(key);
        if (val) extractedParams[key] = val;
        searchParams.delete(key);
      }
    }

    // If tracking params found, preserve attribution in sessionStorage for Pixel/Analytics
    if (hasTracking && Object.keys(extractedParams).length > 0) {
      try {
        const existingRaw = sessionStorage.getItem('ghm_ad_attribution');
        const existing = existingRaw ? JSON.parse(existingRaw) : {};
        const merged = { ...existing, ...extractedParams, timestamp: Date.now() };
        sessionStorage.setItem('ghm_ad_attribution', JSON.stringify(merged));
      } catch (e) {
        // Ignore storage quotas / private browsing errors
      }
    }

    // Build the clean URL
    const queryString = searchParams.toString();
    const cleanPathAndSearch = parsed.pathname + (queryString ? `?${queryString}` : '') + parsed.hash;
    const cleanUrl = parsed.origin + cleanPathAndSearch;

    // Perform immediate clean rewrite if tracking params were present
    if (hasTracking && typeof window !== 'undefined' && window.history && window.history.replaceState) {
      window.history.replaceState(window.history.state, document.title, cleanPathAndSearch);
    }

    return {
      hasTracking,
      cleanUrl,
      cleanPathAndSearch,
      extractedParams
    };
  } catch (err) {
    console.error('Error cleaning URL tracking parameters:', err);
    return {
      hasTracking: false,
      cleanUrl: currentUrl,
      cleanPathAndSearch: currentUrl,
      extractedParams: {}
    };
  }
}

/**
 * Returns any previously captured ad attribution parameters (e.g. fbclid).
 */
export function getSavedAdAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem('ghm_ad_attribution');
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}
