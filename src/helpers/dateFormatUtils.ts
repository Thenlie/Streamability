import { ShowData } from '../types';

enum DateSize {
    LONG,
    MEDIUM,
    SHORT,
}

enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

/**
 * Returns a suffix such as 'st', 'nd', 'rd', or 'th' for a given day of the month.
 * @param day | day of the month
 * @returns {string} | suffix of the given day
 */
const getDaySuffix = (day: number): string => {
    if (day === 1 || day === 21 || day === 31) {
        return 'st';
    } else if (day === 2 || day === 22) {
        return 'nd';
    } else if (day === 3 || day === 23) {
        return 'rd';
    } else {
        return 'th';
    }
};

/**
 * Format date returned from movieDB API request
 * @param date | movieDB date 'yyyy-mm-dd'
 * @param size | the size of the formatted string to be returned
 * @returns {string} | formatted date
 */
const formatReleaseDate = (date: string, size: DateSize): string => {
    const year = parseInt(date.slice(0, 4));
    const month = parseInt(date.slice(5, 7));
    const shortMonth = Months[month - 1].slice(0, 3);
    const day = parseInt(date.slice(8, 10));

    let formattedDate: string;
    switch (size) {
        case DateSize.LONG:
            formattedDate = `${Months[month - 1]} ${day + getDaySuffix(day)}, ${year}`;
            break;
        case DateSize.MEDIUM:
            formattedDate = `${shortMonth} ${day + getDaySuffix(day)}, ${year}`;
            break;
        case DateSize.SHORT:
            formattedDate = `${month}-${day}-${year}`;
            break;
    }
    return formattedDate;
};

/**
 * Determine the date N days ago in 'yyyy-mm-dd' format
 *
 * @param days | the number of days to look back, default 180
 * @returns {string} | formatted date
 */
const daysAgo = (days?: number): string => {
    if (!days) days = 180;

    const startDate = new Date();
    const dateOffset = startDate.getDate() - days;
    startDate.setDate(dateOffset);

    return startDate.toISOString().split('T')[0];
};

/**
 * Formats release date if movie
 * Formats runtime range if TV. If TV Show is ongoing, displays "YYYY - Present"
 * @param details | Details of show including release date
 */
const getReleaseDate = (details: ShowData): string | null => {
    if (!details.release_date || details.release_date.length !== 10) return null;

    if (details.media_type === 'movie') {
        return formatReleaseDate(details.release_date, DateSize.LONG);
    }

    if (details.media_type === 'tv' && details.next_air_date !== undefined) {
        return `${formatReleaseDate(details.release_date, DateSize.SHORT).slice(-4)} - Present`;
    } else if (details.end_date) {
        return `${formatReleaseDate(details.release_date, DateSize.SHORT).slice(
            -4
        )} - ${formatReleaseDate(details.end_date, DateSize.SHORT).slice(-4)}`;
    } else if (details.release_date) {
        return formatReleaseDate(details.release_date, DateSize.LONG);
    }

    return null;
};

export { formatReleaseDate, daysAgo, getReleaseDate, DateSize };
