import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../components/Modal';
import { DeleteConfirm } from '../components/FormComponents';
import CategoryTable from '../components/CategoryTable';
import CategoryForm  from '../components/CategoryForm';
import { useCategories } from '../hooks/useCategories';
import { Category, CategoryFormData } from '../../types';
import {useToast} from "@components/UI/Toast.tsx";

const CategoriesPage: React.FC = () => {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const [search, setSearch]     = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [delOpen, setDelOpen]   = useState(false);
  const [editing, setEditing]   = useState<Category | null>(null);
  const [target, setTarget]     = useState<Category | null>(null);
    const { addToast } = useToast();

  const openAdd  = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setFormOpen(true); };
  const openDel  = (c: Category) => { setTarget(c);  setDelOpen(true); };

    const handleSubmit = async (data: CategoryFormData) => {
        if (editing) {
            await updateCategory(editing.id, data);
            addToast("La catégorie a été modifiée avec succès", "success");
        } else {
            await createCategory(data);
            addToast("La catégorie a été créée avec succès", "success");
        }

        setFormOpen(false);
    };
  const handleDelete = async () => {
    if (target) await deleteCategory(target.id);
      addToast("La catégorie a été supprimée avec succès", "success");
      setDelOpen(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-black">Catégories</h2>
          <p className="text-white/30 text-sm mt-0.5">{categories.length} catégorie(s)</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-white/90 transition-all shadow-lg shrink-0">
          <Plus size={15} /> Ajouter
        </button>
      </div>

      <CategoryTable categories={categories} search={search} onSearch={setSearch} onEdit={openEdit} onDelete={openDel} />

      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)}
        title={editing ? 'Modifier la catégorie' : 'Ajouter une catégorie'} size="sm">
        <CategoryForm initial={editing} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <Modal isOpen={delOpen} onClose={() => setDelOpen(false)} title="Supprimer la catégorie" size="sm">
        <DeleteConfirm onConfirm={handleDelete} onCancel={() => setDelOpen(false)}
          message={`Supprimer "${target?.name}" ? Cette action est irréversible.`} />
      </Modal>
    </div>
  );
};

export default CategoriesPage;
