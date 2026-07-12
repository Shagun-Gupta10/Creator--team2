import { useEffect, useMemo, useState } from 'react';
import { Eye, ThumbsUp, Users, Target } from 'lucide-react';
import FilterDrawer from '../components/FilterDrawer';
import { getAccessToken, listContents } from '../lib/api';

export default function Audience() {
  const [prefs, setPrefs] = useState({
    showInsights: true,
    country: 'All',
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contents, setContents] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError('');
      try {
        const token = getAccessToken();
        if (!token) throw new Error('Please login to view Audience.');

        const data = await listContents();
        if (!cancelled) setContents(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load audience');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    const totalViews = contents.reduce((sum, c) => sum + (Number(c.views) || 0), 0);
    const totalLikes = contents.reduce((sum, c) => sum + (Number(c.likes) || 0), 0);
    const avgViews = contents.length ? totalViews / contents.length : 0;
    const engagementRate = totalViews > 0 ? (totalLikes / totalViews) * 100 : 0;

    return [
      {
        title: 'Followers',
        value: contents.length ? `${contents.length * 1200}` : '0',
        icon: Users,
        hint: 'Derived from your number of posts (placeholder math)'
      },
      {
        title: 'Avg Views',
        value: Math.round(avgViews).toLocaleString(),
        icon: Eye,
        hint: 'Average views per post'
      },
      {
        title: 'Likes / Views',
        value: `${engagementRate.toFixed(2)}%`,
        icon: ThumbsUp,
        hint: 'Engagement rate (likes ÷ views)'
      },
      {
        title: 'Top Audience',
        value: prefs.country === 'All' ? 'Global' : prefs.country,
        icon: Target,
        hint: 'Not tracked yet — derived from filter'
      },
    ];
  }, [contents, prefs.country]);

  function resetFilters() {
    setPrefs({ showInsights: true, country: 'All' });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-text">Audience</h1>
          <p className="text-muted mt-1">Quick insights for your viewers and growth patterns.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="rounded-xl border border-slate-700/50 bg-surface/60 px-4 py-3 text-text font-medium hover:bg-surface transition-colors flex items-center gap-2"
          >
            <span className="text-sm">Filters</span>
          </button>
        </div>
      </div>

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        values={prefs}
        onChange={(next) => setPrefs(next)}
        onReset={() => {
          resetFilters();
        }}
      />


      {error ? (
        <div className="rounded-2xl border border-red-500/50 bg-red-500/10 px-5 py-4">
          <div className="text-red-200 text-sm">{error}</div>
        </div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-700/50 bg-surface p-6"
            >
              <div className="h-4 w-24 rounded bg-slate-700/60 animate-pulse" />
              <div className="mt-3 h-10 w-32 rounded bg-slate-700/60 animate-pulse" />
              <div className="mt-4 h-4 w-48 rounded bg-slate-700/60 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className={`rounded-2xl border border-emerald-400/15 bg-surface p-6 hover:border-emerald-400/35 transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">{c.title}</p>
                    <h3 className="text-2xl font-bold text-text mt-2">{c.value}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <p className="text-sm text-slate-400 mt-4">
                  {prefs.showInsights ? c.hint : 'Hidden'}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-700/50 bg-surface p-6">
          <h3 className="text-xl font-bold text-text">Audience Notes</h3>
          <p className="text-muted mt-2">
            These are manual “what you’d track” placeholders—replace with real API data later.
          </p>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/20 p-4">
              <p className="text-sm font-semibold text-text">What’s working</p>
              <p className="text-sm text-muted mt-1">
                High-performing posts tend to be short, question-based, and published mid-week.
              </p>
            </div>

            <div className="rounded-xl border border-slate-700/50 bg-slate-900/20 p-4">
              <p className="text-sm font-semibold text-text">Next experiment</p>
              <p className="text-sm text-muted mt-1">
                Try a consistent CTA in the first 10 seconds and compare engagement lift.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/50 bg-surface p-6">
          <h3 className="text-xl font-bold text-text">Quick Actions</h3>
          <p className="text-muted mt-2">Simple manual controls.</p>

          <div className="mt-5 space-y-3">
            <button className="w-full rounded-xl bg-primary/10 border border-primary/30 px-4 py-3 text-text font-medium hover:bg-primary/15 transition-colors">
              Create a new post plan
            </button>
            <button className="w-full rounded-xl bg-slate-800/40 border border-slate-700/60 px-4 py-3 text-text font-medium hover:bg-slate-800/60 transition-colors">
              Export audience summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

