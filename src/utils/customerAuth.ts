import { CustomerUser } from '../types';
import { safeStorage } from './safeStorage';
import { supabase } from '../lib/supabase';

const ACTIVE_CUSTOMER_KEY = 'ghm_active_customer';
const CUSTOMERS_DB_KEY = 'ghm_customers_db';

/**
 * Get the currently logged in customer from storage
 */
export const getCurrentCustomer = (): CustomerUser | null => {
  try {
    const raw = safeStorage.getItem(ACTIVE_CUSTOMER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CustomerUser;
  } catch (e) {
    console.error('Error reading active customer:', e);
    return null;
  }
};

/**
 * Set or clear the current active customer session
 */
export const setCurrentCustomer = (user: CustomerUser | null): void => {
  try {
    if (user) {
      safeStorage.setItem(ACTIVE_CUSTOMER_KEY, JSON.stringify(user));
    } else {
      safeStorage.removeItem(ACTIVE_CUSTOMER_KEY);
    }
  } catch (e) {
    console.error('Error saving active customer:', e);
  }
};

/**
 * Get all registered customers from local storage
 */
export const getLocalCustomers = (): CustomerUser[] => {
  try {
    const raw = safeStorage.getItem(CUSTOMERS_DB_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.error('Error reading customers db:', e);
    return [];
  }
};

/**
 * Save customers list locally
 */
const saveLocalCustomers = (list: CustomerUser[]): void => {
  try {
    safeStorage.setItem(CUSTOMERS_DB_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving customers db:', e);
  }
};

/**
 * Register a new customer
 */
export const registerCustomer = async (
  name: string,
  email: string,
  password: string,
  phone?: string,
  address?: string,
  city?: string,
  thana?: string
): Promise<{ success: boolean; error?: string; customer?: CustomerUser }> => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const cleanPhone = phone?.trim() || '';

  if (!cleanName) {
    return { success: false, error: 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।' };
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস দিন।' };
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' };
  }

  // 1. Check local registered customers
  const localList = getLocalCustomers();
  const existingLocal = localList.find((c) => c.email.toLowerCase() === cleanEmail);
  if (existingLocal) {
    return { success: false, error: 'এই ইমেইল দিয়ে ইতোমধ্যে একটি একাউন্ট খোলা আছে। অনুগ্রহ করে লগইন করুন।' };
  }

  // 2. Try checking Supabase customers table if reachable
  try {
    const { data: dbUser } = await supabase
      .from('customers')
      .select('email')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (dbUser) {
      return { success: false, error: 'এই ইমেইল দিয়ে ইতোমধ্যে একটি একাউন্ট খোলা আছে। অনুগ্রহ করে লগইন করুন।' };
    }
  } catch (err) {
    // Table may not exist yet in Supabase, continue with safe local fallback
    console.log('Supabase check note:', err);
  }

  const newId = `CUST-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
  const newCustomer: CustomerUser = {
    id: newId,
    name: cleanName,
    email: cleanEmail,
    password: password, // preserved for client auth validation
    phone: cleanPhone,
    address: address?.trim() || '',
    city: city?.trim() || '',
    thana: thana?.trim() || '',
    createdAt: new Date().toISOString()
  };

  // 3. Save locally
  const updatedList = [newCustomer, ...localList];
  saveLocalCustomers(updatedList);
  setCurrentCustomer(newCustomer);

  // 4. Try syncing with Supabase
  try {
    await supabase.from('customers').upsert({
      id: newCustomer.id,
      name: newCustomer.name,
      email: newCustomer.email,
      password_hash: newCustomer.password,
      phone: newCustomer.phone,
      address: newCustomer.address,
      city: newCustomer.city,
      thana: newCustomer.thana,
      created_at: newCustomer.createdAt
    });
  } catch (err) {
    console.log('Supabase sync note (run SQL script in Supabase to enable cloud persistence):', err);
  }

  return { success: true, customer: newCustomer };
};

/**
 * Login customer with Email and Password
 */
export const loginCustomer = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; customer?: CustomerUser }> => {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    return { success: false, error: 'ইমেইল এড্রেস প্রদান করুন।' };
  }
  if (!password) {
    return { success: false, error: 'পাসওয়ার্ড প্রদান করুন।' };
  }

  // 1. Try Supabase first
  try {
    const { data: dbCustomer } = await supabase
      .from('customers')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (dbCustomer) {
      if (dbCustomer.password_hash === password) {
        const loggedUser: CustomerUser = {
          id: dbCustomer.id,
          name: dbCustomer.name,
          email: dbCustomer.email,
          phone: dbCustomer.phone || '',
          address: dbCustomer.address || '',
          city: dbCustomer.city || '',
          thana: dbCustomer.thana || '',
          createdAt: dbCustomer.created_at || new Date().toISOString()
        };
        setCurrentCustomer(loggedUser);
        return { success: true, customer: loggedUser };
      } else {
        return { success: false, error: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড লিখুন।' };
      }
    }
  } catch (err) {
    console.log('Supabase login check note:', err);
  }

  // 2. Check local database
  const localList = getLocalCustomers();
  const matched = localList.find((c) => c.email.toLowerCase() === cleanEmail);

  if (!matched) {
    return { success: false, error: 'এই ইমেইলের কোনো একাউন্ট পাওয়া যায়নি। অনুগ্রহ করে একাউন্ট তৈরি করুন।' };
  }

  if (matched.password !== password) {
    return { success: false, error: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড লিখুন।' };
  }

  setCurrentCustomer(matched);
  return { success: true, customer: matched };
};

/**
 * Update customer profile details
 */
export const updateCustomerProfile = async (
  updates: Partial<CustomerUser>
): Promise<{ success: boolean; customer?: CustomerUser }> => {
  const current = getCurrentCustomer();
  if (!current) return { success: false };

  const updated: CustomerUser = {
    ...current,
    ...updates,
    email: current.email // Email cannot be changed directly
  };

  setCurrentCustomer(updated);

  // Update in local customers DB
  const localList = getLocalCustomers();
  const nextList = localList.map((c) => (c.email.toLowerCase() === updated.email.toLowerCase() ? updated : c));
  saveLocalCustomers(nextList);

  // Try update in Supabase
  try {
    await supabase.from('customers').upsert({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      address: updated.address,
      city: updated.city,
      thana: updated.thana
    });
  } catch (err) {
    console.log('Supabase update note:', err);
  }

  return { success: true, customer: updated };
};

/**
 * Logout customer
 */
export const logoutCustomer = (): void => {
  setCurrentCustomer(null);
};
