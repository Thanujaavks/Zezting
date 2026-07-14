import { useState } from 'react';

export default function AdminProfileForm() {
  const [firstName, setFirstName] = useState('Super');
  const [lastName, setLastName] = useState('Admin');
  const [email, setEmail] = useState('superadmin@gmail.com');
  const [password, setPassword] = useState('nvbsdh678898');

  return (
    <div className="panel settings-panel">
      <span className="settings-section-title">Profile picture</span>

      <div className="settings-avatar-row">
        <span className="settings-avatar">SA</span>
        <button type="button" className="btn-change-picture">
          Change picture
        </button>
        <button type="button" className="btn-delete-picture">
          Delete picture
        </button>
      </div>

      <span className="settings-section-title">Login info</span>

      <div className="settings-field-grid">
        <label className="settings-field">
          <span className="settings-label">First name</span>
          <input
            type="text"
            className="settings-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="settings-field">
          <span className="settings-label">Last name</span>
          <input
            type="text"
            className="settings-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      <label className="settings-field">
        <span className="settings-label">Login email</span>
        <input
          type="email"
          className="settings-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="settings-field">
        <span className="settings-label">Password</span>
        <div className="settings-password-row">
          <input
            type="text"
            className="settings-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="btn-change-password">
            Change password
          </button>
        </div>
      </label>
    </div>
  );
}
