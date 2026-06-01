import React, { useState, useEffect } from 'react';
import { FormField, FormInput, FormTextarea, FormActions } from '../components/FormComponents';
import { Category, CategoryFormData } from '../../types';

interface Props {
  initial?: Category | null;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
}

const defaultForm: CategoryFormData = { name: '' };

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const CategoryForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState<CategoryFormData>(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initial
      ? { name: initial.name}
      : defaultForm
    );
  }, [initial]);

  const set = <K extends keyof CategoryFormData>(k: K, v: CategoryFormData[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(form); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Nom" required>
        <FormInput
          value={form.name}
          onChange={e => { set('name', e.target.value); set('name', slugify(e.target.value)); }}
          placeholder="Ex: Électronique"
          required
        />
      </FormField>

      <FormActions onCancel={onCancel} submitLabel={initial ? 'Mettre à jour' : 'Ajouter'} loading={loading} />
    </form>
  );
};

export default CategoryForm;
