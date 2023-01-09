import { useEffect, useState } from 'react';
import { ShowProviders, ShowData } from '../types';
import { getMovieProviders } from '../helpers/getMovieUtils';
import { getTvProviders } from '../helpers/getTvUtils';

interface ProviderProps {
    details: ShowData;
}

/**
 * Component to display streaming services logos for a given movie or show. Accepts an ID and
 * @returns {JSX.Element}
 */
export default function Providers({ details }: ProviderProps): JSX.Element {
    const [providers, setProviders] = useState<ShowProviders>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const handler = async () => {
            if (details.id && details.networks === undefined) {
                const data = await getMovieProviders(details.id);
                setProviders(data);
            } else if (details.id && details.networks !== undefined) {
                const data = await getTvProviders(details.id);
                setProviders(data);
            }
            setLoading(false);
        };
        handler();
    }, []);

    // TODO: #210 Create loader component
    if (loading) return <p>Loading</p>;

    return (
        <div className='flex justify-center'>
            {providers?.results?.US?.flatrate ? (
                providers.results.US.flatrate.map((item, i) => (
                    <img
                        className='h-16 w-16'
                        key={i}
                        src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                        alt={`${item.provider_name} logo`}
                    ></img>
                ))
            ) : (
                <span>Sorry, no providers available for this show.</span>
            )}
        </div>
    );
}
