"use client";

import { useState } from 'react';
import { validateAuth } from '../lib/auth-validation';

const input = 'mt-2 block h-12 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10';

export default function AuthForm({ register, accountType, onAccountTypeChange, busy, message, onSubmit, onToggle }) {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmationTouched, setConfirmationTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const mismatch = register && confirmationTouched && confirmation !== password;

  function submit(event) {
    const validation = validateAuth(Object.fromEntries(new FormData(event.currentTarget)), register);
    setErrors(validation);
    if (Object.keys(validation).length) {
      event.preventDefault();
      const control = event.currentTarget.elements.namedItem(Object.keys(validation)[0]);
      if (control?.focus) control.focus();
      return;
    }
    if (register && password !== confirmation) {
      event.preventDefault();
      setConfirmationTouched(true);
      event.currentTarget.elements.confirmPassword.focus();
      return;
    }
    onSubmit(event);
  }

  return <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101217] shadow-2xl shadow-black/40 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
    <aside className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#142447] via-[#111b30] to-[#101217] p-8 sm:p-10 lg:flex lg:flex-col lg:justify-between lg:border-b-0 lg:border-r lg:p-12">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-accent-blue/15 blur-3xl" />
      <div className="relative">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-blue/25 bg-accent-blue/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-300"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Made for collaboration</div>
        <h2 className="max-w-sm text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Great content.<br /><span className="text-accent-blue">Better connections.</span></h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">Your next creative chapter starts here. Bring your ideas, build your profile, and find your place on Spacebar.</p>
      </div>
      <div className="relative mt-10 hidden space-y-5 lg:block">
        {['A space for creators and brands', 'Your work, all in one portfolio', 'Connections that start with your story'].map((text, i) => <div key={text} className="flex items-center gap-3 text-sm text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-blue-300">0{i + 1}</span>{text}</div>)}
        <p className="pt-10 text-xs text-slate-500">Create. Connect. Grow.</p>
      </div>
    </aside>

    <div className="p-6 sm:p-10 lg:p-12">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-accent-blue">{register ? 'Join Spacebar' : 'Welcome back'}</p>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{register ? 'Create your account' : 'Log in to your account'}</h1>
      <p className="mb-7 mt-3 text-sm leading-6 text-slate-400">{register ? 'A little about you. A whole world of possibilities.' : 'Pick up where you left off.'}</p>
      {message && <p role="status" className="mb-5 rounded-xl border border-blue-400/30 bg-blue-400/10 p-4 text-sm leading-6 text-blue-100">{message}</p>}

      <form noValidate onSubmit={submit} onBlur={event => {
        const form = event.currentTarget;
        const name = event.target.name;
        if (!name) return;
        const validation = validateAuth(Object.fromEntries(new FormData(form)), register);
        setErrors(previous => ({ ...previous, [name]: validation[name] }));
      }} onInput={event => {
        const validation = validateAuth(Object.fromEntries(new FormData(event.currentTarget)), register);
        setErrors(previous => Object.fromEntries(Object.keys(previous).map(name => [name, validation[name]])));
      }} className="space-y-5" aria-label={register ? 'Create account' : 'Log in'}>
        {Object.values(errors).some(Boolean) && <div role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200"><p className="font-medium">Please check your details:</p><ul className="mt-2 list-disc space-y-1 pl-5">{Object.entries(errors).filter(([, error]) => error).map(([name, error]) => <li key={name}>{error}</li>)}</ul></div>}
        <fieldset disabled={busy} className="space-y-5 disabled:opacity-60">
          {register && <>
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-slate-200">I am joining as a</legend>
              <div className="grid grid-cols-2 gap-3">
                {[{ value: 'creator', label: 'Creator', detail: 'Showcase my work' }, { value: 'business', label: 'Brand', detail: 'Discover creators' }].map(option => <label key={option.value} className={`relative cursor-pointer rounded-xl border p-4 transition hover:border-blue-400/60 ${accountType === option.value ? 'border-accent-blue bg-accent-blue/10' : 'border-white/10 bg-white/[0.02]'}`}>
                  <input className="peer sr-only" type="radio" name="accountType" value={option.value} checked={accountType === option.value} onChange={() => onAccountTypeChange(option.value)} />
                  <span className="absolute inset-0 rounded-xl peer-focus-visible:ring-2 peer-focus-visible:ring-blue-300 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#101217]" />
                  <span className="flex items-center justify-between text-sm font-semibold">{option.label}<span aria-hidden="true" className={`h-3 w-3 rounded-full border ${accountType === option.value ? 'border-accent-blue bg-accent-blue ring-4 ring-accent-blue/15' : 'border-slate-600'}`} /></span>
                  <span className="mt-1.5 block text-xs text-slate-400">{option.detail}</span>
                </label>)}
              </div>
            </fieldset>
            <label className="block text-sm font-medium text-slate-200">{accountType === 'business' ? 'Organization name' : 'Full name'}<input className={input} name="name" required maxLength={120} autoComplete={accountType === 'business' ? 'organization' : 'name'} placeholder={accountType === 'business' ? 'Your organization name' : 'Your full name'} /></label>
          </>}
          <label className="block text-sm font-medium text-slate-200">Email address<input className={input} name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
          <div>
            <div className="flex items-center justify-between"><label htmlFor="account-password" className="text-sm font-medium text-slate-200">Password</label><button type="button" onClick={() => setShowPassword(!showPassword)} aria-pressed={showPassword} className="text-xs font-medium text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400">{showPassword ? 'Hide passwords' : 'Show passwords'}</button></div>
            <input id="account-password" className={input} name="password" type={showPassword ? 'text' : 'password'} minLength={register ? 8 : undefined} required autoComplete={register ? 'new-password' : 'current-password'} value={password} onChange={event => setPassword(event.target.value)} placeholder={register ? 'Create a password' : 'Enter your password'} aria-describedby={register ? 'password-help' : undefined} />
            {register && <p id="password-help" className="mt-2 text-xs text-slate-500">Use 8–128 characters. Spaces alone are not allowed.</p>}
          </div>
          {register && <label className="block text-sm font-medium text-slate-200">Confirm password
            <input className={`${input} ${mismatch ? 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/10' : ''}`} name="confirmPassword" type={showPassword ? 'text' : 'password'} required minLength={8} autoComplete="new-password" value={confirmation} onChange={event => setConfirmation(event.target.value)} onBlur={() => setConfirmationTouched(true)} placeholder="Re-enter your password" aria-invalid={mismatch} aria-describedby={mismatch ? 'password-match-error' : undefined} />
            {mismatch && <span id="password-match-error" role="alert" className="mt-2 block text-xs text-rose-300">Passwords do not match.</span>}
          </label>}
          <button className="mt-1 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-accent-blue text-sm font-semibold text-white shadow-lg shadow-accent-blue/15 transition hover:bg-accent-blue-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 disabled:cursor-wait" disabled={busy}>{busy ? 'Please wait…' : register ? 'Create account' : 'Log in'}{!busy && <span aria-hidden="true">→</span>}</button>
        </fieldset>
      </form>
      <p className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-slate-400">{register ? 'Already have an account?' : 'New to Spacebar?'}{' '}<button type="button" className="font-semibold text-accent-blue hover:text-blue-300" disabled={busy} onClick={() => { setErrors({}); setPassword(''); setConfirmation(''); setConfirmationTouched(false); setShowPassword(false); onToggle(); }}>{register ? 'Log in' : 'Create an account'}</button></p>
    </div>
  </div>;
}
