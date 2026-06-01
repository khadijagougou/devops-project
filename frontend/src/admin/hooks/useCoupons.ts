import { useState, useEffect, useCallback } from 'react';
import { Coupon, CouponFormData } from '../../types';
import { couponService } from '../services/couponService';

export function useCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setCoupons(await couponService.getAll());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const createCoupon = useCallback(async (data: CouponFormData) => {
    const created = await couponService.create(data);
    setCoupons(prev => [created, ...prev]);
    return created;
  }, []);

  const updateCoupon = useCallback(async (id: number, data: CouponFormData) => {
    const updated = await couponService.update(id, data);
    setCoupons(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  }, []);

  const deleteCoupon = useCallback(async (id: number) => {
    await couponService.delete(id);
    setCoupons(prev => prev.filter(c => c.id !== id));
  }, []);

  return { coupons, loading, error, createCoupon, updateCoupon, deleteCoupon };
}
