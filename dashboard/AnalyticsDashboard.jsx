import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  LayoutGrid, BarChart3, Users, FileText, Search, Bell, ChevronDown,
  Menu, X, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Eye,
  Heart, MessageCircle, Share2, Clock, Download, Filter, Calendar,
  MoreHorizontal, ArrowUpRight, ArrowDownRight, Play, DollarSign,
  UserPlus, Globe, ChevronsUpDown, CheckCircle2, AlertCircle, Loader2,
  Settings, Sparkles,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS — injected once as global CSS custom properties
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

    .ad-root {
      --bg: #F5F6FA;
      --surface: #FFFFFF;
      --surface-alt: #FBFBFE;
      --ink: #12141F;
      --ink-soft: #4B4F5E;
      --muted: #8A8FA3;
      --border: #E7E9F2;
      --accent: #5B5FEF;
      --accent-ink: #ffffff;
      --accent-soft: #EEEEFE;
      --accent-soft-ink: #4749C4;
      --teal: #12B5A6;
      --teal-soft: #E6FBF7;
      --rose: #F0466E;
      --rose-soft: #FDEBF0;
      --amber: #F5A524;
      --amber-soft: #FEF4E4;
      --sidebar-bg: #10111C;
      --sidebar-bg-hover: #191B2A;
      --sidebar-text: #9498B0;
      --sidebar-text-active: #FFFFFF;
      --radius: 14px;
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
    }
    .ad-root .font-display { font-family: 'Sora', sans-serif; }
    .ad-root .font-mono { font-family: 'JetBrains Mono', monospace; }

    .ad-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
    .ad-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .ad-scrollbar::-webkit-scrollbar-thumb { background: #D6D9E6; border-radius: 8px; }
    .ad-root ::selection { background: var(--accent-soft); color: var(--accent); }

    @keyframes ad-fade-up { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
    .ad-animate-in { animation: ad-fade-up .45s cubic-bezier(.2,.8,.2,1) both; }

    @keyframes ad-pulse { 0%,100% { opacity:1; } 50% { opacity:.35; } }
    .ad-pulse-dot { animation: ad-pulse 1.8s ease-in-out infinite; }

    @keyframes ad-shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
    .ad-skeleton {
      background: linear-gradient(90deg, #EEF0F6 25%, #F7F8FC 37%, #EEF0F6 63%);
      background-size: 400px 100%;
      animation: ad-shimmer 1.4s ease-in-out infinite;
    }

    .ad-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease;
    }
    .ad-card-hover:hover {
      box-shadow: 0 12px 28px -14px rgba(18,20,31,0.16);
      border-color: #DADDEB;
      transform: translateY(-2px);
    }

    .ad-nav-item {
      position: relative;
      transition: background .18s ease, color .18s ease;
    }
    .ad-nav-item::before {
      content: '';
      position: absolute; left: 0; top: 50%; transform: translateY(-50%);
      width: 3px; height: 0; background: var(--accent);
      border-radius: 0 4px 4px 0;
      transition: height .2s ease;
    }
    .ad-nav-item.active::before { height: 22px; }

    .ad-tab-underline {
      position: relative;
    }
    .ad-tab-underline::after {
      content: '';
      position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
      background: var(--accent);
      transform: scaleX(0);
      transition: transform .25s ease;
    }
    .ad-tab-underline.active::after { transform: scaleX(1); }

    .ad-row:hover { background: var(--surface-alt); }

    .ad-sidebar { transition: width .28s cubic-bezier(.2,.8,.2,1); }
    .ad-drawer { transition: transform .3s cubic-bezier(.2,.8,.2,1); }

    .ad-glow {
      background: radial-gradient(120px 80px at 85% 0%, rgba(91,95,239,0.14), transparent 70%);
    }

    .ad-live-badge {
      background: linear-gradient(90deg, var(--rose), #FF6F91);
    }

    @media (prefers-reduced-motion: reduce) {
      .ad-animate-in, .ad-pulse-dot, .ad-skeleton { animation: none !important; }
    }
  `}</style>
);

/* ============================================================
   DUMMY DATA
   ============================================================ */
const last14 = Array.from({ length: 14 }).map((_, i) => {
  const d = new Date(2026, 6, i + 1);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
});

const viewsSeries = [4200, 4600, 4100, 5300, 6100, 5800, 6700, 7200, 6900, 7600, 8100, 7900, 8600, 9200]
  .map((v, i) => ({ date: last14[i], views: v, lastPeriod: Math.round(v * (0.72 + Math.random() * 0.1)) }));

const revenueSeries = [820, 910, 870, 1040, 1180, 1120, 1260, 1340, 1290, 1410, 1520, 1470, 1600, 1720]
  .map((v, i) => ({ date: last14[i], revenue: v }));

const engagementByType = [
  { type: "Reels", value: 18400 },
  { type: "Posts", value: 12100 },
  { type: "Stories", value: 9600 },
  { type: "Live", value: 5200 },
  { type: "Articles", value: 3100 },
];

const audienceGrowth = last14.map((date, i) => ({
  date,
  followers: 24500 + i * 310 + Math.round(Math.random() * 120),
  unfollows: 60 + Math.round(Math.random() * 40),
}));

const ageGroups = [
  { name: "18–24", value: 32, color: "#5B5FEF" },
  { name: "25–34", value: 38, color: "#12B5A6" },
  { name: "35–44", value: 18, color: "#F5A524" },
  { name: "45–54", value: 8, color: "#F0466E" },
  { name: "55+", value: 4, color: "#9CA3D4" },
];

const genderSplit = [
  { name: "Female", value: 54, color: "#5B5FEF" },
  { name: "Male", value: 43, color: "#12B5A6" },
  { name: "Other", value: 3, color: "#F5A524" },
];

const topLocations = [
  { country: "United States", pct: 34, users: 41200 },
  { country: "India", pct: 21, users: 25400 },
  { country: "United Kingdom", pct: 11, users: 13300 },
  { country: "Germany", pct: 8, users: 9700 },
  { country: "Brazil", pct: 6, users: 7100 },
  { country: "Canada", pct: 5, users: 6000 },
];

const topContent = [
  { id: 1, title: "5 Growth Hacks Every Creator Needs in 2026", type: "Reel", views: 182400, likes: 14200, comments: 892, shares: 2310, published: "Jul 12, 2026", trend: 18.4 },
  { id: 2, title: "Behind the Scenes: Studio Rebuild Vlog", type: "Video", views: 96700, likes: 7300, comments: 421, shares: 980, published: "Jul 10, 2026", trend: 6.1 },
  { id: 3, title: "Q&A — Ask Me Anything About Editing", type: "Live", views: 54200, likes: 3800, comments: 1204, shares: 340, published: "Jul 9, 2026", trend: -3.2 },
  { id: 4, title: "How I Plan a Month of Content in 1 Day", type: "Article", views: 41300, likes: 2600, comments: 188, shares: 512, published: "Jul 7, 2026", trend: 4.7 },
  { id: 5, title: "Unboxing the New Creator Kit", type: "Post", views: 38900, likes: 4100, comments: 260, shares: 601, published: "Jul 6, 2026", trend: -1.5 },
  { id: 6, title: "3 Mistakes Killing Your Reach", type: "Reel", views: 121500, likes: 9800, comments: 703, shares: 1890, published: "Jul 4, 2026", trend: 22.9 },
  { id: 7, title: "Studio Tour 2026 Edition", type: "Video", views: 28700, likes: 1900, comments: 140, shares: 220, published: "Jul 2, 2026", trend: 2.3 },
  { id: 8, title: "Weekly Recap: Wins & Fails", type: "Post", views: 19800, likes: 1400, comments: 96, shares: 145, published: "Jun 30, 2026", trend: -5.8 },
];

const reportsData = [
  { id: "RPT-2026-014", name: "Monthly Performance Summary", type: "Performance", range: "Jun 1 – Jun 30, 2026", status: "Ready", size: "1.2 MB", created: "Jul 1, 2026" },
  { id: "RPT-2026-013", name: "Audience Demographics Deep Dive", type: "Audience", range: "May 1 – May 31, 2026", status: "Ready", size: "860 KB", created: "Jun 2, 2026" },
  { id: "RPT-2026-012", name: "Content Engagement Breakdown", type: "Content", range: "Jun 8 – Jul 8, 2026", status: "Processing", size: "—", created: "Jul 14, 2026" },
  { id: "RPT-2026-011", name: "Revenue & Monetization Report", type: "Revenue", range: "Q2 2026", status: "Ready", size: "2.4 MB", created: "Jul 3, 2026" },
  { id: "RPT-2026-010", name: "Follower Growth Trend", type: "Audience", range: "Jan 1 – Jun 30, 2026", status: "Ready", size: "1.6 MB", created: "Jul 1, 2026" },
  { id: "RPT-2026-009", name: "Top Content — Last 90 Days", type: "Content", range: "Apr 15 – Jul 15, 2026", status: "Failed", size: "—", created: "Jul 14, 2026" },
  { id: "RPT-2026-008", name: "Regional Reach Comparison", type: "Audience", range: "Jun 2026", status: "Ready", size: "740 KB", created: "Jul 5, 2026" },
];

const kpiData = [
  { key: "views", label: "Total Views", value: 892400, delta: 12.4, positive: true, icon: Eye, spark: viewsSeries.map(d => ({ v: d.views })), accent: "accent" },
  { key: "followers", label: "New Followers", value: 24812, delta: 8.1, positive: true, icon: UserPlus, spark: audienceGrowth.map(d => ({ v: d.followers })), accent: "teal" },
  { key: "engagement", label: "Engagement Rate", value: 6.8, suffix: "%", delta: -1.3, positive: false, icon: Heart, spark: engagementByType.map(d => ({ v: d.value })), accent: "rose" },
  { key: "revenue", label: "Est. Revenue", value: 18420, prefix: "$", delta: 15.7, positive: true, icon: DollarSign, spark: revenueSeries.map(d => ({ v: d.revenue })), accent: "amber" },
];

const NAV_ITEMS = [
  { key: "home", label: "Dashboard Home", icon: LayoutGrid },
  { key: "content", label: "Content Analytics", icon: BarChart3 },
  { key: "audience", label: "Audience Analytics", icon: Users },
  { key: "growth", label: "Growth and Trends", icon: TrendingUp },
  { key: "reports", label: "Reports", icon: FileText },
];

/* ============================================================
   HELPERS
   ============================================================ */
const fmtCompact = (n) => new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
const fmtFull = (n) => new Intl.NumberFormat("en-US").format(n);

function useCountUp(target, duration = 900) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(target * eased);
      if (progress < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);
  return val;
}

const accentMap = {
  accent: { fg: "var(--accent)", soft: "var(--accent-soft)" },
  teal: { fg: "var(--teal)", soft: "var(--teal-soft)" },
  rose: { fg: "var(--rose)", soft: "var(--rose-soft)" },
  amber: { fg: "var(--amber)", soft: "var(--amber-soft)" },
};

/* ============================================================
   SHARED UI — Badge, StatCard, SectionHeader
   ============================================================ */
const Badge = ({ children, tone = "muted" }) => {
  const tones = {
    muted: { bg: "#EEF0F6", fg: "var(--ink-soft)" },
    success: { bg: "var(--teal-soft)", fg: "#0B8E82" },
    warning: { bg: "var(--amber-soft)", fg: "#9A6B0E" },
    danger: { bg: "var(--rose-soft)", fg: "#C22B4D" },
    accent: { bg: "var(--accent-soft)", fg: "var(--accent-soft-ink)" },
  };
  const t = tones[tone];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: t.bg, color: t.fg }}
    >
      {children}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    Ready: { tone: "success", icon: CheckCircle2 },
    Processing: { tone: "warning", icon: Loader2 },
    Failed: { tone: "danger", icon: AlertCircle },
  };
  const { tone, icon: Icon } = map[status] || map.Ready;
  return (
    <Badge tone={tone}>
      <Icon size={12} className={status === "Processing" ? "animate-spin" : ""} />
      {status}
    </Badge>
  );
};

const SectionHeader = ({ eyebrow, title, subtitle, action }) => (
  <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
    <div>
      {eyebrow && (
        <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--accent)" }}>
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-xl md:text-2xl font-semibold" style={{ color: "var(--ink)" }}>{title}</h2>
      {subtitle && <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

const StatCard = ({ item, delay = 0 }) => {
  const val = useCountUp(item.value);
  const colors = accentMap[item.accent];
  const displayVal = item.value % 1 !== 0 ? val.toFixed(1) : Math.round(val);
  return (
    <div
      className="ad-card ad-card-hover ad-animate-in p-5 relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="ad-glow absolute inset-0 pointer-events-none" />
      <div className="flex items-start justify-between relative">
        <div>
          <div className="text-xs font-medium mb-2" style={{ color: "var(--muted)" }}>{item.label}</div>
          <div className="font-display font-mono text-2xl md:text-[28px] font-bold" style={{ color: "var(--ink)" }}>
            {item.prefix || ""}{fmtFull(displayVal)}{item.suffix || ""}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold" style={{ color: item.positive ? "#0B8E82" : "#C22B4D" }}>
            {item.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(item.delta)}%
            <span className="font-normal ml-1" style={{ color: "var(--muted)" }}>vs last period</span>
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: colors.soft, color: colors.fg }}
        >
          <item.icon size={18} strokeWidth={2.25} />
        </div>
      </div>
      <div className="h-10 mt-3 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={item.spark} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`spark-${item.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.fg} stopOpacity={0.35} />
                <stop offset="100%" stopColor={colors.fg} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={colors.fg} strokeWidth={2} fill={`url(#spark-${item.key})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ============================================================
   FILTERS
   ============================================================ */
const RANGE_OPTIONS = ["7D", "28D", "90D", "Custom"];

const Filters = ({ range, setRange, typeFilter, setTypeFilter, typeOptions, showType = true }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <div className="flex items-center rounded-full p-1 border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      {RANGE_OPTIONS.map((r) => (
        <button
          key={r}
          onClick={() => setRange(r)}
          className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all"
          style={
            range === r
              ? { background: "var(--accent)", color: "#fff" }
              : { color: "var(--ink-soft)" }
          }
        >
          {r === "Custom" ? <span className="inline-flex items-center gap-1"><Calendar size={12} />{r}</span> : r}
        </button>
      ))}
    </div>
    {showType && (
      <div className="relative">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 text-xs font-semibold rounded-full border cursor-pointer outline-none"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--ink-soft)" }}
        >
          {typeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--muted)" }} />
      </div>
    )}
    <button
      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full border"
      style={{ borderColor: "var(--border)", color: "var(--ink-soft)", background: "var(--surface)" }}
    >
      <Filter size={13} /> More filters
    </button>
  </div>
);

/* ============================================================
   TABLE — generic, sortable
   ============================================================ */
const useSortableData = (items, initialKey, initialDir = "desc") => {
  const [sortKey, setSortKey] = useState(initialKey);
  const [sortDir, setSortDir] = useState(initialDir);
  const sorted = useMemo(() => {
    const arr = [...items];
    arr.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return arr;
  }, [items, sortKey, sortDir]);
  const toggleSort = (key) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };
  return { sorted, sortKey, sortDir, toggleSort };
};

const Th = ({ label, sortKey: key, active, dir, onSort, align = "left" }) => (
  <th
    onClick={() => onSort(key)}
    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide cursor-pointer select-none whitespace-nowrap text-${align}`}
    style={{ color: active ? "var(--accent)" : "var(--muted)" }}
  >
    <span className="inline-flex items-center gap-1">
      {label}
      <ChevronsUpDown size={12} style={{ opacity: active ? 1 : 0.4 }} />
    </span>
  </th>
);

const ContentTable = ({ data }) => {
  const { sorted, sortKey, sortDir, toggleSort } = useSortableData(data, "views");
  const typeTone = { Reel: "accent", Video: "success", Live: "danger", Article: "muted", Post: "warning" };
  return (
    <div className="ad-card overflow-hidden">
      <div className="overflow-x-auto ad-scrollbar">
        <table className="w-full border-collapse min-w-[720px]">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <Th label="Title" sortKey="title" active={sortKey === "title"} dir={sortDir} onSort={toggleSort} />
              <Th label="Type" sortKey="type" active={sortKey === "type"} dir={sortDir} onSort={toggleSort} />
              <Th label="Views" sortKey="views" active={sortKey === "views"} dir={sortDir} onSort={toggleSort} align="right" />
              <Th label="Likes" sortKey="likes" active={sortKey === "likes"} dir={sortDir} onSort={toggleSort} align="right" />
              <Th label="Comments" sortKey="comments" active={sortKey === "comments"} dir={sortDir} onSort={toggleSort} align="right" />
              <Th label="Trend" sortKey="trend" active={sortKey === "trend"} dir={sortDir} onSort={toggleSort} align="right" />
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.id} className="ad-row transition-colors" style={{ borderBottom: i === sorted.length - 1 ? "none" : "1px solid var(--border)" }}>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium max-w-xs truncate" style={{ color: "var(--ink)" }}>{row.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{row.published}</div>
                </td>
                <td className="px-4 py-3"><Badge tone={typeTone[row.type]}>{row.type}</Badge></td>
                <td className="px-4 py-3 text-sm font-mono text-right" style={{ color: "var(--ink)" }}>{fmtCompact(row.views)}</td>
                <td className="px-4 py-3 text-sm font-mono text-right" style={{ color: "var(--ink-soft)" }}>{fmtCompact(row.likes)}</td>
                <td className="px-4 py-3 text-sm font-mono text-right" style={{ color: "var(--ink-soft)" }}>{fmtFull(row.comments)}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold font-mono" style={{ color: row.trend >= 0 ? "#0B8E82" : "#C22B4D" }}>
                    {row.trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                    {Math.abs(row.trend)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button style={{ color: "var(--muted)" }}><MoreHorizontal size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReportsTable = ({ data }) => {
  const { sorted, sortKey, sortDir, toggleSort } = useSortableData(data, "created");
  return (
    <div className="ad-card overflow-hidden">
      <div className="overflow-x-auto ad-scrollbar">
        <table className="w-full border-collapse min-w-[760px]">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <Th label="Report" sortKey="name" active={sortKey === "name"} dir={sortDir} onSort={toggleSort} />
              <Th label="Type" sortKey="type" active={sortKey === "type"} dir={sortDir} onSort={toggleSort} />
              <Th label="Date Range" sortKey="range" active={sortKey === "range"} dir={sortDir} onSort={toggleSort} />
              <Th label="Status" sortKey="status" active={sortKey === "status"} dir={sortDir} onSort={toggleSort} />
              <Th label="Size" sortKey="size" active={sortKey === "size"} dir={sortDir} onSort={toggleSort} align="right" />
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.id} className="ad-row transition-colors" style={{ borderBottom: i === sorted.length - 1 ? "none" : "1px solid var(--border)" }}>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium" style={{ color: "var(--ink)" }}>{row.name}</div>
                  <div className="text-xs font-mono mt-0.5" style={{ color: "var(--muted)" }}>{row.id}</div>
                </td>
                <td className="px-4 py-3"><Badge tone="accent">{row.type}</Badge></td>
                <td className="px-4 py-3 text-sm" style={{ color: "var(--ink-soft)" }}>{row.range}</td>
                <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                <td className="px-4 py-3 text-sm font-mono text-right" style={{ color: "var(--ink-soft)" }}>{row.size}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    disabled={row.status !== "Ready"}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity"
                    style={{
                      background: row.status === "Ready" ? "var(--accent-soft)" : "#EEF0F6",
                      color: row.status === "Ready" ? "var(--accent-soft-ink)" : "var(--muted)",
                      opacity: row.status === "Ready" ? 1 : 0.6,
                      cursor: row.status === "Ready" ? "pointer" : "not-allowed",
                    }}
                  >
                    <Download size={12} /> Export
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================
   CHART BLOCKS
   ============================================================ */
const ChartCard = ({ title, subtitle, action, children, height = 280 }) => (
  <div className="ad-card p-5">
    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
      <div>
        <h3 className="font-display text-sm font-semibold" style={{ color: "var(--ink)" }}>{title}</h3>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

const tooltipStyle = {
  background: "var(--ink)",
  border: "none",
  borderRadius: 10,
  fontSize: 12,
  fontFamily: "Inter, sans-serif",
  padding: "8px 12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
};

const ViewsAreaChart = () => (
  <ChartCard
    title="Views Over Time"
    subtitle="Current period vs. previous period"
    action={<Legend2 items={[{ label: "This period", color: "var(--accent)" }, { label: "Last period", color: "#D6D9E6" }]} />}
  >
    <AreaChart data={viewsSeries} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
      <defs>
        <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B5FEF" stopOpacity={0.28} />
          <stop offset="100%" stopColor="#5B5FEF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8A8FA3" }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: "#8A8FA3" }} axisLine={false} tickLine={false} tickFormatter={fmtCompact} width={40} />
      <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }} formatter={(v) => fmtFull(v)} />
      <Area type="monotone" dataKey="lastPeriod" stroke="#D6D9E6" strokeWidth={2} fill="none" strokeDasharray="4 4" />
      <Area type="monotone" dataKey="views" stroke="#5B5FEF" strokeWidth={2.5} fill="url(#viewsFill)" />
    </AreaChart>
  </ChartCard>
);

const Legend2 = ({ items }) => (
  <div className="flex items-center gap-3">
    {items.map((it) => (
      <span key={it.label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-soft)" }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: it.color }} />
        {it.label}
      </span>
    ))}
  </div>
);

const EngagementBarChart = () => (
  <ChartCard title="Engagement by Content Type" subtitle="Total interactions, last 28 days">
    <BarChart data={engagementByType} margin={{ top: 4, right: 8, left: -18, bottom: 0 }} barSize={34}>
      <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
      <XAxis dataKey="type" tick={{ fontSize: 11, fill: "#8A8FA3" }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: "#8A8FA3" }} axisLine={false} tickLine={false} tickFormatter={fmtCompact} width={40} />
      <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }} formatter={(v) => fmtFull(v)} cursor={{ fill: "#F5F6FA" }} />
      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
        {engagementByType.map((_, i) => (
          <Cell key={i} fill={["#5B5FEF", "#7A7DF2", "#9698F5", "#B3B4F9", "#D0D1FC"][i % 5]} />
        ))}
      </Bar>
    </BarChart>
  </ChartCard>
);

const RevenueLineChart = () => (
  <ChartCard title="Estimated Revenue" subtitle="Daily earnings trend">
    <LineChart data={revenueSeries} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8A8FA3" }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: "#8A8FA3" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${fmtCompact(v)}`} width={46} />
      <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }} formatter={(v) => `$${fmtFull(v)}`} />
      <Line type="monotone" dataKey="revenue" stroke="#F5A524" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
    </LineChart>
  </ChartCard>
);

const GrowthAreaChart = () => (
  <ChartCard
    title="Follower Growth"
    subtitle="New followers vs. unfollows"
    action={<Legend2 items={[{ label: "Followers", color: "var(--teal)" }, { label: "Unfollows", color: "var(--rose)" }]} />}
  >
    <AreaChart data={audienceGrowth} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
      <defs>
        <linearGradient id="followFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12B5A6" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#12B5A6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8A8FA3" }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: "#8A8FA3" }} axisLine={false} tickLine={false} tickFormatter={fmtCompact} width={44} />
      <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }} formatter={(v) => fmtFull(v)} />
      <Area type="monotone" dataKey="followers" stroke="#12B5A6" strokeWidth={2.5} fill="url(#followFill)" />
      <Line type="monotone" dataKey="unfollows" stroke="#F0466E" strokeWidth={2} dot={false} />
    </AreaChart>
  </ChartCard>
);

const DemographicsPie = () => (
  <ChartCard title="Age Distribution" subtitle="Share of total audience" height={260}>
    <PieChart>
      <Pie data={ageGroups} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3} cornerRadius={4}>
        {ageGroups.map((g, i) => <Cell key={i} fill={g.color} stroke="none" />)}
      </Pie>
      <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }} formatter={(v) => `${v}%`} />
      <Legend
        verticalAlign="bottom"
        height={36}
        formatter={(v) => <span style={{ color: "var(--ink-soft)", fontSize: 12 }}>{v}</span>}
        iconType="circle"
        iconSize={8}
      />
    </PieChart>
  </ChartCard>
);

const GenderDonut = () => (
  <ChartCard title="Gender Split" subtitle="Audience identity breakdown" height={260}>
    <PieChart>
      <Pie data={genderSplit} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3} cornerRadius={4}>
        {genderSplit.map((g, i) => <Cell key={i} fill={g.color} stroke="none" />)}
      </Pie>
      <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }} formatter={(v) => `${v}%`} />
      <Legend
        verticalAlign="bottom"
        height={36}
        formatter={(v) => <span style={{ color: "var(--ink-soft)", fontSize: 12 }}>{v}</span>}
        iconType="circle"
        iconSize={8}
      />
    </PieChart>
  </ChartCard>
);

const LocationsCard = () => (
  <div className="ad-card p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-display text-sm font-semibold" style={{ color: "var(--ink)" }}>Top Locations</h3>
      <Globe size={16} style={{ color: "var(--muted)" }} />
    </div>
    <div className="space-y-3.5">
      {topLocations.map((loc) => (
        <div key={loc.country}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span style={{ color: "var(--ink-soft)" }}>{loc.country}</span>
            <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{fmtCompact(loc.users)} · {loc.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full w-full" style={{ background: "#EEF0F6" }}>
            <div className="h-1.5 rounded-full" style={{ width: `${loc.pct * 2.4}%`, background: "linear-gradient(90deg, #5B5FEF, #7A7DF2)" }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ============================================================
   SIDEBAR
   ============================================================ */
const Sidebar = ({ active, setActive, collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const widthClass = collapsed ? "w-[76px]" : "w-[248px]";
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`ad-sidebar ad-drawer ${widthClass} fixed md:sticky top-0 h-screen z-50 flex flex-col shrink-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ background: "var(--sidebar-bg)" }}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--accent)" }}>
            <Sparkles size={16} color="#fff" />
          </div>
          {!collapsed && <span className="font-display text-white font-semibold text-[15px] whitespace-nowrap">Pulse Studio</span>}
          <button className="ml-auto md:hidden" onClick={() => setMobileOpen(false)}>
            <X size={18} color="#9498B0" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto ad-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { setActive(item.key); setMobileOpen(false); }}
                className={`ad-nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "active" : ""}`}
                style={{
                  background: isActive ? "var(--sidebar-bg-hover)" : "transparent",
                  color: isActive ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
                }}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} strokeWidth={2} className="shrink-0" />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-4">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden md:flex w-full items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors"
            style={{ color: "var(--sidebar-text)", background: "transparent" }}
          >
            {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /> Collapse</>}
          </button>
          {!collapsed && (
            <div className="mt-2 p-3 rounded-xl" style={{ background: "var(--sidebar-bg-hover)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full ad-pulse-dot" style={{ background: "var(--teal)" }} />
                <span className="text-xs font-semibold text-white">Live Analytics</span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--sidebar-text)" }}>Data refreshes every 5 minutes across all modules.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

/* ============================================================
   NAVBAR
   ============================================================ */
const Navbar = ({ title, setMobileOpen }) => (
  <header
    className="sticky top-0 z-30 flex items-center gap-3 px-4 md:px-7 h-16 shrink-0 backdrop-blur"
    style={{ background: "rgba(245,246,250,0.85)", borderBottom: "1px solid var(--border)" }}
  >
    <button className="md:hidden" onClick={() => setMobileOpen(true)}>
      <Menu size={20} style={{ color: "var(--ink)" }} />
    </button>

    <div className="hidden md:block">
      <h1 className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>{title}</h1>
    </div>

    <div className="flex-1 flex justify-end md:justify-center">
      <div className="relative w-full max-w-sm hidden sm:block">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
        <input
          placeholder="Search analytics, reports, content…"
          className="w-full pl-9 pr-3 py-2 rounded-full text-sm outline-none border"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--ink)" }}
        />
      </div>
    </div>

    <div className="flex items-center gap-1.5 md:gap-3">
      <span className="ad-live-badge hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white">
        <span className="w-1.5 h-1.5 rounded-full bg-white ad-pulse-dot" /> LIVE
      </span>
      <button className="relative w-9 h-9 rounded-full flex items-center justify-center border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <Bell size={16} style={{ color: "var(--ink-soft)" }} />
        <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full" style={{ background: "var(--rose)" }} />
      </button>
      <button className="w-9 h-9 rounded-full flex items-center justify-center border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <Settings size={16} style={{ color: "var(--ink-soft)" }} />
      </button>
      <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "var(--accent)" }}>SM</div>
        <span className="hidden lg:inline text-xs font-medium" style={{ color: "var(--ink)" }}>Sabarmathi</span>
        <ChevronDown size={13} className="hidden lg:inline" style={{ color: "var(--muted)" }} />
      </button>
    </div>
  </header>
);

/* ============================================================
   PAGES
   ============================================================ */
const DashboardHome = () => (
  <div className="space-y-6">
    <SectionHeader
      eyebrow="Overview"
      title="Welcome back, Sabarmathi"
      subtitle="Here's how your channel performed over the last 14 days."
      action={<Filters range="7D" setRange={() => {}} showType={false} />}
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpiData.map((item, i) => <StatCard key={item.key} item={item} delay={i * 80} />)}
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div className="xl:col-span-2"><ViewsAreaChart /></div>
      <EngagementBarChart />
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div className="xl:col-span-2 ad-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-sm font-semibold" style={{ color: "var(--ink)" }}>Recent Top Content</h3>
          <button className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--accent)" }}>View all <ArrowUpRight size={13} /></button>
        </div>
        <div className="space-y-1">
          {topContent.slice(0, 4).map((row) => (
            <div key={row.id} className="ad-row flex items-center gap-3 p-2.5 rounded-xl transition-colors">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--accent-soft)" }}>
                <Play size={16} style={{ color: "var(--accent)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate" style={{ color: "var(--ink)" }}>{row.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{row.type} · {row.published}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-mono font-semibold" style={{ color: "var(--ink)" }}>{fmtCompact(row.views)}</div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>views</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LocationsCard />
    </div>
  </div>
);

const ContentAnalytics = () => {
  const [range, setRange] = useState("28D");
  const [typeFilter, setTypeFilter] = useState("All types");
  const filtered = typeFilter === "All types" ? topContent : topContent.filter((c) => c.type === typeFilter);
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Content"
        title="Content Analytics"
        subtitle="Track how each piece of content performs across your channel."
        action={
          <Filters
            range={range} setRange={setRange}
            typeFilter={typeFilter} setTypeFilter={setTypeFilter}
            typeOptions={["All types", "Reel", "Video", "Live", "Article", "Post"]}
          />
        }
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2"><ViewsAreaChart /></div>
        <EngagementBarChart />
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold" style={{ color: "var(--ink)" }}>All Content</h3>
          <span className="text-xs" style={{ color: "var(--muted)" }}>{filtered.length} items</span>
        </div>
        <ContentTable data={filtered} />
      </div>
    </div>
  );
};

const AudienceAnalytics = () => {
  const [range, setRange] = useState("28D");
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Audience"
        title="Audience Analytics"
        subtitle="Understand who's watching, where they're from, and how the audience is growing."
        action={<Filters range={range} setRange={setRange} showType={false} />}
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2"><GrowthAreaChart /></div>
        <LocationsCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DemographicsPie />
        <GenderDonut />
      </div>
    </div>
  );
};

const Reports = () => {
  const [range, setRange] = useState("90D");
  const [typeFilter, setTypeFilter] = useState("All types");
  const filtered = typeFilter === "All types" ? reportsData : reportsData.filter((r) => r.type === typeFilter);
  const readyCount = reportsData.filter((r) => r.status === "Ready").length;
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Reports"
        title="Reports"
        subtitle={`${readyCount} reports ready to download, generated automatically each period.`}
        action={
          <div className="flex items-center gap-2">
            <Filters
              range={range} setRange={setRange}
              typeFilter={typeFilter} setTypeFilter={setTypeFilter}
              typeOptions={["All types", "Performance", "Audience", "Content", "Revenue"]}
            />
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full text-white shrink-0" style={{ background: "var(--accent)" }}>
              <FileText size={13} /> New Report
            </button>
          </div>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="ad-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--teal-soft)", color: "var(--teal)" }}><CheckCircle2 size={18} /></div>
          <div><div className="text-lg font-display font-bold font-mono" style={{ color: "var(--ink)" }}>{readyCount}</div><div className="text-xs" style={{ color: "var(--muted)" }}>Ready to export</div></div>
        </div>
        <div className="ad-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}><Loader2 size={18} /></div>
          <div><div className="text-lg font-display font-bold font-mono" style={{ color: "var(--ink)" }}>{reportsData.filter(r => r.status === "Processing").length}</div><div className="text-xs" style={{ color: "var(--muted)" }}>Processing</div></div>
        </div>
        <div className="ad-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--rose-soft)", color: "var(--rose)" }}><AlertCircle size={18} /></div>
          <div><div className="text-lg font-display font-bold font-mono" style={{ color: "var(--ink)" }}>{reportsData.filter(r => r.status === "Failed").length}</div><div className="text-xs" style={{ color: "var(--muted)" }}>Failed — retry needed</div></div>
        </div>
      </div>
      <ReportsTable data={filtered} />
    </div>
  );
};
const GrowthTrendDashboard = () => {
  return (
    <div className="space-y-6">

      <SectionHeader
        eyebrow="Growth & Trends"
        title="Growth & Trend Analysis"
        subtitle="Monitor social media growth, trending hashtags, reach prediction and AI insights."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="ad-card p-5">
          <h3 className="font-semibold">Growth Rate</h3>
          <h1 className="text-3xl font-bold text-green-600">+38%</h1>
          <p>This Month</p>
        </div>

        <div className="ad-card p-5">
          <h3 className="font-semibold">Trend Score</h3>
          <h1 className="text-3xl font-bold text-blue-600">92%</h1>
          <p>AI Prediction</p>
        </div>

        <div className="ad-card p-5">
          <h3 className="font-semibold">Reach Prediction</h3>
          <h1 className="text-3xl font-bold">1.2M</h1>
          <p>Next 30 Days</p>
        </div>

        <div className="ad-card p-5">
          <h3 className="font-semibold">Best Posting Time</h3>
          <h2 className="text-xl font-bold">7 PM – 9 PM</h2>
          <p>Highest Engagement</p>
        </div>

      </div>

      {/* Trending Hashtags */}
      <div className="ad-card p-6">
        <h2 className="text-xl font-bold mb-4">🔥 Trending Hashtags</h2>

        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-2 rounded-full bg-blue-100">#AI</span>
          <span className="px-3 py-2 rounded-full bg-pink-100">#MachineLearning</span>
          <span className="px-3 py-2 rounded-full bg-green-100">#SocialMedia</span>
          <span className="px-3 py-2 rounded-full bg-yellow-100">#Viral</span>
          <span className="px-3 py-2 rounded-full bg-purple-100">#Creator</span>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="ad-card p-6">
        <h2 className="text-xl font-bold mb-4">🤖 AI Trend Suggestions</h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Post between 7 PM and 9 PM.</li>
          <li>Use 3–5 trending hashtags.</li>
          <li>Short-form videos have higher reach.</li>
          <li>AI predicts 38% audience growth.</li>
        </ul>
      </div>

    </div>
  );
};
/* ============================================================
   APP ROOT
   ============================================================ */
export default function AnalyticsDashboard() {
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle = NAV_ITEMS.find((n) => n.key === active)?.label || "Dashboard";

  const renderPage = () => {
    switch (active) {
      case "content": return <ContentAnalytics />;
      case "audience": return <AudienceAnalytics />;
      case "growth": return <GrowthTrendDashboard />;
      case "reports": return <Reports />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="ad-root flex min-h-screen w-full">
      <GlobalStyle />
      <Sidebar
        active={active} setActive={setActive}
        collapsed={collapsed} setCollapsed={setCollapsed}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={pageTitle} setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-4 md:p-7 ad-animate-in" key={active}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
