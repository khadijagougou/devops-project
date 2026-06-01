import React, {useState, useEffect} from 'react';
import {ImagePlus} from 'lucide-react';
import {FormField, FormInput, FormTextarea, FormSelect, FormActions} from '../components/FormComponents';
import {Product, ProductFormData} from '../../types';
import {BASE_URL} from "@/environment.ts";
import {categoryService} from "@admin/services/categoryService.ts";

interface Props {
    initial?: Product | null;
    onSubmit: (data: FormData) => Promise<void>;
    onCancel: () => void;
}

const defaultForm: ProductFormData = {
    name: '', description: '', categoryId: 0,
    price: 0, quantity: 0, fileName: ''
};

const ProductForm: React.FC<Props> = ({initial,onSubmit, onCancel}) => {
    const [form, setForm] = useState<ProductFormData>(defaultForm);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        categoryService.getAll()
            .then(res => setCategories(res));
    }, []);

    useEffect(() => {
        if (initial) {
            setForm({
                name: initial.name,
                description: initial.description,
                categoryId: initial.categoryId,
                price: initial.price,
                quantity: initial.quantity,
                fileName: initial.fileName,
            });
            setPreview(`${BASE_URL}/files/${initial.fileName}`);
        } else {
            setForm(defaultForm);
            setPreview('');
        }
    }, [initial]);

    const set = <K extends keyof ProductFormData>(key: K, val: ProductFormData[K]) =>
        setForm(f => ({...f, [key]: val}));

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("product", JSON.stringify(form));

            if (file) {
                formData.append("file", file);
            }

            await onSubmit(formData); // ✅ UTILISER le parent

        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image upload */}
            <div
                className="w-full h-36 rounded-xl border-2 border-dashed border-white/[0.10] flex items-center justify-center overflow-hidden bg-white/[0.02] relative cursor-pointer">
                {preview
                    ? <img src={preview} alt="preview" className="w-full h-full object-contain"/>
                    : <div className="flex flex-col items-center gap-2 text-white/25"><ImagePlus size={26}/><span
                        className="text-xs">Cliquez pour ajouter une image</span></div>
                }
                <input type="file" accept="image/*" onChange={handleImg}
                       className="absolute inset-0 opacity-0 cursor-pointer"/>
            </div>
            {preview && (
                <button type="button" onClick={() => {
                    setPreview('');
                    set('fileName', '');
                }}
                        className="text-xs text-red-400/70 hover:text-red-400 transition-colors">
                    Supprimer l'image
                </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Nom" required>
                    <FormInput value={form.name} onChange={e => set('name', e.target.value)}
                               placeholder="Nom du produit" required/>
                </FormField>
                <FormField label="Catégorie" required>
                    <FormSelect value={form.categoryId} onChange={e => set('categoryId', Number(e.target.value))}
                                required>
                        <option value={0}>Choisir...</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </FormSelect>
                </FormField>
                <FormField label="Prix (€)" required>
                    <FormInput type="number" min={0} step={0.01} value={form.price}
                               onChange={e => set('price', Number(e.target.value))} required/>
                </FormField>
                <FormField label="Quantité" required>
                    <FormInput type="number" min={0} value={form.quantity}
                               onChange={e => set('quantity', Number(e.target.value))} required/>
                </FormField>
            </div>




            <FormField label="Description">
                <FormTextarea value={form.description} onChange={e => set('description', e.target.value)}
                              placeholder="Description..."/>
            </FormField>

            <FormActions onCancel={onCancel} submitLabel={initial ? 'Mettre à jour' : 'Ajouter'} loading={loading}/>
        </form>
    );
};

export default ProductForm;
