import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../lib/api';

import ChartWidget from '../components/ChartWidget';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { Eye, Heart, ListChecks, TrendingUp } from 'lucide-react';

import '../neon-bar.css';


// Dashboard charts use real content totals from backend.
// We derive a simple distribution across platforms and compute engagement from likes/views.
function buildChartDataFromContents(contents) {
  const groups = {};
  for (const c of contents || []) {
    const views = Number(c.views) || 0;
    const likes = Number(c.likes) || 0;
    const engagement = views > 0 ? (likes / views) * 100 : 0;
    const key = c.platform || 'Other';
    if (!groups[key]) groups[key] = { name: key, views: 0, engagement: 0, count: 0 };
    groups[key].views += views;
    groups[key].engagement += engagement;
    groups[key].count += 1;
  }

  const data = Object.values(groups).map((g) => ({
    name: g.name,
    views: g.views,
    // Use average engagement across posts in that platform
    engagement: g.count ? g.engagement / g.count : 0,
  }));

  // Sort by views desc and limit to 7 bars for readability
  data.sort((a, b) => (b.views || 0) - (a.views || 0));
  return data.slice(0, 7);
}


function formatCompactNumber(num) {
  const n = Number(num) || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return `${n}`;
}

function formatPct(num) {
  const n = Number(num) || 0;
  return `${n}%`;
}

async function fetchDashboardSummary({ apiBaseUrl, token }) {
  const res = await fetch(`${apiBaseUrl}/dashboard`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      detail = data?.detail || detail;
    } catch {
      // ignore
    }
    const err = new Error(detail);
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export default function Dashboard() {
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [summary, setSummary] = useState({
    total_posts: 0,
    total_views: 0,
    total_likes: 0,
    engagement_rate: 0,
  });

  const token = localStorage.getItem('access_token');

  const [contents, setContents] = useState([]);
  const chartData = useMemo(() => buildChartDataFromContents(contents), [contents]);
  
  useEffect(() => {

    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError('');

        if (!token) {
          navigate('/login', { replace: true });
          return;
        }



        const data = await fetchDashboardSummary({ apiBaseUrl, token });

        // Load contents for chart/table views (scoped by role via /content)
        const contentsRes = await fetch(`${apiBaseUrl}/content`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        let contentsData = [];
        if (contentsRes.ok) {
          const c = await contentsRes.json();
          contentsData = Array.isArray(c) ? c : [];
        }

        if (!cancelled) {
          setSummary(data);
          setContents(contentsData);
        }

      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load dashboard');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, token]);

  const stats = [
    {
      title: 'Total Posts',
      value: formatCompactNumber(summary.total_posts),
      icon: ListChecks,
      tone: 'bg-blue-500/10',
      iconClass: 'text-blue-500',
    },
    {
      title: 'Total Views',
      value: formatCompactNumber(summary.total_views),
      icon: Eye,
      tone: 'bg-purple-500/10',
      iconClass: 'text-purple-500',
    },
    {
      title: 'Total Likes',
      value: formatCompactNumber(summary.total_likes),
      icon: TrendingUp,
      tone: 'bg-emerald-500/10',
      iconClass: 'text-emerald-500',
    },
    {
      title: 'Engagement Rate',
      value: formatPct(summary.engagement_rate),
      icon: Heart,
      tone: 'bg-pink-500/10',
      iconClass: 'text-pink-500',
    },
  ];

  const recentPosts = useMemo(() => {
    return (contents || [])
      .slice()
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, 5)
      .map((p) => ({
        ...p,
        engagement: Number(p.views) > 0 ? (Number(p.likes) / Number(p.views)) * 100 : 0,
      }));
  }, [contents]);

  return (


    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-muted">Track your performance and audience growth.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="bg-surface border border-slate-700/50 rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue="30d"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            type="button"
            className="bg-primary/10 hover:bg-primary/15 text-primary border border-primary/30 rounded-xl px-4 py-3 font-medium transition-colors"
          >
            Filters
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/50 bg-red-500/10 px-5 py-4">
          <div className="text-red-200 text-sm">{error}</div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-surface p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-text">
                    {loading ? <div className="h-8 w-24 rounded bg-slate-700/60 animate-pulse" /> : stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.tone}`}>
                  <Icon className={`w-6 h-6 ${stat.iconClass}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-muted text-sm">Real-time totals</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Charts computed from your own content (scoped by backend role permissions) */}
        <ChartWidget title="Views Over Time">

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData.length ? chartData : [{ name: 'No Data', views: 0, engagement: 0 }]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWidget>

        <ChartWidget title="Engagement Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.length ? chartData : [{ name: 'No Data', views: 0, engagement: 0 }]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: '#334155', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <defs>
                <linearGradient id="neonBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff8c00" />
                  <stop offset="100%" stopColor="#ffd700" />
                </linearGradient>
              </defs>
              <Bar dataKey="engagement" radius={[4, 4, 0, 0]}>
                {((chartData.length ? chartData : [{ name: 'No Data', views: 0, engagement: 0 }]) || []).map((_, i) => (
                  <Cell key={i} className="neon-bar-rect" />
                ))}

              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </ChartWidget>

          <ChartWidget title="Likes Share">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={(() => {
                  const totalLikes = (contents || []).reduce((sum, c) => sum + (Number(c.likes) || 0), 0);
                  const totalViews = (contents || []).reduce((sum, c) => sum + (Number(c.views) || 0), 0);
                  const noLikes = Math.max(0, totalViews - totalLikes);
                  return [
                    { name: 'Likes', value: totalLikes },
                    { name: 'No Likes', value: noLikes },
                  ];
                })()}

                dataKey="value"
                nameKey="name"

                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
                paddingAngle={2}
              >
                <Cell fill="#10b981" />
                <Cell fill="#334155" />
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartWidget>
      </div>

      <div className="bg-surface rounded-2xl border border-slate-700/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-muted">Recent Posts</h3>
          <div className="text-sm text-muted">Last updated just now</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="text-left text-muted text-sm">
                <th className="font-medium py-3">Post ID</th>
                <th className="font-medium py-3">Platform</th>
                <th className="font-medium py-3">Views</th>
                <th className="font-medium py-3">Likes</th>
                <th className="font-medium py-3">Engagement %</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-t border-slate-700/50">
                      <td className="py-4">
                        <div className="h-4 w-12 rounded bg-slate-700/60 animate-pulse" />
                      </td>
                      <td className="py-4">
                        <div className="h-4 w-28 rounded bg-slate-700/60 animate-pulse" />
                      </td>
                      <td className="py-4">
                        <div className="h-4 w-16 rounded bg-slate-700/60 animate-pulse" />
                      </td>
                      <td className="py-4">
                        <div className="h-4 w-16 rounded bg-slate-700/60 animate-pulse" />
                      </td>
                      <td className="py-4">
                        <div className="h-4 w-20 rounded bg-slate-700/60 animate-pulse" />
                      </td>
                    </tr>
                  ))
                : recentPosts.map((p) => (
                    <tr key={p.id} className="border-t border-slate-700/50 text-sm">
                      <td className="py-4 text-text">{p.id}</td>
                      <td className="py-4 text-text">{p.platform}</td>
                      <td className="py-4 text-text">{formatCompactNumber(p.views)}</td>
                      <td className="py-4 text-text">{formatCompactNumber(p.likes)}</td>
                      <td className="py-4 text-text">{p.engagement.toFixed(2)}%</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


