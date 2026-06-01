import { useState, useEffect, useCallback } from 'react';
import { Category, CategoryFormData } from '../../types';
import { categoryService } from '../services/categoryService';
import {productService} from "@admin/services/productService.ts";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setCategories(await categoryService.getAll());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const createCategory = useCallback(async (data: CategoryFormData) => {
    const created = await categoryService.create(data);
    setCategories(prev => [created, ...prev]);
    return created;
  }, []);

  const updateCategory = useCallback(async (id: number, data: CategoryFormData) => {
    const updated = await categoryService.update(id, data);
    setCategories(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  }, []);


  const deleteCategory = useCallback(async (id: number) => {
    await categoryService.delete(id);
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  return { categories, loading, error, createCategory, updateCategory, deleteCategory };
}
