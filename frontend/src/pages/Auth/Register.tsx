import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {User, Mail, Lock, Home, Building, MapPin, ArrowRight} from 'lucide-react';
import { useToast } from '../../components/UI/Toast';
import { motion } from 'framer-motion';
import {userService} from "@admin/services/userService.ts";

const Register: React.FC = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [role,setRole] = useState('CUSTOMER');
  
  const navigate = useNavigate();
  const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await userService.register({
                firstname,
                lastname,
                email,
                password,
                role,
                address,
                ville,
                codePostal,
            });

            addToast('Compte créé avec succès ! Connectez-vous maintenant.', 'success');

            navigate('/login');
        } catch (error) {
            console.error(error);
            addToast("Erreur lors de la création du compte", 'error');
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-black/5 border border-gray-100"
      >
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-4xl font-black text-important tracking-tight">Bienvenue !</h1>
          <p className="text-main-text">Créez votre compte en quelques secondes.</p>
        </div>

          <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Prénom */}
                  <div className="space-y-2">
                      <label className="text-sm font-bold text-important ml-2">
                          Prénom
                      </label>

                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                              <User size={18} />
                          </div>

                          <input
                              required
                              type="text"
                              value={firstname}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Jean"
                              className="w-full bg-main-bg border-transparent focus:bg-white focus:border-important border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                          />
                      </div>
                  </div>

                  {/* Nom */}
                  <div className="space-y-2">
                      <label className="text-sm font-bold text-important ml-2">
                          Nom
                      </label>

                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                              <User size={18} />
                          </div>

                          <input
                              required
                              type="text"
                              value={lastname}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Dupont"
                              className="w-full bg-main-bg border-transparent focus:bg-white focus:border-important border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                          />
                      </div>
                  </div>

                  {/* Adresse */}
                  <div className="space-y-2">
                      <label className="text-sm font-bold text-important ml-2">
                          Adresse
                      </label>

                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                              <Home size={18} />
                          </div>

                          <input
                              required
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="123 Avenue..."
                              className="w-full bg-main-bg border-transparent focus:bg-white focus:border-important border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                          />
                      </div>
                  </div>

                  {/* Ville */}
                  <div className="space-y-2">
                      <label className="text-sm font-bold text-important ml-2">
                          Ville
                      </label>

                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                              <Building  size={18} />
                          </div>

                          <input
                              required
                              type="text"
                              value={ville}
                              onChange={(e) => setVille(e.target.value)}
                              placeholder="Marseille"
                              className="w-full bg-main-bg border-transparent focus:bg-white focus:border-important border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                          />
                      </div>
                  </div>

                  {/* Code Postal */}
                  <div className="space-y-2">
                      <label className="text-sm font-bold text-important ml-2">
                          Code Postal
                      </label>

                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                              <MapPin  size={18} />
                          </div>

                          <input
                              required
                              type="text"
                              value={codePostal}
                              onChange={(e) => setCodePostal(e.target.value)}
                              placeholder="40000"
                              className="w-full bg-main-bg border-transparent focus:bg-white focus:border-important border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                          />
                      </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                      <label className="text-sm font-bold text-important ml-2">
                          Email
                      </label>

                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                              <Mail size={18} />
                          </div>

                          <input
                              required
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="votre@email.com"
                              className="w-full bg-main-bg border-transparent focus:bg-white focus:border-important border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                          />
                      </div>
                  </div>

              </div>

              {/* Mot de passe pleine largeur */}
              <div className="space-y-2">
                  <label className="text-sm font-bold text-important ml-2">
                      Mot de passe
                  </label>

                  <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                          <Lock size={18} />
                      </div>

                      <input
                          required
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-main-bg border-transparent focus:bg-white focus:border-important border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium"
                      />
                  </div>
              </div>
              <button type="submit" disabled={loading} className=" cursor-pointer w-full bg-important text-white font-black py-5 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 disabled:opacity-50" > {loading ? 'Création...' : ( <>Créer mon compte <ArrowRight size={20} /></> )} </button>
          </form>
        <div className="mt-10 text-center">
          <p className="text-main-text font-medium">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-important font-black hover:underline underline-offset-4">
              Se connecter
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
