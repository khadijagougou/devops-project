import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import {User} from "@/types";
import {cartService} from "@admin/services/cartService.ts";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {

            window.dispatchEvent(new Event("cartUpdated"));

        };

        updateCartCount();

        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);
    useEffect(() => {
        const syncCart = async () => {
            const stored = localStorage.getItem("user");
            if (!stored) return;

            const user = JSON.parse(stored);

            const res = await cartService.findCartByUserId(user.id);

            const count = res.cartItemDtos?.length || 0;
            setCartCount(count);
        };

        syncCart();

        window.addEventListener("cartUpdated", syncCart);

        return () => {
            window.removeEventListener("cartUpdated", syncCart);
        };
    }, []);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const syncAuth = () => {
            const storedUser = localStorage.getItem("user");
            const storedAuth = localStorage.getItem("isAuthenticated");

            setUser(storedUser ? JSON.parse(storedUser) : null);
            setIsAuthenticated(storedAuth === "true");
        };

        syncAuth(); // important au premier render

        window.addEventListener("storage", syncAuth); // changement multi-tab
        window.addEventListener("authChanged", syncAuth); // changement dans la même app

        return () => {
            window.removeEventListener("storage", syncAuth);
            window.removeEventListener("authChanged", syncAuth);
        };
    }, []);
    const handleLogout = () => {
        localStorage.clear();

        setCartCount(0); // 🔥 IMPORTANT

        window.dispatchEvent(new Event("authChanged"));
        window.dispatchEvent(new Event("cartUpdated"));

        navigate('/');
    };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-important rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-black/20">
              G
            </div>
            <span className="text-xl font-bold text-important hidden sm:block">
                GoMarket
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-main-text hover:text-important font-medium transition-colors">Accueil</Link>
            <Link to="/products" className="text-main-text hover:text-important font-medium transition-colors">Boutique</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-main-text hover:bg-main-bg rounded-full transition-colors"
            >
              <Search size={20} />
            </button>



            <Link to="/cart" className="p-2 text-main-text hover:bg-main-bg rounded-full transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-important text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:block h-8 w-px bg-gray-200 mx-1"></div>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-main-bg text-important rounded-full flex items-center justify-center font-bold">
                    {user?.firstname?.charAt(0).toUpperCase() + "" + user?.lastname?.charAt(0).toUpperCase()|| 'U'}
                  </div>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold truncate text-important">{user?.firstname +" "+ user?.lastname || 'Utilisateur'}</p>
                    <p className="text-xs text-main-text truncate">{user?.email}</p>
                  </div>
                    {user?.role?.toUpperCase() === 'CUSTOMER' && (
                        <Link
                            to="/my-orders"
                            className="block px-4 py-2 text-sm text-main-text hover:bg-gray-50"
                        >
                            Mes Commandes
                        </Link>
                    )}
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-main-text hover:bg-gray-50"
                    >
                        Mon Profile
                    </Link>
                    {user?.role?.toUpperCase() === 'ADMIN' && (
                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-main-text hover:bg-gray-50 border-t border-gray-100 mt-1 pt-2">
                            <LayoutDashboard size={14} /> Admin Dashboard
                        </Link>
                    )}

                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" /> Deconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-6 hidden sm:flex">
                Connexion
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-main-text hover:bg-main-bg rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-20 animate-fade-in">
          <div className="container-custom flex flex-col space-y-6">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold border-b border-gray-100 pb-4 text-important">Accueil</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold border-b border-gray-100 pb-4 text-important">Boutique</Link>
            {isAuthenticated && (
              <Link to="/my-orders" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold border-b border-gray-100 pb-4 text-important">Mes Commandes</Link>
            )}
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold border-b border-gray-100 pb-4 text-important flex items-center gap-3"><LayoutDashboard size={24} />Admin</Link>
            {!isAuthenticated && (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn-primary py-4 text-xl">Se connecter</Link>
            )}
            {isAuthenticated && (
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="btn-secondary py-4 text-xl text-red-600 border-red-100"
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 shadow-xl animate-slide-up">
          <div className="container-custom relative">
            <form onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              const input = target.elements.namedItem('search') as HTMLInputElement;
              navigate(`/products?search=${input.value}`);
              setIsSearchOpen(false);
            }}>
              <input
                name="search"
                autoFocus
                type="text"
                placeholder="Rechercher un produit..."
                className="input pr-12 text-lg"
              />
              <button type="submit" className="absolute right-8 top-1/2 -translate-y-1/2 text-main-text">
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
