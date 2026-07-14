import { useState } from 'react';
import { Plus } from 'lucide-react';
import AdminRoster from '../components/dashboard/AdminRoster';
import PermissionMatrix from '../components/dashboard/PermissionMatrix';
import AddAdminModal from '../components/dashboard/AddAdminModal';

export default function AdminManagement() {
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  return (
    <>
      <div className="admin-page-head">
        <span className="admin-page-title">Admin roster</span>
        <button type="button" className="btn-solid-pink" onClick={() => setShowAddAdmin(true)}>
          <Plus size={15} />
          Add Admin
        </button>
      </div>

      <div className="admin-cols">
        <AdminRoster />
        <PermissionMatrix />
      </div>

      {showAddAdmin && <AddAdminModal onClose={() => setShowAddAdmin(false)} />}
    </>
  );
}
