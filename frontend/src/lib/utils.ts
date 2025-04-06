import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToCustomString(isoDate: Date) {
  const date = new Date(isoDate);
  return `${date.getDate()}/${date.toLocaleString('en-GB', { month: 'long' })}/${date.getFullYear()}`;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatPhoneNumber = (number: string): string => {
  // Remove any non-digit characters if needed
  const cleaned = number.replace(/\D/g, "");

  // Format the string as (xxx) xxx-xxxx
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return number; // Return the original if it doesn't match the expected pattern
};


