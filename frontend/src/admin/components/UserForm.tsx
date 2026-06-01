import React, {useState, useEffect} from 'react';
import {FormField, FormInput, FormSelect, FormActions} from '../components/FormComponents';
import {User, UserFormData, UserRole, UserStatus} from '../../types';

interface Props {
    initial: User | null;
    onSubmit: (data: UserFormData) => Promise<void>;
    onCancel: () => void;
}

const defaultForm: UserFormData = {
    firstname: '',
    lastname: '',
    email: '',
    role: 'CUSTOMER',
    address:'',
    codePostal:'',
    ville:''
};

const UserForm: React.FC<Props> = ({initial, onSubmit, onCancel}) => {
    const [form, setForm] = useState<UserFormData>(defaultForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initial) {
            setForm({
                firstname: initial.firstname,
                email: initial.email,
                role: initial.role,
                lastname: initial.lastname,
                address: initial.address,
                codePostal: initial.codePostal,
                ville: initial.ville,
            });
        } else {
            setForm(defaultForm);
        }
    }, [initial]);

    const set = <K extends keyof UserFormData>(k: K, v: UserFormData[K]) =>
        setForm(f => ({...f, [k]: v}));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(form);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Prénom" required>
                <FormInput
                    disabled
                    value={form.firstname}
                    onChange={e => set('firstname', e.target.value)}
                    placeholder="Ex: Jean"
                    required
                />
            </FormField>
            <FormField label="Nom" required>
                <FormInput
                    disabled
                    value={form.lastname}
                    onChange={e => set('lastname', e.target.value)}
                    placeholder="Ex: Dupont"
                    required
                />
            </FormField>
            <FormField label="Email" >
                <FormInput
                    disabled
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="Ex: jean@example.com"
                    required
                />
            </FormField>
            <FormField label="Adresse" >
                <FormInput
                    disabled
                    type="text"
                    value={form.address}
                    onChange={e => set('address', e.target.value)}
                    placeholder=""
                    required
                />
            </FormField>
            <FormField label="Ville" >
                <FormInput
                    disabled
                    type="text"
                    value={form.ville}
                    onChange={e => set('ville', e.target.value)}
                    placeholder=""
                    required
                />
            </FormField>
            <FormField label="Code Postal" >
                <FormInput
                    disabled
                    type="text"
                    value={form.codePostal}
                    onChange={e => set('codePostal', e.target.value)}
                    placeholder="40000"
                    required
                />
            </FormField>

            <FormField label="Rôle" >
                <FormInput
                    disabled
                    value={form.role}
                    onChange={e => set('role', e.target.value as UserRole)}
                    required
                />
            </FormField>

            <FormActions onCancel={onCancel} submitLabel="Ok" loading={loading}/>
        </form>
    );
};

export default UserForm;
