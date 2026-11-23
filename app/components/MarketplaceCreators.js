"use client";
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function MarketplaceCreators() {
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [videos, setVideos] = useState([]);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    api('/creators', { anonymous: true }).then(data => { if (active) setCreators(data.creators); }).catch(error => { if (active) setError(error.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  async function show(creator) {
    setBusy(true); setError(''); setSelected(creator); setVideos([]);
    try { setVideos((await api(`/creators/${creator.id}/videos`, { anonymous: true })).videos); } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  const creatorsByCategory = new Map();
  for (const creator of creators) {
    const niche = creator.profile?.niche;
    const category = (typeof niche === 'string' && niche.trim()) || 'Uncategorized';
    if (!creatorsByCategory.has(category)) creatorsByCategory.set(category, []);
    creatorsByCategory.get(category).push(creator);
  }
  const categories = [...creatorsByCategory.keys()].sort((a, b) => a.localeCompare(b));

  return <section className="mb-16 space-y-5" aria-label="Marketplace creators">
    <h2 className="text-2xl font-bold">Meet our newest creators</h2>
    {loading && <p>Loading creators…</p>}{error && <p role="alert">{error}</p>}
    {!loading && !error && !creators.length && <p className="text-white/60">Creator profiles will appear here once creators join. <a className="underline" href="/account">Create your account</a>.</p>}
    {categories.map(category => (
      <section key={category} className="space-y-3">
        <h3 className="text-lg font-semibold text-white/80">{category}</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creatorsByCategory.get(category).map(creator => (
            <article key={creator.id} className="space-y-3 rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-xl font-semibold">{creator.name}</h4>
              {creator.profile?.bio && <p className="text-white/60">{creator.profile.bio}</p>}
              {creator.profile?.rates && <p>{creator.profile.rates}</p>}
              <button className="text-blue-400 underline" disabled={busy} onClick={() => show(creator)}>View portfolio</button>
            </article>
          ))}
        </div>
      </section>
    ))}
    {selected && <div className="border border-white/20 rounded-2xl p-6 space-y-4"><h3 className="text-xl">{selected.name} — Portfolio</h3><button className="underline mr-6" disabled={busy} onClick={() => show(selected)}>Refresh playback links</button><button className="underline" disabled={busy} onClick={() => { setSelected(null); setVideos([]); }}>Close portfolio</button>
      {busy ? <p>Loading videos…</p> : !videos.length ? <p>No portfolio videos yet.</p> : videos.map(video => <div key={video.id}><h4>{video.title}</h4><video controls preload="metadata" className="w-full max-h-96" src={video.url} poster={video.thumbnailUrl || undefined} /></div>)}
    </div>}
  </section>;
}
