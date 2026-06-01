import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../components/Modal';
import { DeleteConfirm } from '../components/FormComponents';
import CouponTable from '../components/CouponTable';
import CouponForm from '../components/CouponForm';
import { useCoupons } from '../hooks/useCoupons';
import { Coupon, CouponFormData } from '../../types';
import {useToast} from "@components/UI/Toast.tsx";

const CouponsPage: React.FC = () => {
  const { coupons, loading, createCoupon, updateCoupon, deleteCoupon } = useCoupons();
  const [search, setSearch]     = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [delOpen, setDelOpen]   = useState(false);
  const [editing, setEditing]   = useState<Coupon | null>(null);
  const [target, setTarget]     = useState<Coupon | null>(null);
    const { addToast } = useToast();

  const openAdd  = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (c: Coupon) => { setEditing(c); setFormOpen(true); };
  const openDel  = (c: Coupon) => { setTarget(c);  setDelOpen(true); };

    const handleSubmit = async (data: CouponFormData) => {
        try {
            if (editing) {
                await updateCoupon(editing.id, data);
                addToast("Le coupon a été modifié avec succès", "success");
            } else {
                await createCoupon(data);
                addToast("Le coupon a été créé avec succès", "success");
            }

            setFormOpen(false);
        } catch (error) {
            addToast("Une erreur est survenue", "error");
        }
    };

  const handleDelete = async () => {
    if (target) await deleteCoupon(target.id);
      addToast("Le coupon a été supprimé avec succès", "success");

      setDelOpen(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-black">Coupons</h2>
          <p className="text-white/30 text-sm mt-0.5">{coupons.length} coupon(s) au total</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-white/90 transition-all shadow-lg shrink-0"
        >
          <Plus size={15} /> Ajouter
        </button>
      </div>

      <CouponTable
        coupons={coupons}
        search={search}
        onSearch={setSearch}
        onEdit={openEdit}
        onDelete={openDel}
      />

      {/* Add / Edit modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Modifier le coupon' : 'Ajouter un coupon'}
        size="md"
      >
        <CouponForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={delOpen} onClose={() => setDelOpen(false)} title="Supprimer le coupon" size="sm">
        <DeleteConfirm
          onConfirm={handleDelete}
          onCancel={() => setDelOpen(false)}
          message={`Supprimer le coupon "${target?.name}" ? Cette action est irréversible.`}
        />
      </Modal>
    </div>
  );
};

export default CouponsPage;
