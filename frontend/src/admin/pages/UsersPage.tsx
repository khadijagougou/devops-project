import React, { useState } from 'react';
import Modal from '../components/Modal';
import { DeleteConfirm } from '../components/FormComponents';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { useUsers } from '../hooks/useUsers';
import { User, UserFormData } from '../../types';

const UsersPage: React.FC = () => {
  const { users, loading, updateUser, deleteUser } = useUsers();
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [target, setTarget] = useState<User | null>(null);

  const openEdit = (u: User) => {
    setEditing(u);
    setFormOpen(true);
  };
  const openDel = (u: User) => {
    setTarget(u);
    setDelOpen(true);
  };

  const handleSubmit = async (data: UserFormData) => {
    if (editing) {
      await updateUser(editing.id, data);
    }
    setFormOpen(false);
  };

  const handleDelete = async () => {
    if (target) {
      await deleteUser(target.id);
    }
    setDelOpen(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-black">Utilisateurs</h2>
          <p className="text-white/30 text-sm mt-0.5">{users.length} utilisateur(s)</p>
        </div>
      </div>

      <UserTable
        users={users}
        search={search}
        onSearch={setSearch}
        onEdit={openEdit}
        onDelete={openDel}
      />

      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title="Modifier l'utilisateur" size="sm">
        <UserForm initial={editing} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <Modal isOpen={delOpen} onClose={() => setDelOpen(false)} title="Supprimer l'utilisateur" size="sm">
        <DeleteConfirm
          onConfirm={handleDelete}
          onCancel={() => setDelOpen(false)}
          message={`Voulez-vous vraiment supprimer "${target?.firstname}" ? Cette action est irréversible.`}
        />
      </Modal>
    </div>
  );
};

export default UsersPage;
