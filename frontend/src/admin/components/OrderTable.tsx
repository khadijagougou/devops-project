import React, {useEffect, useState} from 'react';
import { Eye, Clock, Hash, User, ChevronRight } from 'lucide-react';
import AdminTable, { SearchBar } from '../components/AdminTable';
import StatusBadge from '../components/StatusBadge';
import {Order, OrderStatus, PaymentStatus} from '../../types';
import {userService} from "@admin/services/userService.ts";

interface Props {
  orders: Order[];
  search: string;
  onSearch: (v: string) => void;
  filterStatus: string;
  onFilterStatus: (s: string) => void;
  onView: (o: Order) => void;
  onUpdateStatus: (id: string, s: OrderStatus) => Promise<void>;
}

const ORDER_STATUSES: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const columns = [
  { key: 'orderNumber', label: 'Commande' },
  { key: 'userId',      label: 'Client ID' },
  { key: 'date',        label: 'Date & Heure' },
  { key: 'total',       label: 'Total' },
  { key: 'status',      label: 'État' },
  { key: 'paymentStatus',      label: 'État du paiement' },
  { key: 'actions',     label: '', width: '150px' },
];

const OrderTable: React.FC<Props> = ({
  orders,
  search,
  onSearch,
  filterStatus,
  onFilterStatus,
  onView,
  onUpdateStatus,
}) => {
  const filtered = orders.filter(o => {
    const orderNum = (o.orderNumber || o.id || '').toString().toLowerCase();
    const matchSearch = orderNum.includes(search.toLowerCase());
    const currentStatus = (o.orderStatus || 'pending').toLowerCase();
    const matchStatus = filterStatus ? currentStatus === filterStatus.toLowerCase() : true;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02] p-2 rounded-2xl border border-white/[0.05]">
        <SearchBar value={search} onChange={onSearch} placeholder="Rechercher par N° de commande..." />
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <button
            onClick={() => onFilterStatus('')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              !filterStatus 
                ? 'bg-white text-black border-white shadow-lg shadow-white/10' 
                : 'bg-white/[0.05] text-white/40 border-white/[0.05] hover:border-white/20'
            }`}
          >
            Tous ({orders.length})
          </button>
          {ORDER_STATUSES.map(s => {
            const count = orders.filter(o => (o.orderStatus || 'pending').toLowerCase() === s.toLowerCase()).length;
            if (count === 0 && filterStatus !== s) return null;
            return (
              <button
                key={s}
                onClick={() => onFilterStatus(filterStatus === s ? '' : s)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  filterStatus === s
                    ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                    : 'bg-white/[0.05] text-white/40 border-white/[0.05] hover:border-white/20'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <AdminTable<Order>
        columns={columns}
        data={filtered}
        emptyMessage="Aucune commande ne correspond à vos critères."
        renderRow={(o) => {
          const status = (o.orderStatus?.toLowerCase() || 'pending') as OrderStatus;
          const paymentStatus = (o.paymentStatus?.toLowerCase() || 'pending') as PaymentStatus;
          const itemCount = o.orderItemDtos?.length || 0;
          const date = o.orderDate ? new Date(o.orderDate).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          }) : o.date;

          return (
            <tr key={o.id} className="hover:bg-white/[0.03] transition-all group cursor-pointer" onClick={() => onView(o)}>
              {/* Order Num */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Hash size={14} className="text-white/30" />
                  </div>
                  <span className="font-mono text-xs font-black text-white/80">{o.orderNumber || o.id}</span>
                </div>
              </td>

              {/* User */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <User size={12} className="text-blue-400" />
                  </div>
                  <span className="text-white/60 text-xs font-semibold">{o.userId} </span>
                </div>
              </td>

              {/* Date */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-white/40 text-[11px] font-medium">
                  <Clock size={12} className="shrink-0" />
                  <span>{date}</span>
                </div>
              </td>



              {/* Total */}
              <td className="px-5 py-4">
                <span className="text-white font-black text-sm">
                  {(o.total || 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <StatusBadge status={status} />
              </td>   <td className="px-5 py-4">
                <StatusBadge status={paymentStatus} />
              </td>

              {/* Actions */}
              <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <select
                    value={status}
                    onChange={e => onUpdateStatus(o.id!, e.target.value as OrderStatus)}
                    className="bg-[#1a1a1a] border border-white/[0.08] text-white/60 text-[10px] font-bold uppercase rounded-lg px-2 py-1.5 outline-none cursor-pointer hover:border-white/20 transition-all"
                  >
                    {ORDER_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => onView(o)}
                    className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.08] transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Eye size={15} />
                  </button>
                  <ChevronRight size={14} className="text-white/10 group-hover:translate-x-1 transition-transform" />
                </div>
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default OrderTable;
