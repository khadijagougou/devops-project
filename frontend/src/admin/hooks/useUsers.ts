import { useState, useEffect, useCallback } from 'react';
import { User, UserFormData } from '../../types';
import { userService } from '../services/userService';

export function useUsers() {
  const [users, setUsers]     = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setUsers(await userService.getAll());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const updateUser = useCallback(async (id: number, data: UserFormData) => {
    const updated = await userService.update(id, data);
    setUsers(prev => prev.map(u => u.id === id ? updated : u));
    return updated;
  }, []);

  const deleteUser = useCallback(async (id: number) => {
    await userService.delete(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  return { users, loading, error, updateUser, deleteUser };
}
