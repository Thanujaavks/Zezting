import { useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const OTP_LENGTH = 6;

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email || 'admin@email.com';

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle={
        <>
          We sent a 6-digit code to
          <br />
          {email}
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div className="auth-otp-row">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              className="auth-otp-input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        <p className="auth-otp-hint">
          Didn&apos;t receive code?{' '}
          <button
            type="button"
            className="auth-link-accent"
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Resend code
          </button>
        </p>

        <button type="submit" className="auth-button">
          Verify
        </button>
      </form>
    </AuthLayout>
  );
}
