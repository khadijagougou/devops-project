import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  color?: string;
}

const StatCard: React.FC<Props> = ({ label, value, change, icon: Icon, color = '#ffffff' }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg
          ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="text-white/40 text-xs font-medium tracking-wider uppercase mb-1">{label}</p>
      <p className="text-white text-2xl font-black">{value}</p>
    </div>
  );
};

export default StatCard;
