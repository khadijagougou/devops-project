import React, {useEffect, useState} from 'react';
import {Pencil, Trash2, ImagePlus} from 'lucide-react';
import AdminTable, {SearchBar} from '../components/AdminTable';
import StatusBadge from '../components/StatusBadge';
import {Category, Product} from '../../types';
import {BASE_URL} from "@/environment.ts";
import {categoryService} from "@admin/services/categoryService.ts";

interface Props {
    products: Product[];
    search: string;
    onSearch: (v: string) => void;
    onEdit: (p: Product) => void;
    onDelete: (p: Product) => void;
}

const columns = [
    {key: 'img', label: '', width: '60px'},
    {key: 'name', label: 'Produit'},
    {key: 'category', label: 'Catégorie'},
    {key: 'price', label: 'Prix'},
    {key: 'quantity', label: 'Quantity'},
    {key: 'actions', label: '', width: '90px'},
];

const ProductTable: React.FC<Props> = ({products, search, onSearch, onEdit, onDelete}) => {
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        categoryService.getAll()
            .then(res => setCategories(res));
    }, []);
    const categoryMap = new Map(
        categories.map(c => [c.id, c.name])
    );
    return (
        <div className="space-y-4">
            <SearchBar value={search} onChange={onSearch} placeholder="Rechercher un produit..."/>
            <AdminTable<Product>
                columns={columns}
                data={filtered}
                emptyMessage="Aucun produit trouvé."
                renderRow={(p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-5 py-3">
                            <div
                                className="w-10 h-10 rounded-xl overflow-hidden bg-white/[0.05] border border-white/[0.06]">
                                {p.fileName
                                    ? <img
                                        src={`${BASE_URL}/files/${p.fileName}`}
                                        alt={p.name}
                                        className="w-full h-full object-cover"

                                    />
                                    : <div className="w-full h-full flex items-center justify-center text-white/20">
                                        <ImagePlus size={14}/></div>}

                            </div>
                        </td>
                        <td className="px-5 py-3">
                            <p className="text-white text-sm font-medium">{p.name}</p>
                            <p className="text-white/30 text-xs mt-0.5 truncate max-w-[200px]">{p.description}</p>
                        </td>
                        <td className="px-5 py-3">
                            <span
                                className="bg-white/[0.06] text-white/60 text-xs px-2.5 py-1 rounded-lg">
                                        {categoryMap.get(p.categoryId)}
                            </span>
                        </td>
                        <td className="px-5 py-3 text-white font-semibold text-sm">
                            {p.price.toLocaleString('fr-FR', {style: 'currency', currency: 'USD'})}
                        </td>
                        <td className="px-5 py-3">
              <span
                  className={`text-sm font-semibold ${p.quantity === 0 ? 'text-red-400' : p.quantity < 10 ? 'text-yellow-400' : 'text-white'}`}>
                {p.quantity}
              </span>
                        </td>
                        <td className="px-5 py-3">
                            <div
                                className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onEdit(p)}
                                        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
                                    <Pencil size={13}/>
                                </button>
                                <button onClick={() => onDelete(p)}
                                        className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all">
                                    <Trash2 size={13}/>
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

export default ProductTable;
