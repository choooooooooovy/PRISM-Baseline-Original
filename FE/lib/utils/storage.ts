import type { WorksheetSession } from '../types';

const STORAGE_KEY = 'casve-worksheet-session';

/**
 * Save session to localStorage
 */
export function saveToLocalStorage(session: WorksheetSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Load session from localStorage
 */
export function loadFromLocalStorage(): WorksheetSession | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}

/**
 * Clear session from localStorage
 */
export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}
