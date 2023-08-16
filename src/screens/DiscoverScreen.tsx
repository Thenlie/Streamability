import { useState, useEffect } from 'react';
import { getMovieTrending } from '../helpers/getMovieUtils';
import { getTvTrending } from '../helpers/getTvUtils';
import { ShowData } from '../types';
import { ShowCard } from '../components';
import { useProfileContext } from '../hooks';
/**
 * Requests trending movies, passing data to ShowCard components.
 * @returns {JSX.Element}
 */
export default function DiscoverScreen(): JSX.Element {
    const { profile, setProfile } = useProfileContext();
    const [movieTrending, setMovieTrending] = useState<ShowData[] | null>(null);
    const [tvTrending, setTvTrending] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const handler = async () => {
            const movieData: ShowData[] | null = await getMovieTrending();
            setMovieTrending(movieData);
            const tvData: ShowData[] | null = await getTvTrending();
            setTvTrending(tvData);
            setLoading(false);
        };
        handler();
    }, []);
    // TODO: #194 Make skeleton loading screen
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {movieTrending?.map(
                // TODO: make showType dynamic
                (item, i) =>
                    item && (
                        <ShowCard
                            key={i}
                            details={item}
                            showType='movie'
                            profile={profile}
                            setProfile={setProfile}
                        />
                    )
            )}
            {tvTrending?.map(
                // TODO: make showType dynamic
                (item, i) =>
                    item && (
                        <ShowCard
                            key={i}
                            details={item}
                            showType='tv'
                            profile={profile}
                            setProfile={setProfile}
                        />
                    )
            )}
        </div>
    );
}
