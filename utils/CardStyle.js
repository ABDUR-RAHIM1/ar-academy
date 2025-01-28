
export const cardStyle = (text) => {
    const length = text.length;
    if (length > 15) return "border-l-red-500";
    if (length > 10) return "border-l-purple-500";
    if (length > 8) return "border-l-green-500";
    if (length > 5) return "border-l-blue-500";
    return "border-l-pink-500";
}; 