import { UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { supabase } from '../lib/supabase';

export interface CurrentUserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  badge?: string;
}

export const CURRENT_USER_STORAGE_KEY = 'currentUser';
export const NOMAD_USER_STORAGE_KEY = 'nomad_current_user';

export const saveCurrentUserToStorage = (user: CurrentUserProfile) => {
  try {
    const json = JSON.stringify(user);
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, json);
    localStorage.setItem(NOMAD_USER_STORAGE_KEY, json);
    window.dispatchEvent(new Event('nomad_user_updated'));

    // Sync user profile asynchronously to Supabase
    supabase.from('profiles').upsert({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      badge: user.badge
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
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading current user from storage:', err);
  }

  // Fallback to MOCK_USERS according to fallbackRole
  const mockUser = MOCK_USERS[fallbackRole] || MOCK_USERS.nomad_user;
  return {
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
    avatar: mockUser.avatar,
    role: mockUser.role,
    badge: mockUser.badge
  };
};
