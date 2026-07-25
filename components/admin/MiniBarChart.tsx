'use client';

// Dependency-free SVG bar chart for the "Leads by Status" widget.
export default function MiniBarChart({
  data,
  height = 200,
}: {
  data: { label: string; value: number; color: string }[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end justify-around gap-4" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
          <span className="text-sm font-bold text-deep-ink">{d.value}</span>
          <div
            className="w-full max-w-[48px] rounded-t-md transition-all duration-500"
            style={{
              height: `${(d.value / max) * (height - 60)}px`,
              backgroundColor: d.color,
              minHeight: d.value > 0 ? '6px' : '2px',
            }}
          />
          <span className="text-xs text-deep-ink text-opacity-60 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
