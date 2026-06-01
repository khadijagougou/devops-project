import React, { useState } from 'react';
import { ShoppingBag, Bell } from 'lucide-react';
import Modal from '../components/Modal';
import OrderTable from '../components/OrderTable';
import OrderDetail from '../components/OrderDetail';
import { useOrders } from '../hooks/useOrders';
import { Order, OrderStatus } from '../../types';

const OrdersPage: React.FC = () => {
  const { orders, loading, updateStatus } = useOrders();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);

  const pendingCount = orders.filter(o => (o.orderStatus || 'pending').toLowerCase() === 'pending').length;

  const openDetail = (o: Order) => {
    setSelected(o);
    setDetailOpen(true);
  };

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    const updated = await updateStatus(id, status);
    // Sync the selected order if it's currently open in modal
    if (selected && (selected.id === id || selected.orderNumber === id)) {
      setSelected(updated);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
            <div className="w-12 h-12 border-4 border-white/5 border-t-white rounded-full animate-spin" />
            <ShoppingBag className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" size={16} />
        </div>
      </div>
    );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-xl">
                <ShoppingBag className="text-white" size={20} />
            </div>
            <div>
                <h2 className="text-white text-2xl font-black tracking-tight">Gestion des Commandes</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-white/30 text-xs font-medium">{orders.length} commandes au total</span>
                    {pendingCount > 0 && (
                        <span className="flex items-center gap-1 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-500/20">
                            <Bell size={10} /> {pendingCount} nouvelle{pendingCount > 1 ? 's' : ''}
                        </span>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Main Table */}
      <OrderTable
        orders={orders}
        search={search}
        onSearch={setSearch}
        filterStatus={filterStatus}
        onFilterStatus={setFilterStatus}
        onView={openDetail}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Detail Modal */}
      <Modal 
        isOpen={detailOpen} 
        onClose={() => setDetailOpen(false)} 
        title={selected ? `Commande #${selected.orderNumber || selected.id}` : 'Détails de la commande'} 
        size="lg"
      >
        {selected && (
            <OrderDetail 
                order={selected} 
                onUpdateStatus={handleUpdateStatus} 
            />
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
