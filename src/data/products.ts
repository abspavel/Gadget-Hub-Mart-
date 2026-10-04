import { Product, CategoryItem } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './initialData';

export const ALL_PRODUCTS: Product[] = INITIAL_PRODUCTS;

export const CATEGORIES: CategoryItem[] = INITIAL_CATEGORIES;

export const CURRENCIES = {
  USD: { code: 'USD' as const, symbol: '$', rate: 1 },
  EUR: { code: 'EUR' as const, symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP' as const, symbol: '£', rate: 0.79 },
  BDT: { code: 'BDT' as const, symbol: '৳', rate: 120 }
};
