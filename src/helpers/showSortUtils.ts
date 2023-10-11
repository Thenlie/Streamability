import { ShowData } from '../types';

/**
 * Sort an array of shows based on the vote count.
 * The least votes will be first, the most will be last
 * @param showData | array of shows to be sorted
 * @returns | array of sorted shows
 */
const sortShowsByRatingCountAsc = (showData: ShowData[]): ShowData[] => {
    showData.sort((a, b) => (a.vote_count || 0) - (b.vote_count || 0));
    return showData;
};

/**
 * Sort an array of shows based on the vote count.
 * The most votes will be first, the least will be last
 * @param showData | array of shows to be sorted
 * @returns | array of sorted shows
 */
const sortShowsByRatingCountDesc = (showData: ShowData[]): ShowData[] => {
    showData.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
    return showData;
};

/**
 * Sort an array of shows based on the average rating.
 * The lowest average will be first, the highest will be last
 * @param showData | array of shows to be sorted
 * @returns | array of sorted shows
 */
const sortShowsByAvgRatingAsc = (showData: ShowData[]): ShowData[] => {
    showData.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
    return showData;
};

/**
 * Sort an array of shows based on the average rating.
 * The highest average will be first, the lowest will be last
 * @param showData | array of shows to be sorted
 * @returns | array of sorted shows
 */
const sortShowsByAvgRatingDesc = (showData: ShowData[]): ShowData[] => {
    showData.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    return showData;
};

/**
 * Sort an array of shows based on the release date.
 * The oldest date will be first, the newest will be last
 * @param showData | array of shows to be sorted
 * @returns | array of sorted shows
 */
const sortShowsByReleaseDateAsc = (showData: ShowData[]): ShowData[] => {
    showData.sort(
        (a, b) => new Date(a.release_date || 0).getTime() - new Date(b.release_date || 0).getTime()
    );
    return showData;
};

/**
 * Sort an array of shows based on the release date.
 * The newest date will be first, the oldest will be last
 * @param showData | array of shows to be sorted
 * @returns | array of sorted shows
 */
const sortShowsByReleaseDateDesc = (showData: ShowData[]): ShowData[] => {
    showData.sort(
        (a, b) => new Date(b.release_date || 0).getTime() - new Date(a.release_date || 0).getTime()
    );
    return showData;
};

/**
 * Sort an array of shows alphabetically.
 * @param showData | array of shows to be sorted
 * @returns | array of sorted shows
 */
const sortShowsAlphaAsc = (showData: ShowData[]): ShowData[] => {
    showData.sort((a, b) => a.title.localeCompare(b.title));
    return showData;
};

/**
 * Sort an array of shows reverse alphabetically.
 * @param showData | array of shows to be sorted
 * @returns | array of sorted shows
 */
const sortShowsAlphaDesc = (showData: ShowData[]): ShowData[] => {
    showData.sort((a, b) => b.title.localeCompare(a.title));
    return showData;
};

export {
    sortShowsByRatingCountAsc,
    sortShowsByRatingCountDesc,
    sortShowsByAvgRatingAsc,
    sortShowsByAvgRatingDesc,
    sortShowsByReleaseDateAsc,
    sortShowsByReleaseDateDesc,
    sortShowsAlphaAsc,
    sortShowsAlphaDesc,
};
