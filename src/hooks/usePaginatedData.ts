import { useEffect, useState } from 'react';
import { MovieData, ShowData, ShowResults, TvData } from '../types';
import Logger from '../logger';

const LOG = new Logger('usePaginatedData');

interface PaginatedDataProps {
    /**
     * Search query for TMDB
     */
    query: string;
}

/**
 * Custom hook to handle TMDB data pagination.
 * Initially returns the first page of search results
 * along with a function to fetch the next page.
 */
const usePaginatedData = ({ query }: PaginatedDataProps) => {
    LOG.debug('Query:', query);
    const [data, setData] = useState<ShowData[] | null>(null);
    const [moreToFetch, setMoreToFetch] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const refetch = () => {
        const fetchHandler = async () => {
            if (!moreToFetch) return;
            setLoading(true);

            const response = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=${
                    import.meta.env.VITE_MOVIEDB_KEY
                }&language=en-US&query=${query}&page=${page}&include_adult=false`
            );
            if (!response.ok) {
                LOG.error(
                    'Error fetching next page of data!' + response.status + response.statusText
                );
                setLoading(false);
                return;
            }

            const json = (await response.json()) as ShowResults;
            if (!json.results) {
                setLoading(false);
                return;
            }

            const nextPage: ShowData[] = json.results.map((show) => {
                return {
                    id: show.id,
                    poster_path: show.poster_path,
                    vote_average: show.vote_average,
                    vote_count: show.vote_count,
                    overview: show.overview,
                    media_type: show.media_type,
                    genre_ids: show.genre_ids,
                    title:
                        show.media_type === 'movie'
                            ? (show as MovieData).title
                            : (show as TvData).name,
                    release_date:
                        show.media_type === 'movie'
                            ? (show as MovieData).release_date
                            : (show as TvData).first_air_date,
                };
            });

            // Get previous pages from local storage if they exist and not on first page
            const storageItem =
                page !== 1 ? localStorage.getItem('streamabilityUnsortedResults') : null;
            const cacheData = storageItem ? JSON.parse(storageItem) : null;
            const newData = data ? [...data, ...nextPage] : nextPage;
            localStorage.setItem(
                'streamabilityUnsortedResults',
                cacheData ? JSON.stringify([...cacheData, ...nextPage]) : JSON.stringify(nextPage)
            );

            setMoreToFetch(json.total_pages > page);
            setPage((prev) => prev + 1);
            LOG.debug('Hook 1');
            setData(newData);
            setLoading(false);
        };
        fetchHandler();
    };

    // Manually trigger the fetch when getting the first page
    useEffect(() => {
        if (page === 1) refetch();
    }, [page]);

    // Reset the state when the query changes
    useEffect(() => {
        // on page refresh, skip

        localStorage.setItem('streamabilityUnsortedResults', '');
        setPage(1);
        LOG.debug('Hook 2');
        setData(null);
        setMoreToFetch(true);
        setLoading(true);
    }, [query]);

    return { data, setData, loading, moreToFetch, refetch };
};

export default usePaginatedData;
