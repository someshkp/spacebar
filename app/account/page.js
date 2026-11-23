"use client";
import { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AuthForm from '../components/AuthForm';
import { api, saveSession, clearSession, currentUser, dashboardPath } from '../lib/api';

const field = 'block w-full rounded-xl bg-white/10 border border-white/20 p-3 mb-4';
const button = 'rounded-xl bg-blue-600 px-5 py-3 disabled:opacity-50';

const profileFields = {
  creator: ['name', 'email', 'mobile', 'whatsapp', 'socials', 'followers', 'niche', 'equipment'],
  business: ['brandName', 'website', 'category', 'email', 'phone', 'whatsapp', 'address', 'city', 'state', 'pin', 'productName', 'productDetails', 'goal', 'budget'],
};

function ProfileCompletion({ role, profile }) {
  const fields = profileFields[role];
  if (!Array.isArray(fields)) return null;

  const hasText = value => typeof value === 'string' && Boolean(value.trim());
  const filled = fields.filter(field => {
    const value = profile?.[field];
    if (field !== 'socials') return hasText(value);
    return Array.isArray(value) && value.length > 0 && value.every(social => hasText(social?.handle));
  }).length;
  const percent = Math.round(filled / fields.length * 100);
  const complete = filled === fields.length;

  return (
    <section className="space-y-3 rounded-2xl border border-white/15 bg-white/5 p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 id="profile-completion" className="font-semibold">Profile completion</h2>
        <span aria-hidden="true" className={complete ? 'font-semibold text-emerald-400' : 'font-semibold text-blue-300'}>{percent}%</span>
      </div>
      <progress
        aria-labelledby="profile-completion"
        value={percent}
        max={100}
        className={`block h-2.5 w-full appearance-none overflow-hidden rounded-full bg-white/10 [&::-webkit-progress-bar]:bg-transparent ${complete ? '[&::-webkit-progress-value]:bg-emerald-400 [&::-moz-progress-bar]:bg-emerald-400' : '[&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500'}`}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="text-white/70">{complete ? 'Profile complete' : `${filled} of ${fields.length} required details saved`}</p>
        <a className="text-blue-300 underline underline-offset-4" href={`/onboarding/${role === 'business' ? 'brand' : 'creator'}`}>
          {complete ? 'Edit profile' : 'Complete your profile'}
        </a>
      </div>
    </section>
  );
}

export default function AccountPage({ dashboardRole } = {}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [register, setRegister] = useState(false);
  const [accountType, setAccountType] = useState('creator');
  const [nextPage, setNextPage] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [videos, setVideos] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const load = useCallback(async () => {
    const current = await currentUser();
    if (!current) {
      if (dashboardRole) window.location.replace('/account');
      return;
    }
    const target = dashboardPath(current.role);
    if (!target) {
      clearSession();
      setUser(null);
      setMessage('This session has an unsupported account role. Sign in again.');
      return;
    }
    if (target !== dashboardPath(dashboardRole || 'admin')) {
      window.location.replace(target);
      return;
    }
    setUser(current);
    if (current.role === 'creator') setVideos((await api('/portfolio')).videos);
    if (current.role === 'business') setCampaigns((await api('/campaigns')).campaigns);
  }, [dashboardRole]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRegister(params.get('mode') === 'signup');
    setAccountType(params.get('type') === 'business' ? 'business' : 'creator');
    const next = params.get('next');
    if (['/onboarding/creator', '/onboarding/brand'].includes(next)) setNextPage(next);
    load().catch(error => setMessage(error.message)).finally(() => setLoading(false));
  }, [load]);
  async function run(action) {
    setBusy(true); setMessage('');
    try { await action(); } catch (error) { setMessage(error.message); } finally { setBusy(false); }
  }
  async function authenticate(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (register && data.password !== data.confirmPassword) { setMessage('Passwords do not match.'); return; }
    await run(async () => {
      const result = await api(register ? '/auth/register' : '/auth/login', { method: 'POST', anonymous: true, body: data });
      if (result.confirmationRequired) { setMessage('Check your email to confirm your account, then sign in here.'); setRegister(false); return; }
      const current = result.user;
      if (!current) { clearSession(); throw new Error('Login response is missing your profile. Restart the updated backend and sign in again.'); }
      const target = dashboardPath(current.role);
      if (!target) { clearSession(); throw new Error('This account has an unsupported role.'); }
      saveSession(result);
      const destination = current.role === 'creator' ? '/onboarding/creator' : current.role === 'business' ? '/onboarding/brand' : '';
      if (register && nextPage && destination === nextPage) { window.location.replace(destination); return; }
      if (target !== dashboardPath(dashboardRole || 'admin')) window.location.replace(target);
      else await load();
    });
  }
  async function upload(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get('video');
    const thumbnail = data.get('thumbnail');
    await run(async () => {
      if (!file?.size || file.size > 50000000) throw new Error('Choose a video up to 50 MB.');
      if (thumbnail?.size > 5000000) throw new Error('Choose a thumbnail up to 5 MB.');
      const { video } = await api(`/portfolio?title=${encodeURIComponent(data.get('title'))}`, { method: 'POST', body: file });
      // Refresh first so a thumbnail failure still leaves the uploaded video visible.
      await load();
      if (thumbnail?.size) await api(`/portfolio/${video.id}/thumbnail`, { method: 'PUT', body: thumbnail });
      await load(); form.reset(); setMessage('Portfolio video uploaded.');
    });
  }
  return <div className="min-h-screen bg-black text-white"><Navbar /><main className={`${user ? 'max-w-3xl' : 'max-w-5xl'} mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 space-y-8`}>
    {user && <h1 className="text-3xl font-bold">{`Welcome, ${user.name}`}</h1>}
    {user && dashboardRole && <p className="text-white/60">{dashboardRole === 'business' ? 'Brand dashboard — manage your profile and campaigns.' : 'Creator dashboard — manage your profile and portfolio.'}</p>}
    {user && nextPage && user.role !== (nextPage === '/onboarding/brand' ? 'business' : 'creator') && <p role="status">You are signed in with a different account type. Sign out below to create or log in to the matching account.</p>}
    {user && message && <p role="status" className="p-4 rounded-xl border border-blue-400">{message}</p>}
    {loading ? <p>Loading…</p> : !user ? <AuthForm register={register} accountType={accountType} busy={busy} message={message} onSubmit={authenticate} onToggle={() => { setRegister(!register); setMessage(''); }} onAccountTypeChange={value => { setAccountType(value); if (nextPage) setNextPage(value === 'business' ? '/onboarding/brand' : '/onboarding/creator'); }} /> : <>
      <ProfileCompletion role={user.role} profile={user.profile} />
      <form onSubmit={event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); run(async () => { await api('/me', { method: 'PATCH', body: { profile: { ...user.profile, ...data } } }); await load(); setMessage('Profile saved.'); }); }}>
        <h2 className="text-xl mb-4">Profile details</h2>
        <label>Bio<textarea name="bio" className={field} defaultValue={user.profile.bio || ''} maxLength={2000} /></label>
        {user.role === 'creator' && <label>Rates<input name="rates" className={field} defaultValue={user.profile.rates || ''} placeholder="e.g. ₹5,000 per video" maxLength={200} /></label>}
        <button className={button} disabled={busy}>Save profile</button>
      </form>
      {user.role === 'creator' && <>
        <form onSubmit={upload}><h2 className="text-xl mb-4">Upload a portfolio video</h2>
          <label>Video title<input name="title" className={field} required maxLength={160} /></label>
          <label>Video (MP4, WebM, MOV; up to 50 MB)<input name="video" type="file" className={field} accept="video/mp4,video/webm,video/quicktime" required /></label>
          <label>Optional thumbnail (up to 5 MB)<input name="thumbnail" type="file" className={field} accept="image/jpeg,image/png,image/webp" /></label>
          <button className={button} disabled={busy}>{busy ? 'Please wait…' : 'Upload video'}</button>
        </form>
        <h2 className="text-xl">Your portfolio</h2><p>Playback links last one hour. Refresh the list if a video expires.</p><button className="underline" disabled={busy} onClick={() => run(load)}>Refresh videos</button>
        {!videos.length && <p>No videos uploaded yet.</p>}
        {videos.map(video => <article key={video.id} className="space-y-3 border border-white/20 rounded-xl p-4"><h3>{video.title}</h3><video className="w-full max-h-96" controls preload="metadata" src={video.url} poster={video.thumbnailUrl || undefined} /><button className="underline" disabled={busy} onClick={() => run(async () => { await api(`/portfolio/${video.id}`, { method: 'DELETE' }); await load(); })}>Delete video</button></article>)}
      </>}
      {user.role === 'business' && <>
        <form onSubmit={event => { event.preventDefault(); const form = event.currentTarget; const data = Object.fromEntries(new FormData(form)); run(async () => { await api('/campaigns', { method: 'POST', body: data }); await load(); form.reset(); setMessage('Campaign saved.'); }); }}>
          <h2 className="text-xl mb-4">Create a campaign</h2><label>Title<input className={field} name="title" required maxLength={160} /></label><label>Campaign details<textarea className={field} name="details" required /></label><label>Budget<input className={field} name="budget" required /></label><button className={button} disabled={busy}>Save campaign</button>
        </form><h2 className="text-xl">Your campaigns</h2>{!campaigns.length && <p>No campaigns yet.</p>}{campaigns.map(campaign => <article className="border border-white/20 rounded-xl p-4" key={campaign.id}><h3>{campaign.title}</h3><p>{campaign.details}</p><p>{campaign.budget}</p></article>)}
      </>}
    </>}
  </main></div>;
}
