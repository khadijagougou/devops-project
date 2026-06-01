import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface AdminTableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  emptyMessage?: string;
}

function AdminTable<T>({ columns, data, renderRow, emptyMessage = 'Aucune donnée disponible' }: AdminTableProps<T>) {
  return (
    <div className="bg-[#141414] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {columns.map(col => (
                <th key={col.key}
                  className="text-left text-white/30 text-xs font-semibold uppercase tracking-widest px-5 py-4 whitespace-nowrap"
                  style={col.width ? { width: col.width } : {}}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-white/30 py-16 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, idx) => renderRow(item, idx))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminTable;

// ─── Search bar helper ─────────────────────────────────────────────────────

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Rechercher...' }) => (
  <div className="flex items-center gap-2 bg-[#141414] border border-white/[0.06] rounded-xl px-4 py-2.5 max-w-sm">
    <svg className="w-3.5 h-3.5 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-transparent text-white text-sm placeholder:text-white/25 outline-none w-full"
    />
    {value && (
      <button onClick={() => onChange('')} className="text-white/30 hover:text-white">
        <X size={13} />
      </button>
    )}
  </div>
);
