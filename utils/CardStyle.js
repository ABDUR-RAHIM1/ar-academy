
export const cardStyle = (text) => {
    const length = text.length; 
    if (length > 15) return "#EF4444"; // Red
    if (length > 10) return "#A855F7"; // Purple
    if (length > 8) return "#10B981";  // Green
    if (length > 5) return "#3B82F6";  // Blue
    return "#EC4899"; // Pink
}; 