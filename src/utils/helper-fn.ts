import { format, parseISO } from 'date-fns';
export const timeAgo = (timestamp: string) => {
    if (!timestamp) return
    const date = parseISO(timestamp);
    return format(date, 'hh:mm a');
}