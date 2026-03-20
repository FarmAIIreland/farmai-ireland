'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLogin() {
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/dashboard-auth', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError('Incorrect password.');
      }
    } catch {
      setError('Something went wrong — try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ui-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-ui-text mb-1">FarmAI Dashboard</h1>
        <p className="text-sm text-ui-muted mb-8">Private — authorised access only</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            id="dashboard-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoFocus
            className="w-full px-4 py-3 border border-ui-border rounded-button text-sm focus:outline-none focus:border-brand-green bg-white text-ui-text"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green text-white font-semibold py-3 rounded-button text-sm hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
