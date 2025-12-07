/**
 * MetricBadge Component
 * 
 * Displays project metrics as small badges
 * Used to show conversion rates, revenue, time saved, etc.
 */

export default function MetricBadge({ metric, value }) {
  if (!value) return null;

  return (
    <div className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
      <span className="text-white text-[8px] sm:text-[10px] font-semibold">
        {value}
      </span>
    </div>
  );
}
