import { MOVIE_RATINGS, GENRE_IDS } from './constants';
import { formatReleaseDate, DateSize } from './dateFormatUtils';
import {
    getMoviesByName,
    getMovieDetails,
    getMovieProviders,
    getMovieRecommendations,
    getMovieTrending,
} from './getMovieUtils';
import { getShowsByName } from './getShowUtils';
import {
    getTvByName,
    getTvDetails,
    getTvTrending,
    getTvProviders,
    getTvRecommendations,
} from './getTvUtils';
import {
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
} from './showFilterUtils';
import { pluralizeString } from './stringFormatUtils';
import { SUPABASE } from './supabaseClient';

export {
    MOVIE_RATINGS,
    GENRE_IDS,
    formatReleaseDate,
    DateSize,
    getMoviesByName,
    getMovieDetails,
    getMovieProviders,
    getMovieRecommendations,
    getMovieTrending,
    getShowsByName,
    getTvByName,
    getTvDetails,
    getTvTrending,
    getTvProviders,
    getTvRecommendations,
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
    pluralizeString,
    SUPABASE,
};
