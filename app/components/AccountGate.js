"use client";
import { useEffect, useState } from 'react';
import { currentUser } from '../lib/api';
import { useRouter } from 'next/navigation';
export default function AccountGate({ role, children }) {
  const router = useRouter();
  const [state, setState] = useState({ loading: true });
  useEffect(() => {
    let active = true;
    const signup = () => router.replace(`/account?mode=signup&type=${role}&next=${encodeURIComponent(role === 'business' ? '/onboarding/brand' : '/onboarding/creator')}`);
    currentUser().then(user => {
      if (!active) return;
      if (!user || user.role !== role) { signup(); return; }
      setState({ user });
    }).catch(() => { if (active) signup(); });
    return () => { active = false; };
  }, [role, router]);
  if (state.loading) return <main className="min-h-screen bg-black text-white p-12">Loading your account…</main>;
  return children;
}
