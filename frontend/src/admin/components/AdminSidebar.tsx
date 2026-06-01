import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, Users, ShoppingCart, X, LogOut, ChevronRight, Zap, Ticket } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  end?: boolean;
}

const navItems: NavItem[] = [
  { to: '/admin',            label: 'Dashboard',    icon: LayoutDashboard, end: true },
  { to: '/admin/products',   label: 'Produits',     icon: Package },
  { to: '/admin/categories', label: 'Catégories',   icon: Tag },
  { to: '/admin/users',      label: 'Utilisateurs', icon: Users },
  { to: '/admin/orders',     label: 'Commandes',    icon: ShoppingCart },
  { to: '/admin/coupons',    label: 'Coupons',      icon: Ticket },
  { to: '/admin/profile',    label: 'Mon Profil',   icon: Users },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-50
        bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Zap size={16} className="text-black" />
            </div>
            <div>
              <p className="text-white font-black text-sm tracking-tight">GoMarket</p>
              <p className="text-white/30 text-[10px] font-medium tracking-widest uppercase">Admin</p>
            </div>
          </button>
          <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest px-3 mb-4">Navigation</p>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                 ${isActive ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white hover:bg-white/[0.06]'}`
              }>
              {({ isActive }) => (
                <>
                  <Icon size={17} />
                  <span>{label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto text-black/50" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/[0.06] transition-all w-full">
            <LogOut size={16} />
            <span>Retour au site</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
