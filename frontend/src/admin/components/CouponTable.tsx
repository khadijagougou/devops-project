import React from 'react';
import { Pencil, Trash2, Percent, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import AdminTable, { SearchBar } from './AdminTable';
import { Coupon } from '../../types';

interface Props {
  coupons: Coupon[];
  search: string;
  onSearch: (v: string) => void;
  onEdit: (c: Coupon) => void;
  onDelete: (c: Coupon) => void;
}

const columns = [
  { key: 'name',    label: 'Code coupon' },
  { key: 'type',    label: 'Type' },
  { key: 'value',   label: 'Valeur' },
  { key: 'dates',   label: 'Validité' },
  { key: 'status',  label: 'Statut' },
  { key: 'actions', label: '' },
];

const fmt = (d: Date | string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

const CouponTable: React.FC<Props> = ({ coupons, search, onSearch, onEdit, onDelete }) => {
  const filtered = coupons.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <SearchBar value={search} onChange={onSearch} placeholder="Rechercher un coupon..." />
      <AdminTable<Coupon>
        columns={columns}
        data={filtered}
        emptyMessage="Aucun coupon trouvé."
        renderRow={(c) => (
          <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
            {/* Code */}
            <td className="px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  {c.couponType === 'PERCENTAGE'
                    ? <Percent size={13} className="text-violet-400" />
                    : <DollarSign size={13} className="text-amber-400" />
                  }
                </div>
                <span className="text-white text-sm font-bold font-mono tracking-wide">{c.name}</span>
              </div>
            </td>

            {/* Type */}
            <td className="px-5 py-3.5">
              <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${
                c.couponType === 'PERCENTAGE'
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'bg-amber-500/10 text-amber-400'
              }`}>
                {c.couponType === 'PERCENTAGE' ? 'Pourcentage' : 'Montant fixe'}
              </span>
            </td>

            {/* Value */}
            <td className="px-5 py-3.5">
              <span className="text-white font-bold text-sm">
                {c.couponType === 'PERCENTAGE' ? `${c.value}%` : `${c.value} €`}
              </span>
            </td>

            {/* Dates */}
            <td className="px-5 py-3.5">
              <p className="text-white/60 text-xs">{fmt(c.startDate)}</p>
              <p className="text-white/30 text-xs">→ {fmt(c.expirationDate)}</p>
            </td>

            {/* Status */}
            <td className="px-5 py-3.5">
              {c.active ? (
                <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 size={13} /> Actif
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-red-400/70 text-xs font-semibold">
                  <XCircle size={13} /> Inactif
                </span>
              )}
            </td>

            {/* Actions */}
            <td className="px-5 py-3.5">
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(c)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => onDelete(c)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default CouponTable;
