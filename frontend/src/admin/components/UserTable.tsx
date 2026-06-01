import React from 'react';
import {Eye, Pencil, Trash2} from 'lucide-react';
import AdminTable, {SearchBar} from '../components/AdminTable';
import StatusBadge from '../components/StatusBadge';
import {User} from '../../types';

interface Props {
    users: User[];
    search: string;
    onSearch: (v: string) => void;
    onEdit: (u: User) => void;
    onDelete: (u: User) => void;
}

const AVATAR_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6'];

const columns = [
    {key: 'avatar', label: '', width: '56px'},
    {key: 'firstname', label: 'Prénom'},
    {key: 'lastname', label: 'Nom'},
    {key: 'email', label: 'Email'},
    {key: 'address', label: 'Adresse'},
    {key: 'ville', label: 'Ville'},
    {key: 'codePostal', label: 'Code Postal'},
    {key: 'role', label: 'Rôle'},
    {key: 'actions', label: '', width: '90px'},
];

const UserTable: React.FC<Props> = ({users, search, onSearch, onEdit, onDelete}) => {
    const filtered = users.filter(u =>
        u.firstname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.lastname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <SearchBar value={search} onChange={onSearch} placeholder="Rechercher un utilisateur..."/>
            <AdminTable<User>
                columns={columns}
                data={filtered}
                emptyMessage="Aucun utilisateur trouvé."
                renderRow={(u, i) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-5 py-3.5">
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                                style={{
                                    backgroundColor: `${AVATAR_COLORS[i % AVATAR_COLORS.length]}30`,
                                    color: AVATAR_COLORS[i % AVATAR_COLORS.length],
                                }}
                            >
                                {u.firstname.charAt(0).toUpperCase() + "" + u.lastname.charAt(0).toUpperCase()}
                            </div>
                        </td>
                        <td className="px-5 py-3.5">
                            <p className="text-white text-sm font-semibold">{u.firstname}</p>
                        </td>
                        <td className="px-5 py-3.5">
                            <p className="text-white text-sm font-semibold">{u.lastname}</p>
                        </td>
                        <td className="px-5 py-3.5">
                            <p className="text-white text-sm font-semibold">{u.firstname + " " + u.lastname}</p>
                            <p className="text-white/30 text-xs mt-0.5">{u.email}</p>
                        </td>
                        <td className="px-5 py-3.5">
                            <p className="text-white text-sm font-semibold">{u.address}</p>
                        </td>
                        <td className="px-5 py-3.5">
                            <p className="text-white text-sm font-semibold">{u.ville}</p>
                        </td>
                        <td className="px-5 py-3.5">
                            <p className="text-white text-sm font-semibold">{u.codePostal}</p>
                        </td>
                        <td className="px-5 py-3.5"><StatusBadge status={u.role}/></td>

                        <td className="px-5 py-3.5">
                            <div
                                className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit(u)}
                                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                                >
                                    <Eye size={13}/>
                                </button>

                            </div>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

export default UserTable;
