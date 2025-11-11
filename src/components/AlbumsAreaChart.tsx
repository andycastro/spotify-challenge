import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { SpotifyArtistAlbumsResponse } from '../api/types/spotifyTypes';

interface AlbumsAreaChartProps {
  data?: SpotifyArtistAlbumsResponse | null;
  loading: boolean;
}

interface TooltipPayloadItem {
  value: number;
}
interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="rounded border px-3 py-2 text-xs bg-white/90 backdrop-blur shadow dark:bg-neutral-900/90 dark:border-neutral-700">
      <p className="font-medium mb-1 text-neutral-800 dark:text-neutral-100">
        {label}
      </p>
      <p className="text-neutral-600 dark:text-neutral-300">
        Tracks: {item.value}
      </p>
    </div>
  );
};

export const AlbumsAreaChart: React.FC<AlbumsAreaChartProps> = ({
  data,
  loading,
}) => {
  const { t } = useTranslation('common');

  const chartData = useMemo(() => {
    if (!data) return [];
    const yearMap: Record<string, number> = {};
    data.items.forEach(album => {
      const year = (album.release_date || '').slice(0, 4) || '----';
      yearMap[year] = (yearMap[year] || 0) + (album.total_tracks || 0);
    });
    return Object.entries(yearMap)
      .map(([year, tracks]) => ({ year, tracks }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [data]);

  return (
    <div
      className="rounded-lg border p-4 space-y-4 bg-white border-green-500/10 shadow-[0_0_0_1px_rgba(16,16,16,0.05)] dark:bg-[#121212] dark:border-[#1ed7601a] dark:shadow-[0_0_0_1px_#1ed76010]"
      aria-label={t('albums.chart.title')}
    >
      <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {t('albums.chart.title')}
      </h2>
      {loading ? (
        <div className="h-64 w-full rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      ) : chartData.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t('albums.none')}
        </p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTracks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1db954" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#1db954" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeOpacity={0.15}
                strokeDasharray="3 3"
                stroke="#16a34a"
              />
              <XAxis
                dataKey="year"
                tick={{ fill: '#4b5563', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#d1d5db', strokeOpacity: 0.6 }}
              />
              <YAxis
                tick={{ fill: '#4b5563', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#d1d5db', strokeOpacity: 0.6 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="tracks"
                stroke="#1db954"
                strokeWidth={2}
                fill="url(#colorTracks)"
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AlbumsAreaChart;
