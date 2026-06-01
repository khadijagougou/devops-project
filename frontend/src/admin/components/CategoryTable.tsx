import React from 'react';
import { Pencil, Trash2, Tag } from 'lucide-react';
import AdminTable, { SearchBar } from '../components/AdminTable';
import { Category } from '../../types';

interface Props {
  categories: Category[];
  search: string;
  onSearch: (v: string) => void;
  onEdit: (c: Category) => void;
  onDelete: (c: Category) => void;
}

const COLORS = ['#6366f1','#10b981','#f59e0b','#ec4899','#14b8a6'];

const columns = [
  { key: 'icon',     label: '',             },
  { key: 'name',     label: 'Nom' },
  { key: 'actions',  label: '',           },
];

const CategoryTable: React.FC<Props> = ({ categories, search, onSearch, onEdit, onDelete }) => {
  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <SearchBar value={search} onChange={onSearch} placeholder="Rechercher une catégorie..." />
      <AdminTable<Category>
        columns={columns}
        data={filtered}
        emptyMessage="Aucune catégorie trouvée."
        renderRow={(c, i) => (
          <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
            <td className="px-5 py-3.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${COLORS[i % COLORS.length]}20` }}>
                <Tag size={15} style={{ color: COLORS[i % COLORS.length] }} />
              </div>
            </td>
            <td className="px-5 py-3.5">
              <p className="text-white text-sm font-semibold">{c.name}</p>
            </td>


            <td className="px-5 py-3.5">
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(c)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
                  <Pencil size={13} />
                </button>
                <button onClick={() => onDelete(c)} className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all">
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

export default CategoryTable;
