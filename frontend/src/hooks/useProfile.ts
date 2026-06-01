import { useState, useEffect, useCallback } from 'react';
import { User, UserFormData } from '../types';
import { userService } from '../admin/services/userService';

export function useProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.me();
      setUser(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Impossible de charger les informations du profil');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const updateProfile = useCallback(async (data: UserFormData) => {
    if (!user) return;
    try {
        const updated = await userService.update(user.id, data);
        setUser(updated);
        
        const stored = localStorage.getItem('user');
        if (stored) {
            const parsed = JSON.parse(stored);
            localStorage.setItem('user', JSON.stringify({ ...parsed, ...updated }));
            window.dispatchEvent(new Event("authChanged"));
        }
        return updated;
    } catch (e) {
        throw e;
    }
  }, [user]);

  return { user, loading, error, updateProfile, refresh: load };
}
