import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingCart, DollarSign, ArrowRight, Clock, Loader2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { useOrders } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { useUsers } from '../hooks/useUsers';
import { Order, SalesByMonth } from '../../types';

const DashboardPage: React.FC = () => {
  const { orders, loading: ordersLoading } = useOrders();
  const { products, loading: productsLoading } = useProducts();
  const { users, loading: usersLoading } = useUsers();

  const stats = useMemo(() => {
    // Total Revenue
    const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
    
    // Recent Orders (last 5)
    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.date || b.orderDate).getTime() - new Date(a.date || a.orderDate).getTime())
      .slice(0, 5);

    // Sales by month (last 6 months)
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    const now = new Date();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return {
        month: monthNames[d.getMonth()],
        revenue: 0,
        monthIndex: d.getMonth(),
        year: d.getFullYear()
      };
    });

    orders.forEach(order => {
      const orderDate = new Date(order.date || order.orderDate);
      const m = orderDate.getMonth();
      const y = orderDate.getFullYear();
      
      const monthData = last6Months.find(sm => sm.monthIndex === m && sm.year === y);
      if (monthData) {
        monthData.revenue += order.total || 0;
      }
    });

    const salesByMonth: SalesByMonth[] = last6Months.map(({ month, revenue }) => ({ month, revenue }));

    // Quick Overview Stats
    const activeProducts = products.length; // Simplified
    const deliveredOrders = orders.filter(o => o.orderStatus === 'DELIVERED').length;
    const activeUsers = users.length; // Simplified
    const lowStockProducts = products.filter(p => p.quantity < 5).length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalUsers: users.length,
      recentOrders,
      salesByMonth,
      quickOverview: [
        { label: 'Produits actifs', value: `${activeProducts} / ${products.length}`, pct: products.length > 0 ? (activeProducts / products.length) * 100 : 0, color: '#10b981' },
        { label: 'Commandes livrées', value: `${deliveredOrders} / ${orders.length}`, pct: orders.length > 0 ? (deliveredOrders / orders.length) * 100 : 0, color: '#6366f1' },
        { label: 'Utilisateurs enregistrés', value: `${activeUsers}`, pct: 100, color: '#f59e0b' },
        { label: 'Stock faible (< 5)', value: `${lowStockProducts} produits`, pct: products.length > 0 ? (lowStockProducts / products.length) * 100 : 0, color: '#ef4444' },
      ]
    };
  }, [orders, products, users]);

  const maxRevenue = Math.max(...stats.salesByMonth.map(m => m.revenue), 1);

  if (ordersLoading || productsLoading || usersLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-white/40 animate-pulse">Chargement des données du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="space-y-7 animate-fadeIn">
      <div>
        <h2 className="text-white text-2xl font-black">Bonjour, Admin</h2>
        <p className="text-white/30 text-sm mt-1">Voici un aperçu de votre boutique aujourd'hui.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Revenus"
          value={`${stats.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`}
          change={0} // Logic for change could be added if comparison data exists
          icon={DollarSign}
          color="#10b981"
        />
        <StatCard label="Commandes" value={stats.totalOrders} change={0} icon={ShoppingCart} color="#6366f1" />
        <StatCard label="Produits" value={stats.totalProducts} change={0} icon={Package} color="#f59e0b" />
        <StatCard label="Utilisateurs" value={stats.totalUsers} change={0} icon={Users} color="#ec4899" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-[#141414] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-sm">Revenus mensuels</h3>
              <p className="text-white/30 text-xs mt-0.5">6 derniers mois</p>
            </div>
          </div>
          <div className="flex items-end gap-3 h-40">
            {stats.salesByMonth.map((m, i) => {
              const heightPct = Math.round((m.revenue / maxRevenue) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-white/0 group-hover:text-white/60 text-[10px] font-medium transition-all">
                    {m.revenue.toLocaleString()}€
                  </span>
                  <div className="w-full relative flex items-end" style={{ height: '100px' }}>
                    <div
                      className="w-full rounded-t-lg bg-white/10 group-hover:bg-white/20 transition-all duration-500 relative overflow-hidden"
                      style={{ height: `${heightPct}%` }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-white/30 to-white/5 rounded-t-lg"
                        style={{ height: '100%' }}
                      />
                    </div>
                  </div>
                  <span className="text-white/30 text-[10px] font-medium">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-5">
          <h3 className="text-white font-bold text-sm">Aperçu rapide</h3>
          {stats.quickOverview.map(({ label, value, pct, color }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/40 text-xs">{label}</span>
                <span className="text-white text-xs font-semibold">{value}</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#141414] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h3 className="text-white font-bold text-sm">Commandes récentes</h3>
          <Link
            to="/admin/orders"
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-medium transition-colors"
          >
            Voir tout <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {['ID', 'Client', 'Date', 'Total', 'Statut'].map(col => (
                  <th
                    key={col}
                    className="text-left text-white/25 text-xs font-semibold uppercase tracking-widest px-6 py-3"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {stats.recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-3 text-white/60 font-mono text-xs">#{order.orderNumber || order.id}</td>
                  <td className="px-6 py-3 text-white text-xs font-medium">Client #{order.userId}</td>
                  <td className="px-6 py-3 text-white/40 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {order.date || new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-white text-xs font-semibold">
                    {order.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="px-6 py-3"><StatusBadge status={order.orderStatus} /></td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-white/20 italic">
                    Aucune commande récente.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
