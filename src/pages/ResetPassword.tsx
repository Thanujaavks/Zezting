import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import PasswordField from '../components/PasswordField';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <AuthLayout title="Create New Password">
      <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 8 }}>
        <PasswordField label="New Password" value={password} onChange={setPassword} />
        <PasswordField label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />

        <label className="auth-remember" style={{ marginBottom: 28 }}>
          <input
            type="checkbox"
            className="auth-checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        <button type="submit" className="auth-button">
          Update Password &amp; Login Again
        </button>
      </form>
    </AuthLayout>
  );
}
