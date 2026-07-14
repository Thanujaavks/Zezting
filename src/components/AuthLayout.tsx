import type { ReactNode } from 'react';
import logo from '../assets/logo.svg';
import '../styles/auth.css';

interface AuthLayoutProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="Zezting" className="auth-logo" />
        <h1 className="auth-heading">{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
