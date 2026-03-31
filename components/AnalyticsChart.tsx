"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, Eye, RefreshCw, Users } from "lucide-react";

interface AnalyticsPoint {
  date: string;
  activeUsers: number;
  newUsers: number;
  sessions: number;
  engagementRate: number;
  pageViews: number;
}

interface AnalyticsSummary {
  totalActiveUsers: number;
  totalNewUsers: number;
  totalSessions: number;
  totalPageViews: number;
  averageEngagementRate: number;
  peakActiveUsers: number;
  activeUserTrend: number;
}

interface AnalyticsApiResponse {
  range: number;
  summary: AnalyticsSummary;
  series: AnalyticsPoint[];
}

type RangeOption = 7 | 30 | 90;
type ChartMetric = "activeUsers" | "sessions" | "pageViews";

const RANGE_OPTIONS: RangeOption[] = [7, 30, 90];

const METRIC_CONFIG: Record<ChartMetric, { label: string; stroke: string; fill: string }> = {
  activeUsers: {
    label: "Active Users",
    stroke: "#2563eb",
    fill: "#dbeafe",
  },
  sessions: {
    label: "Sessions",
    stroke: "#16a34a",
    fill: "#dcfce7",
  },
  pageViews: {
    label: "Page Views",
    stroke: "#7c3aed",
    fill: "#ede9fe",
  },
};

function formatDateLabel(rawDate: string): string {
  if (!/^\d{8}$/.test(rawDate)) return rawDate;

  const year = Number(rawDate.slice(0, 4));
  const month = Number(rawDate.slice(4, 6)) - 1;
  const day = Number(rawDate.slice(6, 8));
  const date = new Date(year, month, day);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

interface MiniLineChartProps {
  data: AnalyticsPoint[];
  metric: ChartMetric;
  color: string;
}

function MiniLineChart({ data, metric, color }: MiniLineChartProps) {
  const width = 760;
  const height = 280;
  const padding = { top: 16, right: 16, bottom: 36, left: 40 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const values = data.map((point) => point[metric]);
  const maxValue = Math.max(...values, 1);
  const minValue = 0;

  const xForIndex = (index: number) => {
    if (data.length <= 1) return padding.left;
    return padding.left + (index / (data.length - 1)) * innerWidth;
  };

  const yForValue = (value: number) => {
    const ratio = (value - minValue) / (maxValue - minValue || 1);
    return padding.top + (1 - ratio) * innerHeight;
  };

  const points = data
    .map((point, index) => `${xForIndex(index)},${yForValue(point[metric])}`)
    .join(" ");

  const areaPoints = `${padding.left},${padding.top + innerHeight} ${points} ${
    padding.left + innerWidth
  },${padding.top + innerHeight}`;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const value = Math.round(minValue + (maxValue - minValue) * ratio);
    const y = padding.top + (1 - ratio) * innerHeight;
    return { value, y };
  });

  const dateLabels = [
    { index: 0, label: formatDateLabel(data[0]?.date ?? "") },
    { index: Math.floor((data.length - 1) / 2), label: formatDateLabel(data[Math.floor((data.length - 1) / 2)]?.date ?? "") },
    { index: Math.max(data.length - 1, 0), label: formatDateLabel(data[Math.max(data.length - 1, 0)]?.date ?? "") },
  ];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" role="img" aria-label="Analytics trend chart">
      <defs>
        <linearGradient id="miniChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0.05} />
        </linearGradient>
      </defs>

      {ticks.map((tick) => (
        <g key={`tick-${tick.y}`}>
          <line x1={padding.left} y1={tick.y} x2={padding.left + innerWidth} y2={tick.y} stroke="#e5e7eb" strokeDasharray="3 4" />
          <text x={padding.left - 8} y={tick.y + 4} textAnchor="end" fontSize="11" fill="#6b7280">
            {tick.value}
          </text>
        </g>
      ))}

      <polygon points={areaPoints} fill="url(#miniChartFill)" />
      <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />

      {data.map((point, index) => (
        <circle
          key={`${point.date}-${index}`}
          cx={xForIndex(index)}
          cy={yForValue(point[metric])}
          r="3"
          fill={color}
          className="opacity-80"
        />
      ))}

      {dateLabels.map((item, index) => (
        <text
          key={`label-${index}-${item.index}`}
          x={xForIndex(item.index)}
          y={height - 12}
          textAnchor={index === 0 ? "start" : index === 2 ? "end" : "middle"}
          fontSize="11"
          fill="#6b7280"
        >
          {item.label}
        </text>
      ))}
    </svg>
  );
}

export default function AnalyticsChart() {
  const [data, setData] = useState<AnalyticsPoint[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [selectedRange, setSelectedRange] = useState<RangeOption>(30);
  const [selectedMetric, setSelectedMetric] = useState<ChartMetric>("activeUsers");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/analytics?range=${selectedRange}`, {
        cache: "no-store",
      });

      const payload = (await response.json()) as AnalyticsApiResponse | { error?: string };

      if (!response.ok) {
        throw new Error((payload as { error?: string }).error ?? "Failed to load analytics");
      }

      const analyticsPayload = payload as AnalyticsApiResponse;
      setData(Array.isArray(analyticsPayload.series) ? analyticsPayload.series : []);
      setSummary(analyticsPayload.summary ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load analytics");
    } finally {
      setLoading(false);
    }
  }, [selectedRange]);

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  const chartData = useMemo(
    () => data.map((point) => ({ ...point, label: formatDateLabel(point.date) })),
    [data]
  );

  const metricConfig = METRIC_CONFIG[selectedMetric];
  const trend = summary?.activeUserTrend ?? 0;
  const trendLabel = trend > 0 ? `+${trend}%` : `${trend}%`;
  const trendColor = trend > 0 ? "text-emerald-600" : trend < 0 ? "text-rose-600" : "text-gray-600";

  const metricCards = [
    {
      title: "Active Users",
      value: summary?.totalActiveUsers ?? 0,
      subtitle: `Peak ${summary?.peakActiveUsers ?? 0}`,
      icon: <Users className="w-4 h-4 text-blue-600" />,
    },
    {
      title: "New Users",
      value: summary?.totalNewUsers ?? 0,
      subtitle: `${selectedRange} day window`,
      icon: <ArrowUpRight className="w-4 h-4 text-indigo-600" />,
    },
    {
      title: "Sessions",
      value: summary?.totalSessions ?? 0,
      subtitle: "Total sessions",
      icon: <Activity className="w-4 h-4 text-green-600" />,
    },
    {
      title: "Page Views",
      value: summary?.totalPageViews ?? 0,
      subtitle: "Tracked views",
      icon: <Eye className="w-4 h-4 text-violet-600" />,
    },
  ];

  const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);
  const formatRate = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Website Analytics</h2>
          <p className="text-sm text-gray-500">Traffic and engagement trends from Google Analytics</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {RANGE_OPTIONS.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                selectedRange === range
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {range} days
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {metricCards.map((card) => (
          <div key={card.title} className="rounded-lg border border-gray-200 bg-gray-50/70 px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{card.title}</p>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(card.value)}</p>
            <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">Active user trend:</span>
          <span className={`font-semibold ${trendColor}`}>{trendLabel}</span>
          <span className="text-gray-500">vs previous period split</span>
        </div>

        <div className="flex items-center gap-2">
          {(Object.keys(METRIC_CONFIG) as ChartMetric[]).map((metric) => (
            <button
              key={metric}
              type="button"
              onClick={() => setSelectedMetric(metric)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                selectedMetric === metric
                  ? "text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              style={
                selectedMetric === metric ? { backgroundColor: METRIC_CONFIG[metric].stroke } : undefined
              }
            >
              {METRIC_CONFIG[metric].label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              void loadAnalytics();
            }}
            className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Refresh analytics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-4 rounded-lg border border-gray-200 p-3">
          {loading && <p className="text-sm text-gray-500">Loading analytics...</p>}

          {!loading && error && <p className="text-sm text-red-600">Could not load analytics: {error}</p>}

          {!loading && !error && chartData.length === 0 && (
            <p className="text-sm text-gray-500">No analytics data available yet.</p>
          )}

          {!loading && !error && chartData.length > 0 && (
            <div className="h-72 w-full">
              <MiniLineChart data={chartData} metric={selectedMetric} color={metricConfig.stroke} />
            </div>
          )}
        </div>

        <div className="xl:col-span-1 rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Engagement Snapshot</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Avg engagement rate</p>
              <p className="text-xl font-bold text-gray-900">{formatRate(summary?.averageEngagementRate ?? 0)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Peak daily users</p>
              <p className="text-xl font-bold text-gray-900">{formatNumber(summary?.peakActiveUsers ?? 0)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Selected range</p>
              <p className="text-xl font-bold text-gray-900">{selectedRange} days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
