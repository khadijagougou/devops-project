import React from 'react';
import { MapPin, Package, Calendar, Hash, Mail } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { Order, OrderStatus } from '../../types';

interface Props {
  order: Order;
  onUpdateStatus: (id: string, s: OrderStatus) => Promise<void>;
}

const ORDER_STATUSES: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const OrderDetail: React.FC<Props> = ({ order, onUpdateStatus }) => {
  const status = (order.orderStatus?.toLowerCase() || 'PENDING') as OrderStatus;
  const items = order.orderItemDtos || [];
  const date = order.orderDate ? new Date(order.orderDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : order.date;

  return (
    <div className="space-y-6">
      {/* Status Control */}
      <div className="flex items-center justify-between p-4 bg-white/[0.04] rounded-2xl border border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
            <Hash size={18} className="text-white/40" />
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Numéro de commande</p>
            <p className="text-white text-sm font-black font-mono">{order.orderNumber || order.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Statut actuel</p>
            <StatusBadge status={status} />
          </div>
          <select
            value={status}
            onChange={e => onUpdateStatus(order.id!, e.target.value as OrderStatus)}
            className="bg-[#1a1a1a] border border-white/[0.10] text-white text-xs font-bold rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:border-white/30 transition-all"
          >
            {ORDER_STATUSES.map(s => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Card */}
        <div className="p-5 bg-white/[0.04] rounded-2xl border border-white/[0.06] space-y-4">
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Informations Client</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Mail size={14} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-medium">Email de contact</p>
                <p className="text-white text-sm font-semibold">Utilisateur #{order.userId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Calendar size={14} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-medium">Date de commande</p>
                <p className="text-white text-sm font-semibold">{date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Card (Placeholder logic since Order interface might be incomplete) */}
        <div className="p-5 bg-white/[0.04] rounded-2xl border border-white/[0.06] space-y-4">
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Expédition & Logistique</p>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
              <MapPin size={14} />
            </div>
            <div className="space-y-1">
              <p className="text-white/40 text-[10px] font-medium">Adresse de livraison</p>
              <p className="text-white/70 text-xs leading-relaxed">
                  123 Avenue du Luxe,75008 Paris, France
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Contenu du colis ({items.length})</p>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={item.id || i}
              className="group flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl border border-white/[0.05] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package size={20} className="text-white/30" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Produit #{item.productId}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-white/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/5">Qté: {item.quantity}</span>
                    <span className="text-white/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/5">P.U: {item.unitPrice}€</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-sm font-black">
                  {(item.unitPrice * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 bg-white/[0.06] rounded-3xl border border-white/[0.10] flex items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Montant Total</p>
          <p className="text-white/60 text-xs italic">Taxes et frais de livraison inclus</p>
        </div>
        <div className="text-right">
          <span className="text-white text-3xl font-black tracking-tighter">
            {(order.total || 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
