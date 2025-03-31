import type { ShowData, Season } from '../types';

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
 * @param showType | movie, tv or both
 * @returns | array of shows that are a `showType`
 */
const filterShowsByType = (showData: ShowData[], showType: 'movie' | 'tv' | 'both'): ShowData[] => {
    const filteredShows: ShowData[] = [];

    if (showType === 'both') {
        showData.forEach((show) => {
            if (show.media_type === 'movie' || show.media_type === 'tv') {
                filteredShows.push(show);
            }
        });
    } else {
        showData.forEach((show) => {
            if (show.media_type === showType) {
                filteredShows.push(show);
            }
        });
    }

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

/**
 * Filter an array of shows based on a specified vote average
 * Return shows that are on at or above the specified vote average
 * @param showData | array of shows to be filtered
 * @param targetAverage | average to be filtered
 * @returns array of shows at or above `targetAverage`
 */
const filterShowsByAvgRatingAbove = (showData: ShowData[], targetAverage: number): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.vote_average === undefined) return;
        if (show.vote_average >= targetAverage) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

/**
 * Filter an array of shows based on a specified vote average
 * Return shows that are on at or below the specified vote average
 * @param showData | array of shows to be filtered
 * @param targetAverage | average to be filtered
 * @returns array of shows at or below `targetAverage`
 */
const filterShowsByAvgRatingBelow = (showData: ShowData[], targetAverage: number): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.vote_average === undefined) return;
        if (show.vote_average <= targetAverage) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

/**
 * Filter an array of shows based on a specified range of vote averages
 * Return shows that are on at or between the specified vote average range
 * @param showData | array of shows to be filtered
 * @param averageFrom | average to be filtered from
 * @param averageTo | average to be filtered up to
 * @returns array of shows at or between `averageFrom` - `averageTo`
 */
const filterShowsByAvgRatingBetween = (
    showData: ShowData[],
    averageFrom: number,
    averageTo: number
): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.vote_average === undefined) return;
        if (show.vote_average >= averageFrom && show.vote_average <= averageTo) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

/**
 * Filter an array of shows based on a specified number of votes
 * Return shows that have the same or more number of votes
 * @param showData | array of shows to be filtered
 * @param targetCount | average to be filtered
 * @returns array of shows at or above `targetCount`
 */
const filterShowsByRatingCountAbove = (showData: ShowData[], targetCount: number): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.vote_count === undefined) return;
        if (show.vote_count >= targetCount) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

/**
 * Filter an array of shows based on a specified number of votes
 * Return shows that are on at or below the specified vote average
 * @param showData | array of shows to be filtered
 * @param targetCount | average to be filtered
 * @returns array of shows at or below `targetCount`
 */
const filterShowsByRatingCountBelow = (showData: ShowData[], targetCount: number): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.vote_count === undefined) return;
        if (show.vote_count <= targetCount) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

/**
 * Filter an array of shows based on a range of number of votes
 * Return shows that are on at or between the specified number of votes range
 * @param showData | array of shows to be filtered
 * @param countFrom | average to be filtered from
 * @param countTo | average to be filtered up to
 * @returns array of shows at or between `countFrom` - `countTo`
 */
const filterShowsByRatingCountBetween = (
    showData: ShowData[],
    countFrom: number,
    countTo: number
): ShowData[] => {
    const filteredShows: ShowData[] = [];
    showData.forEach((show) => {
        if (show.vote_count === undefined) return;
        if (show.vote_count >= countFrom && show.vote_count <= countTo) {
            filteredShows.push(show);
        }
    });
    return filteredShows;
};

/**
 * Returns valid list of seasons by removing untraditional entries provided by TMDB
 * I.E. 'Specials' and unreleased seasons
 * @param seasons
 * @returns {Season[]}
 */
const filterValidSeasons = (seasons: Season[]): Season[] => {
    return seasons.filter((item) => item.season_number != 0 && item.air_date);
};

export {
    filterShowsByGenre,
    filterShowsByType,
    filterShowsByReleasedBefore,
    filterShowsByReleasedAfter,
    filterShowsByReleasedBetween,
    filterShowsByAvgRatingAbove,
    filterShowsByAvgRatingBelow,
    filterShowsByAvgRatingBetween,
    filterShowsByRatingCountAbove,
    filterShowsByRatingCountBelow,
    filterShowsByRatingCountBetween,
    filterValidSeasons,
};
