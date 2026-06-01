import React, { useState } from 'react';
import {
    Menu,
    Bell,
    Search,
    ChevronDown,
    LogOut
} from 'lucide-react';

import { useNavigate } from "react-router-dom";

interface Props {
    title?: string;
    onMenuToggle: () => void;
}

const AdminNavbar: React.FC<Props> = ({
                                          title = 'Dashboard',
                                          onMenuToggle
                                      }) => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");

        window.dispatchEvent(new Event("authChanged"));
        window.dispatchEvent(new Event("cartUpdated"));

        navigate("/");
    };

    return (
        <header className="h-16 bg-[#0f0f0f] border-b border-white/[0.06] flex items-center gap-4 px-6 sticky top-0 z-30">

            <button
                onClick={onMenuToggle}
                className="lg:hidden text-white/50 hover:text-white transition-colors p-1"
            >
                <Menu size={20} />
            </button>

            <h1 className="text-white font-bold text-base hidden sm:block">
                {title}
            </h1>

            <div className="flex-1 max-w-xs ml-4 hidden md:flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-white/20 transition-all">
                <Search size={14} className="text-white/30 shrink-0" />

                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="bg-transparent text-sm text-white/70 placeholder:text-white/25 outline-none w-full"
                />
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-3 relative">

                {/* Notification */}
                <button className="relative text-white/40 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/[0.06]">
                    <Bell size={18} />

                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                </button>

                {/* Profile */}
                <div className="relative">

                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer"
                    >

                        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-black text-xs font-black shadow">
                            A
                        </div>

                        <div className="hidden sm:block text-left">
                            <p className="text-white text-xs font-semibold leading-tight">
                                Admin
                            </p>

                            <p className="text-white/30 text-[10px]">
                                Administrateur
                            </p>
                        </div>

                        <ChevronDown
                            size={13}
                            className={`text-white/30 hidden sm:block transition-transform ${
                                isProfileOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {/* Dropdown */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-52 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">

                            <div className="px-4 py-3 border-b border-white/5">

                                <p className="text-white text-sm font-semibold">
                                    Admin
                                </p>

                                <p className="text-white/40 text-xs">
                                    admin@gmail.com
                                </p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            >
                                <LogOut size={16} />

                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;