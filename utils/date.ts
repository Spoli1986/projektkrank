import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const SITE_TIME_ZONE = 'Europe/Zurich';

/**
 * Returns the beginning of the current calendar day in the website's timezone.
 * Events remain upcoming for their entire listed date and become past the next day.
 */
export function getTodayBoundary(): Date {
  return dayjs().tz(SITE_TIME_ZONE).startOf('day').toDate();
}
