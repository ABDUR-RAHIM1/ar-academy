const uniqueColors = [
  "#f43f5e", // Rose
  "#a855f7", // Purple
  "#4ade80", // Lime
  "#38bdf8", // Sky Blue
  "#f59e0b", // Amber
  "#14b8a6", // Teal
  "#f97316", // Orange
  "#e11d48", // Red
  "#8b5cf6", // Indigo
  "#10b981", // Emerald
  "#6366f1", // Indigo-500
  "#ec4899", // Pink
  "#84cc16", // Lime Green
  "#22c55e", // Green
  "#0ea5e9", // Light Blue
  "#c084fc", // Violet
  "#ef4444", // Soft Red
  "#fb923c", // Warm Orange
  "#facc15", // Yellow
  "#3b82f6", // Blue
  "#e879f9", // Fuchsia
  "#06b6d4", // Cyan
  "#7c3aed", // Deep Violet
  "#f87171", // Light Coral
  "#4c1d95", // Dark Purple
];

export const cardStyle = (index) => {
  // Index যত বড় হোক না কেন, color repeat করবে না যতক্ষণ না list শেষ হয়
  if (index >= uniqueColors.length) {
    return "#6b7280"; // Default Gray for overflow
  }
  return uniqueColors[index];
};


// export const cardStyle = (text) => {
//     const length = text.length;
//     if (length > 15) return "#f43f5e"; // Rose
//     if (length > 10) return "#a855f7"; // Purple (soft neon)
//     if (length > 8) return "#4ade80";  // Light green (lime tone)
//     if (length > 5) return "#38bdf8";  // Sky Blue
//     return "#f59e0b"; // Amber (warm golden)
// };
