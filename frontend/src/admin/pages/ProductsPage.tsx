import React, {useState} from 'react';
import {Plus} from 'lucide-react';
import Modal from '../components/Modal';
import {DeleteConfirm} from '../components/FormComponents';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import {useProducts} from '../hooks/useProducts';
import {Product} from '../../types';
import { useToast } from '../../components/UI/Toast';
import success from "@pages/Success";

const ProductsPage: React.FC = () => {
    const {products, loading, createProduct, updateProduct, deleteProduct} = useProducts();
    const [search, setSearch] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [target, setTarget] = useState<Product | null>(null);
    const { addToast } = useToast();

    const openAdd = () => {
        setEditing(null);
        setFormOpen(true);
    };
    const openEdit = (p: Product) => {
        setEditing(p);
        setFormOpen(true);
    };
    const openDel = (p: Product) => {
        setTarget(p);
        setDelOpen(true);
    };

    const handleSubmit = async (data: FormData) => {
        if (editing) {
            await updateProduct(editing.id, data);
            addToast("Le produit a été modifié avec succès","success");
        } else {
            await createProduct(data);
            addToast("Le produit a été créé avec succès","success");
        }

        setFormOpen(false);
    };

    const handleDelete = async () => {
        if (target) await deleteProduct(target.id);
        addToast("Le produit a été supprimé avec succès","success");
        setDelOpen(false);
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"/>
        </div>
    );

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-white text-xl font-black">Produits</h2>
                    <p className="text-white/30 text-sm mt-0.5">{products.length} produit(s)</p>
                </div>
                <button onClick={openAdd}
                        className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-white/90 transition-all shadow-lg shrink-0">
                    <Plus size={15}/> Ajouter
                </button>
            </div>

            <ProductTable
                products={products}
                search={search}
                onSearch={setSearch}
                onEdit={openEdit}
                onDelete={openDel}
            />

            {/* Add / Edit modal */}
            <Modal isOpen={formOpen} onClose={() => setFormOpen(false)}
                   title={editing ? 'Modifier le produit' : 'Ajouter un produit'} size="lg">
                <ProductForm onSubmit={handleSubmit} initial={editing}  onCancel={() => setFormOpen(false)}/>
            </Modal>

            {/* Delete confirm */}
            <Modal isOpen={delOpen} onClose={() => setDelOpen(false)} title="Supprimer le produit" size="sm">
                <DeleteConfirm onConfirm={handleDelete} onCancel={() => setDelOpen(false)}
                               message={`Supprimer "${target?.name}" ? Cette action est irréversible.`}/>
            </Modal>
        </div>
    );
};

export default ProductsPage;
