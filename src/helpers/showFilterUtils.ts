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
        if (showDate.getFullYear() < targetDate.getFullYear()) {
            filteredShows.push(show);
            return;
        }
        if (showDate.getFullYear() === targetDate.getFullYear()) {
            if (showDate.getMonth() < targetDate.getMonth()) {
                filteredShows.push(show);
                return;
            }
            if (showDate.getMonth() === targetDate.getMonth()) {
                if (showDate.getDay() <= targetDate.getDay()) {
                    filteredShows.push(show);
                }
            }
        }
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
        if (showDate.getFullYear() > targetDate.getFullYear()) {
            filteredShows.push(show);
            return;
        }
        if (showDate.getFullYear() === targetDate.getFullYear()) {
            if (showDate.getMonth() > targetDate.getMonth()) {
                filteredShows.push(show);
                return;
            }
            if (showDate.getMonth() === targetDate.getMonth()) {
                if (showDate.getDay() >= targetDate.getDay()) {
                    filteredShows.push(show);
                }
            }
        }
    });
    return filteredShows;
};

export {
    filterShowsByGenre,
    filterShowsByType,
    filterShowsByReleasedBefore,
    filterShowsByReleasedAfter,
};
