import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Mail, Lock, Eye, EyeOff, ArrowRight} from 'lucide-react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {loginStart, loginSuccess, loginFailure} from '../../store/slices/authSlice';
import {useToast} from '../../components/UI/Toast';
import {motion} from 'framer-motion';
import {userService} from "@admin/services/userService.ts";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {addToast} = useToast();
    const {loading} = useAppSelector(state => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!email || !password) {
                addToast('Identifiants invalides', 'error');
                return;
            }

            const response = await userService.login({email, password});

            localStorage.setItem('token', response.token);

            const user = await userService.me();
            localStorage.setItem('userId', String(user.id));
            localStorage.setItem('user', JSON.stringify(user));
            addToast('Connexion réussie !', 'success');
            localStorage.setItem('isAuthenticated', 'true');
            window.dispatchEvent(new Event("authChanged"));
            window.dispatchEvent(new Event("cartUpdated"));
            if (user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (error) {
            addToast('Erreur de connexion', 'error');
        }
    };
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
            <motion.div
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                className="max-w-md w-full bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-black/5 border border-gray-100"
            >
                <div className="text-center mb-10 space-y-3">
                    <h1 className="text-4xl font-black text-important tracking-tight">Bon retour !</h1>
                    <p className="text-main-text">Connectez-vous pour accéder à votre espace.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-important ml-2">Email</label>
                        <div className="relative group">
                            <div
                                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                                <Mail size={18}/>
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

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-important ml-2">Mot de passe</label>
                        <div className="relative group">
                            <div
                                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-main-text group-focus-within:text-important transition-colors">
                                <Lock size={18}/>
                            </div>
                            <input
                                required
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-main-bg border-transparent focus:bg-white focus:border-important border rounded-2xl py-4 pl-12 pr-12 outline-none transition-all font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-main-text hover:text-important transition-colors"
                            >
                                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>
                    </div>



                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-important text-white font-black py-5 rounded-2xl hover:opacity-90 transition-all flex items-center cursor-pointer justify-center gap-3 shadow-xl shadow-black/10 disabled:opacity-50"

                    >
                        {loading ? 'Connexion...' : (
                            <>Se connecter <ArrowRight size={20}/></>
                        )}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-main-text font-medium">
                        Pas encore de compte ?{' '}
                        <Link to="/register" className="text-important font-black hover:underline underline-offset-4">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
