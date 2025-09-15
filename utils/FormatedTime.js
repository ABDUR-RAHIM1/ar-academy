export function formatTime12Hour(time24) {
    if (!time24) return "N/A";
    let [hour, minute] = time24.split(":");
    hour = parseInt(hour);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
}


