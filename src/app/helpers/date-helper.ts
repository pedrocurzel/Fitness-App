export function getDay(date: Date) {
    return date.getDate().toString().padStart(2, "0");
}

export function getMonth(date: Date) {
    return (date.getMonth() + 1).toString().padStart(2, "0");
}

export function getYear(date: Date) {
    return date.getFullYear().toString();
}

export function getFullDate(date: Date) {
    return `${getDay(date)}/${getMonth(date)}/${getYear(date)}`;
}