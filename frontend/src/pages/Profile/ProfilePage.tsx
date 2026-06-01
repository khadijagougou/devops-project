import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, UserFormData } from '../../types';
import { useProfile } from '../../hooks/useProfile';
import { FormField, FormInput, FormActions } from '../../admin/components/FormComponents';
import { useToast } from '../../components/UI/Toast';
import { User as UserIcon, Mail, MapPin, Building, Hash, Shield } from 'lucide-react';
import {PiPassword} from "react-icons/pi";
import {CgPassword} from "react-icons/cg";

const ProfilePage: React.FC = () => {
    const { user, loading, error, updateProfile } = useProfile();
    const { addToast } = useToast();
    const [formData, setFormData] = useState<UserFormData>({
        firstname: '',
        lastname: '',
        email: '',
        role: 'CUSTOMER',
        address: '',
        ville: '',
        codePostal: '',
        password:''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                role: user.role || 'CUSTOMER',
                address: user.address || '',
                ville: user.ville || '',
                codePostal: user.codePostal || '',
                password:user.password || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateProfile(formData);
            addToast('Profil mis à jour avec succès', 'success');
        } catch (err) {
            addToast('Erreur lors de la mise à jour du profil', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-white/20 border-t-black rounded-full animate-spin" />
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <Shield size={48} className="text-red-400 mb-4 opacity-20" />
                <p className="dark:text-gray-300">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div className="flex items-center gap-4 border-b border-black pb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-black">
                        <UserIcon size={32} className="dark:text-gray-300" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black dark:text-gray-300">Mon Profil</h1>
                        <p className="dark:text-gray-300 text-sm">Gérez vos informations personnelles et vos paramètres</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest dark:text-gray-300 border-l-2 border-black pl-3">
                            Informations Personnelles
                        </h2>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Prénom" required>
                                <div className="relative">
                                    <FormInput 
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        placeholder="Votre prénom"
                                        required
                                    />
                                </div>
                            </FormField>
                            <FormField label="Nom" required>
                                <FormInput 
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="Votre nom"
                                    required
                                />
                            </FormField>
                        </div>

                        <FormField label="Email" required>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-gray-300" />
                                <FormInput 
                                    className="pl-12"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@exemple.com"
                                    required
                                />
                            </div>
                        </FormField>
                        <FormField label="Mot de passe" >
                            <div className="relative">
                                <CgPassword size={16} className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-gray-400" />
                                <FormInput
                                    className="pl-12"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="*******"

                                />
                            </div>
                        </FormField>


                    </div>

                    <div className="space-y-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest dark:text-gray-300 border-l-2 border-black pl-3">
                            Adresse & Livraison
                        </h2>

                        <FormField label="Adresse">
                            <div className="relative">
                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-gray-300" />
                                <FormInput 
                                    className="pl-12"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Votre adresse"
                                />
                            </div>
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Ville">
                                <div className="relative">
                                    <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-gray-300" />
                                    <FormInput 
                                        className="pl-12"
                                        name="ville"
                                        value={formData.ville}
                                        onChange={handleChange}
                                        placeholder="Ville"
                                    />
                                </div>
                            </FormField>
                            <FormField label="Code Postal">
                                <div className="relative">
                                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-gray-300" />
                                    <FormInput 
                                        className="pl-12"
                                        name="codePostal"
                                        value={formData.codePostal}
                                        onChange={handleChange}
                                        placeholder="75000"
                                    />
                                </div>
                            </FormField>
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-6">
                        <FormActions 
                            submitLabel="Mettre à jour le profil"
                            loading={isSubmitting}
                        />
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ProfilePage;
