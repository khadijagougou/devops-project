import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar  from '../components/AdminNavbar';

const pageTitles: Record<string, string> = {
  '/admin':            'Dashboard',
  '/admin/products':   'Gestion des Produits',
  '/admin/categories': 'Gestion des Catégories',
  '/admin/users':      'Gestion des Utilisateurs',
  '/admin/orders':     'Gestion des Commandes',
  '/admin/coupons':    'Gestion des Coupons',
  '/admin/profile':    'Mon Profil',
};

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'Admin';

  return (
    <div className="flex h-screen bg-[#0d0d0d] overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar title={title} onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
