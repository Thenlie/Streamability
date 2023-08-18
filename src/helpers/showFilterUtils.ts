import { ShowData } from '../types';

/**
 * Filters an array of shows based on a specified genre ID
 * @param showData | array of shows to be filtered
 * @param genreId | genre ID to filter on
 * @returns | array of shows containing `genreId`
 */
const filterShowsByGenre = (showData: ShowData[], genreId: number): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.genre_ids?.includes(genreId)) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

/**
 * Filters an array of shows based on a specified show type
 * @param showData | array of shows to be filtered
 * @param showType | movie or tv
 * @returns | array of shows that are a `showType`
 */
const filterShowsByType = (showData: ShowData[], showType: 'movie' | 'tv'): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.showType === showType) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

/**
 * Returns if `checkDate` is on or before `targetDate`
 * @param targetDate | Date to compare
 * @param checkDate | Date to check
 * @returns {boolean}
 */
const isDateOnOrBefore = (targetDate: Date, checkDate: Date): boolean => {
    if (checkDate.getFullYear() < targetDate.getFullYear()) {
        return true;
    }
    if (checkDate.getFullYear() === targetDate.getFullYear()) {
        if (checkDate.getMonth() < targetDate.getMonth()) {
            return true;
        }
        if (checkDate.getMonth() === targetDate.getMonth()) {
            if (checkDate.getDay() <= targetDate.getDay()) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Returns if `checkDate` is on or after `targetDate`
 * @param targetDate | Date to compare
 * @param checkDate | Date to check
 * @returns {boolean}
 */
const isDateOnOrAfter = (targetDate: Date, checkDate: Date): boolean => {
    if (checkDate.getFullYear() > targetDate.getFullYear()) {
        return true;
    }
    if (checkDate.getFullYear() === targetDate.getFullYear()) {
        if (checkDate.getMonth() > targetDate.getMonth()) {
            return true;
        }
        if (checkDate.getMonth() === targetDate.getMonth()) {
            if (checkDate.getDay() >= targetDate.getDay()) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Filter an array of shows based on a specified release date
 * Return shows that are on or before the specified date
 * @param showData | array of shows to be filtered
 * @param releaseDate | date to be filtered on
 * @returns array of shows on or before `releaseDate`
 */
const filterShowsByReleasedBefore = (showData: ShowData[], releaseDate: string): ShowData[] => {
    const filteredShows: ShowData[] = [];
    const targetDate = new Date(releaseDate);
    showData.forEach((show) => {
        if (!show.release_date) return;
        const showDate = new Date(show.release_date);
        if (isDateOnOrBefore(targetDate, showDate)) filteredShows.push(show);
    });
    return filteredShows;
};

/**
 * Filter an array of shows based on a specified release date
 * Return shows that are on or after the specified date
 * @param showData | array of shows to be filtered
 * @param releaseDate | date to be filtered on
 * @returns array of shows on or after `releaseDate`
 */
const filterShowsByReleasedAfter = (showData: ShowData[], releaseDate: string): ShowData[] => {
    const filteredShows: ShowData[] = [];
    const targetDate = new Date(releaseDate);
    showData.forEach((show) => {
        if (!show.release_date) return;
        const showDate = new Date(show.release_date);
        if (isDateOnOrAfter(targetDate, showDate)) filteredShows.push(show);
    });
    return filteredShows;
};

/**
 * Filter an array of shows based on a range of release dates
 * Return shows that are on or between the specified dates
 * @param showData | array of shows to be filtered
 * @param releasedFrom | date to filter from
 * @param releasedTo | date to filter up to
 * @returns array of shows on or between `releasedFrom` - `releasedTo`
 */
const filterShowsByReleasedBetween = (
    showData: ShowData[],
    releasedFrom: string,
    releasedTo: string
): ShowData[] => {
    const filteredShows: ShowData[] = [];
    const releasedFromDate = new Date(releasedFrom);
    const releasedToDate = new Date(releasedTo);
    showData.forEach((show) => {
        if (!show.release_date) return;
        const showDate = new Date(show.release_date);
        if (
            isDateOnOrBefore(releasedToDate, showDate) &&
            isDateOnOrAfter(releasedFromDate, showDate)
        ) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

export {
    filterShowsByGenre,
    filterShowsByType,
    filterShowsByReleasedBefore,
    filterShowsByReleasedAfter,
    filterShowsByReleasedBetween,
};
