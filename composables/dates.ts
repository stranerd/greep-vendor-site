import * as timeago from "timeago.js";
import { format, isToday, isYesterday } from "date-fns";
const specificTime = new Date("2024-10-13T10:54:00");

export const gpDates = {
  getTimeAgo(date: string | Date) {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return timeago.format(date);
    }
  },

  getFormattedDate(date: string | Date) {
    return format(date, "hh:mm a");
  },
};
