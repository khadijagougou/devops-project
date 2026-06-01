import { useState, useEffect, useCallback } from 'react';
import { Order, OrderStatus } from '../../types';
import { orderService } from '../services/orderService';
import { useToast } from '../../components/UI/Toast';

export function useOrders() {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const { addToast }          = useToast();

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement des commandes');
      addToast('Impossible de charger les commandes', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => { void load(); }, [load]);

  const updateStatus = useCallback(async (id: string, status: OrderStatus): Promise<Order> => {
    try {
      // Find the order to get the userId
      const targetOrder = orders.find(o => o.id === id || o.orderNumber === id);
      const userId = targetOrder?.userId || 0;
      
      const updated = await orderService.updateStatus(Number(id), status);
      
      // Optimistically or after-the-fact update the local state
      setOrders(prev => prev.map(o => 
        (o.id === id || o.orderNumber === id) 
          ? { ...o, orderStatus: status } 
          : o
      ));
      
      addToast(`Statut de la commande mis à jour : ${status}`, 'success');
      return updated;
    } catch (e) {
      addToast('Erreur lors de la mise à jour du statut', 'error');
      throw e;
    }
  }, [orders, addToast]);

  return { orders, loading, error, updateStatus, reload: load };
}
