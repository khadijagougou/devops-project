import React from 'react';
import {OrderStatus, PaymentStatus, UserRole, UserStatus} from '../../types';

type BadgeKey = OrderStatus | UserRole | UserStatus | PaymentStatus;

interface StatusConfig {
    label: string;
    color: string;
}

export const statusConfig: Record<BadgeKey, StatusConfig> = {
    PENDING: {label: 'En attente', color: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20'},
    PROCESSING: {label: 'En cours', color: 'bg-blue-500/15 text-blue-400 border border-blue-500/20'},
    SHIPPED: {label: 'Expédié', color: 'bg-purple-500/15 text-purple-400 border border-purple-500/20'},
    DELIVERED: {label: 'Livré', color: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'},
    CANCELLED: {label: 'Annulé', color: 'bg-red-500/15 text-red-400 border border-red-500/20'},
    active: {label: 'Actif', color: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'},
    inactive: {label: 'Inactif', color: 'bg-white/10 text-white/40 border border-white/10'},
    blocked: {label: 'Bloqué', color: 'bg-red-500/15 text-red-400 border border-red-500/20'},
    ADMIN: {label: 'Admin', color: 'bg-violet-500/15 text-violet-400 border border-violet-500/20'},
    CUSTOMER: {label: 'Client', color: 'bg-white/10 text-white/50 border border-white/10'},
    PAID:{label:'Payée',color: 'bg-white/10 text-white/50 border border-white/10'},
    FAILED:{label:'Echouée', color: 'bg-red-500/15 text-red-400 border border-red-500/20'}
};

interface Props {
    status: BadgeKey;
}

const StatusBadge: React.FC<Props> = ({status}) => {
    const cfg = statusConfig[status] ?? {label: status, color: 'bg-white/10 text-white/40 border border-white/10'};
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${cfg.color}`}>
      {cfg.label}
    </span>
    );
};

export default StatusBadge;
