import { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types';
import { productService } from '../services/productService';

export function useProducts() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const createProduct = useCallback(async (formData: FormData) => {
    const created = await productService.create(formData);
    setProducts(prev => [created, ...prev]);
    return created;
  }, []);

  const updateProduct = useCallback(async (id: number, formData: FormData) => {
    const updated = await productService.update(id, formData);
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    await productService.delete(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  return { products, loading, error, createProduct, updateProduct, deleteProduct, reload: load };
}
