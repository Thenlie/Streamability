import { useEffect, useState } from 'react';
import { ProfileArrayCols, ShowData } from '../types';
import { getProfileArray } from '../supabase/profiles';
import { getMovieDetails, getTvDetails } from '../helpers';
import { useProfileContext, useSessionContext } from './context';

/**
 * Returns an array of show data from a given profile array column
 * for a logged in user
 * @param whichCol | The profile array to get
 * @returns {ShowData[] | null}
 */
const useGetProfileArray = (
    whichCol: ProfileArrayCols
): { data: ShowData[] | null; loading: boolean } => {
    const { session } = useSessionContext();
    const { profile } = useProfileContext();
    const [data, setData] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handler = async () => {
            if (!session) {
                return;
            }
            const array = await getProfileArray(session.user.id, whichCol);
            if (!array) {
                setLoading(false);
                return;
            }
            const arr: ShowData[] = [];
            for (let i = 0; i < array.length; i++) {
                if (array[i].includes('tv-')) {
                    const tvShow = await getTvDetails(parseInt(array[i].slice(3)));
                    if (tvShow) arr.push(tvShow);
                } else {
                    const movie = await getMovieDetails(parseInt(array[i].slice(6)));
                    if (movie) arr.push(movie);
                }
            }
            setData(arr);
            setLoading(false);
        };
        handler();
    }, [session, profile]);

    return { data, loading };
};

export default useGetProfileArray;
