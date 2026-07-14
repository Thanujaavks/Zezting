import { Check, X } from 'lucide-react';

interface PermissionRow {
  action: string;
  superadmin: boolean;
  admin: boolean;
}

const PERMISSIONS: PermissionRow[] = [
  { action: 'View analytics', superadmin: true, admin: false },
  { action: 'Approve host verification', superadmin: true, admin: true },
  { action: 'Suspend user/host', superadmin: true, admin: true },
  { action: 'Change rates/commission', superadmin: true, admin: false },
  { action: 'Release payouts', superadmin: true, admin: true },
  { action: 'Add/edit admins', superadmin: true, admin: false },
  { action: 'Respond to emergency', superadmin: true, admin: true },
  { action: 'View expenses', superadmin: true, admin: false },
  { action: 'District restrictions', superadmin: true, admin: false },
];

function PermissionMark({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <Check size={16} className="perm-check" />
  ) : (
    <X size={16} className="perm-cross" />
  );
}

export default function PermissionMatrix() {
  return (
    <div className="panel permission-panel">
      <div className="panel-head">
        <span className="panel-title">Permission Matrix</span>
      </div>

      <div className="permission-table">
        <div className="permission-row permission-head-row">
          <span>Action</span>
          <span>Superadmin</span>
          <span>Admin</span>
        </div>

        {PERMISSIONS.map((perm) => (
          <div className="permission-row" key={perm.action}>
            <span className="permission-action">{perm.action}</span>
            <span className="permission-mark">
              <PermissionMark allowed={perm.superadmin} />
            </span>
            <span className="permission-mark">
              <PermissionMark allowed={perm.admin} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
