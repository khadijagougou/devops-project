import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ShoppingBag, Clock, ChevronDown, ChevronUp, Package, AlertCircle} from 'lucide-react';
import {useAppSelector} from '../../store/hooks';
import {orderService} from '../../admin/services/orderService';
import {Order, OrderStatus, User} from '../../types';

// ─── Status display config ─────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; cls: string }> = {
    PENDING: {label: 'En attente', cls: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'},
    PROCESSING: {label: 'En cours', cls: 'bg-blue-500/10 text-blue-400 border border-blue-500/20'},
    SHIPPED: {label: 'Expédié', cls: 'bg-violet-500/10 text-violet-400 border border-violet-500/20'},
    DELIVERED: {label: 'Livré', cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'},
    CANCELLED: {label: 'Annulé', cls: 'bg-red-500/10 text-red-400 border border-red-500/20'},
};

const getStatusCfg = (s: string) =>
    STATUS_CFG[s?.toLowerCase()] ?? {label: s, cls: 'bg-white/10 text-white/40 border border-white/10'};

const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString('fr-FR', {day: '2-digit', month: 'long', year: 'numeric'});

const fmtPrice = (n: number) =>
    n?.toLocaleString('fr-FR', {style: 'currency', currency: 'USD'}) ?? '—';

// ─── Progress stepper ─────────────────────────────────────────────────────────
const STEPS: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const OrderStepper: React.FC<{ status: string }> = ({status}) => {
    const idx = STEPS.indexOf(status as OrderStatus);

    if (status === 'cancelled') {
        return (
            <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
                <AlertCircle size={14}/> Commande annulée
            </div>
        );
    }
    return (
        <div className="flex items-center gap-1.5">
            {STEPS.map((step, i) => (
                <React.Fragment key={step}>
                    <div className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                        i <= idx ? 'text-white' : 'text-white/20'
                    }`}>
                        <div className={`w-2 h-2 rounded-full transition-colors ${
                            i < idx ? 'bg-emerald-400' : i === idx ? 'bg-white' : 'bg-white/20'
                        }`}/>
                        <span className="hidden sm:block">
              {STATUS_CFG[step]?.label ?? step}
            </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`h-px flex-1 min-w-[16px] max-w-[32px] transition-colors ${
                            i < idx ? 'bg-emerald-400/50' : 'bg-white/10'
                        }`}/>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// ─── Single order card ────────────────────────────────────────────────────────
const OrderCard: React.FC<{ order: Order }> = ({order}) => {
    const [expanded, setExpanded] = useState(false);
    const cfg = getStatusCfg(order.orderStatus);
    const itemCount = order.orderItemDtos?.length ?? 0;

    return (
        <motion.div
            layout
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            className="bg-[#141414] border border-white/[0.07] rounded-2xl overflow-hidden"
        >
            {/* Card header */}
            <button
                onClick={() => setExpanded(e => !e)}
                className="w-full text-left px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                        <ShoppingBag size={16} className="text-white/50"/>
                    </div>
                    <div className="min-w-0">
                        <p className="text-white text-sm font-bold truncate">
                            Commande #{order.orderNumber ?? order.id}
                        </p>
                        <p className="text-white/30 text-xs flex items-center gap-1 mt-0.5">
                            <Clock size={10}/>
                            {fmtDate(order.orderDate ?? order.date)}
                            <span className="mx-1">·</span>
                            {itemCount} article{itemCount > 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:ml-auto">
          <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold shrink-0 ${cfg.cls}`}>
            {cfg.label}
          </span>
                    <span className="text-white font-bold text-sm shrink-0">
            {fmtPrice(order.total)}
          </span>
                    {expanded
                        ? <ChevronUp size={15} className="text-white/30 shrink-0"/>
                        : <ChevronDown size={15} className="text-white/30 shrink-0"/>
                    }
                </div>
            </button>

            {/* Expanded details */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.22}}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-white/[0.06] px-5 py-4 space-y-4">
                            {/* Progress */}
                            <div>
                                <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-2">
                                    Progression
                                </p>
                                <OrderStepper status={order.orderStatus}/>
                            </div>

                            {/* Items */}
                            {itemCount > 0 && (
                                <div>
                                    <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-2">
                                        Articles commandés
                                    </p>
                                    <div className="space-y-2">
                                        {order.orderItemDtos.map((item, i) => (
                                            <div
                                                key={item.id ?? i}
                                                className="flex items-center justify-between bg-white/[0.03] rounded-xl px-4 py-2.5"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <div
                                                        className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
                                                        <Package size={12} className="text-white/40"/>
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-xs font-semibold">
                                                            Produit #{item.productId}
                                                        </p>
                                                        <p className="text-white/30 text-xs">
                                                            Qté: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="text-white/70 text-xs font-semibold">
                          {fmtPrice(item.unitPrice * item.quantity)}
                        </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Total row */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                                <span className="text-white/40 text-sm">Total</span>
                                <span className="text-white font-black text-base">{fmtPrice(order.total)}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const MyOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const stored = localStorage.getItem('user');

        if (stored) {
            const parsedUser = JSON.parse(stored);

            setUser(parsedUser);

            if (!parsedUser.id) return;

            setLoading(true);

            orderService
                .getByUserId(parsedUser.id)
                .then(data => setOrders(Array.isArray(data) ? data : [data]))
                .catch(() => setError('Impossible de charger vos commandes.'))
                .finally(() => setLoading(false));
        }
    }, []);
    const filtered = filter
        ? orders.filter(o => o.orderStatus?.toLowerCase() === filter)
        : orders;

    const statuses = [...new Set(orders.map(o => o.orderStatus))].filter(Boolean);

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-10 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Page header */}
                <motion.div
                    initial={{opacity: 0, y: -12}}
                    animate={{opacity: 1, y: 0}}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                            <ShoppingBag size={17} className="text-white"/>
                        </div>
                        <h1 className="text-white text-2xl font-black">Mes commandes</h1>
                    </div>
                    <p className="text-white/30 text-sm ml-12">
                        {orders.length} commande{orders.length !== 1 ? 's' : ''} au total
                    </p>
                </motion.div>

                {/* Status filter chips */}
                {statuses.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button
                            onClick={() => setFilter('')}
                            className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                                !filter
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/[0.04] text-white/50 border-white/[0.08] hover:border-white/20'
                            }`}
                        >
                            Toutes ({orders.length})
                        </button>
                        {statuses.map(s => (
                            <button
                                key={s}
                                onClick={() => setFilter(s === filter ? '' : s)}
                                className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                                    filter === s
                                        ? 'bg-white text-black border-white'
                                        : 'bg-white/[0.04] text-white/50 border-white/[0.08] hover:border-white/20'
                                }`}
                            >
                                {getStatusCfg(s).label} ({orders.filter(o => o.orderStatus === s).length})
                            </button>
                        ))}
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"/>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <AlertCircle size={36} className="text-red-400 mb-3"/>
                        <p className="text-white/60 text-sm">{error}</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                            <ShoppingBag size={28} className="text-white/20"/>
                        </div>
                        <p className="text-white/50 font-semibold text-sm">Aucune commande trouvée</p>
                        <p className="text-white/20 text-xs mt-1">
                            {filter ? 'Essayez un autre filtre' : 'Vous n\'avez pas encore passé de commande'}
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map(order => (
                            <OrderCard key={order.id ?? order.orderNumber} order={order}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;
