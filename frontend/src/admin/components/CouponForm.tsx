import React, { useState, useEffect } from 'react';
import { FormField, FormInput, FormSelect, FormActions } from './FormComponents';
import { Coupon, CouponType, CouponFormData } from '../../types';

interface Props {
  initial?: Coupon | null;
  onSubmit: (data: CouponFormData) => Promise<void>;
  onCancel: () => void;
}

const toDateInput = (d: Date | string | undefined) => {
  if (!d) return '';
  const date = new Date(d);
  return date.toISOString().split('T')[0];
};

const defaultForm: CouponFormData = {
  name: '',
  value: '',
  couponType: 'PERCENTAGE',
  active: true,
  startDate: '',
  expirationDate: '',
};

const CouponForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm]     = useState<CouponFormData>(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        name:            initial.name,
        value:           initial.value,
        couponType:     initial.couponType,
        active:          initial.active,
        startDate:      initial.startDate,
        expirationDate: initial.expirationDate,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initial]);

  const set = <K extends keyof CouponFormData>(k: K, v: CouponFormData[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(form); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <FormField label="Nom du coupon" required>
        <FormInput
          value={form.name}
          onChange={e => set('name', e.target.value)}
          placeholder="Ex: PROMO20"
          required
        />
      </FormField>

      {/* Value & Type */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Valeur" required>
          <FormInput
            type="number"
            min={0}
            value={form.value}
            onChange={e => set('value', e.target.value)}
            placeholder="Ex: 20"
            required
          />
        </FormField>

        <FormField label="Type" required>
          <FormSelect
            value={form.couponType}
            onChange={e => set('couponType', e.target.value as CouponType)}
          >
            <option value="PERCENTAGE">Pourcentage (%)</option>
            <option value="AMOUNT">Montant fixe (€)</option>
          </FormSelect>
        </FormField>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Date de début" required>
          <FormInput
            type="date"
            value={form.startDate}
            onChange={e => set('startDate', e.target.value)}
            required
          />
        </FormField>

        <FormField label="Date d'expiration" required>
          <FormInput
            type="date"
            value={form.expirationDate}
            onChange={e => set('expirationDate', e.target.value)}
            required
          />
        </FormField>
      </div>

      {/* Active toggle */}
      <FormField label="Statut">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            onClick={() => set('active', !form.active)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
              form.active ? 'bg-emerald-500' : 'bg-white/[0.10]'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                form.active ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
          <span className={`text-sm font-medium ${form.active ? 'text-emerald-400' : 'text-white/40'}`}>
            {form.active ? 'Actif' : 'Inactif'}
          </span>
        </label>
      </FormField>

      <FormActions
        onCancel={onCancel}
        submitLabel={initial ? 'Mettre à jour' : 'Ajouter'}
        loading={loading}
      />
    </form>
  );
};

export default CouponForm;
