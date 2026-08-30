import { UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { supabase } from '../lib/supabase';

export interface CurrentUserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  language?: 'en' | 'vi';
  badge?: string;
}

export const CURRENT_USER_STORAGE_KEY = 'currentUser';
export const NOMAD_USER_STORAGE_KEY = 'nomad_current_user';
export const USERS_DB_STORAGE_KEY = 'nomadnest_users_db';

/**
 * Extract clean display name from an email address.
 * e.g., "john.doe@gmail.com" -> "John Doe", "david@yahoo.com" -> "David"
 */
export function extractNameFromEmail(email: string): string {
  if (!email || !email.includes('@')) return 'User';
  const username = email.split('@')[0];
  const clean = username.replace(/[._+-]/g, ' ').trim();
  if (!clean) return 'User';
  return clean
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get stored registered users array from localStorage
 */
export function getRegisteredUsersFromDb(): CurrentUserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_DB_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading users db:', err);
  }
  return [];
}

/**
 * Save user into registered users array in localStorage
 */
export function saveUserToDb(user: CurrentUserProfile) {
  try {
    const users = getRegisteredUsersFromDb();
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(USERS_DB_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving user to db:', err);
  }
}

/**
 * Find registered user by email
 */
export function findUserByEmail(email: string): CurrentUserProfile | undefined {
  const users = getRegisteredUsersFromDb();
  return users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
}

export const saveCurrentUserToStorage = (user: CurrentUserProfile) => {
  try {
    const userToSave: CurrentUserProfile = {
      ...user,
      language: user.language || (user.role === 'local_host' ? 'vi' : 'en')
    };
    const json = JSON.stringify(userToSave);
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, json);
    localStorage.setItem(NOMAD_USER_STORAGE_KEY, json);
    
    // Also store in registered user database
    saveUserToDb(userToSave);

    window.dispatchEvent(new Event('nomad_user_updated'));

    // Sync user profile asynchronously to Supabase
    supabase.from('profiles').upsert({
      id: userToSave.id,
      name: userToSave.name,
      email: userToSave.email,
      avatar: userToSave.avatar,
      role: userToSave.role,
      badge: userToSave.badge
    }).then(({ error }) => {
      if (error) console.log('Supabase profile sync note:', error.message);
    });
  } catch (err) {
    console.error('Error saving current user:', err);
  }
};

export const getCurrentUserFromStorage = (fallbackRole: UserRole = 'nomad_user'): CurrentUserProfile => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_STORAGE_KEY) || localStorage.getItem(NOMAD_USER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.name) {
        return {
          ...parsed,
          language: parsed.language || (parsed.role === 'local_host' ? 'vi' : 'en')
        };
      }
    }
  } catch (err) {
    console.error('Error reading current user from storage:', err);
  }

  // Fallback to MOCK_USERS according to fallbackRole
  const mockUser = MOCK_USERS[fallbackRole] || MOCK_USERS.nomad_user;
  const derivedLang: 'en' | 'vi' = mockUser.role === 'local_host' ? 'vi' : 'en';
  return {
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
    avatar: mockUser.avatar,
    role: mockUser.role,
    language: derivedLang,
    badge: mockUser.badge
  };
};

