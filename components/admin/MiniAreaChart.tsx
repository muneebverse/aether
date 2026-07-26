'use client';

// Dependency-free SVG area chart — avoids adding recharts/chart.js just for
// one dashboard widget. Renders a smooth-ish area + line from a simple
// array of { label, value } points.
export default function MiniAreaChart({
  data,
  height = 180,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center text-sm text-neutral" style={{ height }}>
        No data yet
      </div>
    );
  }

  const width = 600;
  const padding = 24;
  const max = Math.max(...data.map((d) => d.value), 1);
  const stepX = (width - padding * 2) / Math.max(data.length - 1, 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = padding + (1 - d.value / max) * (height - padding * 2);
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00BCD4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaFill)" />
      <path d={linePath} fill="none" stroke="#00BCD4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#0097A7" />
      ))}
    </svg>
  );
}
