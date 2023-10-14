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
const useGetProfileArray = (whichCol: ProfileArrayCols): ShowData[] | null => {
    const { session } = useSessionContext();
    const { profile } = useProfileContext();
    const [data, setData] = useState<ShowData[] | null>(null);

    useEffect(() => {
        const handler = async () => {
            if (!session || !profile) return;
            const array = await getProfileArray(profile.id, whichCol);
            if (!array) return;
            const arr: ShowData[] = [];
            for (let i = 0; i < array.length; i++) {
                if (array[i].includes('tv-')) {
                    const tvShow = await getTvDetails(parseInt(array[i].slice(3)));
                    arr.push(tvShow);
                } else {
                    const movie = await getMovieDetails(parseInt(array[i].slice(6)));
                    arr.push(movie);
                }
            }
            setData(arr);
        };
        handler();
    }, [session, profile]);

    return data;
};

export default useGetProfileArray;
