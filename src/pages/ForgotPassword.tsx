import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify-otp', { state: { email } });
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your registered admin email to receive a verification code."
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div className="auth-field" style={{ marginBottom: 32 }}>
          <label className="auth-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <button type="submit" className="auth-button">
          Send Verification Code
        </button>
      </form>
    </AuthLayout>
  );
}
