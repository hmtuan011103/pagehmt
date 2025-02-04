/**
 * Format datetime string to Vietnamese format
 * @param {string} dateTimeStr - Datetime string in format YYYY-MM-DD HH:mm:ss
 * @returns {string} Formatted string like "19h15p - 12 tháng 12, 2024"
 */
export const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';

    const date = new Date(dateTimeStr);

    // Check if date is valid
    if (isNaN(date.getTime())) return '';

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day} tháng ${month}, ${year} lúc ${hours}:${minutes}`;
};

/**
 * Get relative time from datetime string
 * @param {string} dateTimeStr - Datetime string in format YYYY-MM-DD HH:mm:ss
 * @returns {string} Relative time like "2 giờ trước", "3 ngày trước", etc.
 */
export const getRelativeTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';

    const date = new Date(dateTimeStr);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const diff = now - date;

    // Convert to minutes
    const minutes = Math.floor(diff / 1000 / 60);

    if (minutes < 60) return `${minutes} phút trước`;

    // Convert to hours
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;

    // Convert to days
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} ngày trước`;

    // Convert to months
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} tháng trước`;

    // Convert to years
    const years = Math.floor(months / 12);
    return `${years} năm trước`;
};

export function daysSinceJan8_2025() {
    const targetDate = new Date(2024, 11, 12);
    const currentDate = new Date();

    const differenceInTime = currentDate - targetDate;
    return Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
}
