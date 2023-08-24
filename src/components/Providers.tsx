import { useEffect, useState } from 'react';
import { ShowProviders } from '../types';
import { getMovieProviders, getTvProviders } from '../helpers';
import ProvidersPlaceholder from './ProvidersPlaceholder';

interface ProviderProps {
    id: number;
    showType: string;
}

/**
 * Displays streaming service logos for a given show
 *
 * @param id | TMDB id
 * @param showType | 'movie' or 'tv'
 * @returns {JSX.Element}
 */
export default function Providers({ id, showType }: ProviderProps): JSX.Element {
    const [providers, setProviders] = useState<ShowProviders>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const handler = async () => {
            if (showType === 'movie') {
                const data = await getMovieProviders(id);
                setProviders(data);
            } else {
                const data = await getTvProviders(id);
                setProviders(data);
            }
            setLoading(false);
        };
        handler();
    }, [id]);

    if (loading) {
        return (
            <div className='flex justify-center'>
                <ProvidersPlaceholder count={3} />
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center bg-primary h-[72px] p-1 rounded-sm'>
            {providers?.results?.US?.flatrate ? (
                providers.results.US.flatrate.map((item, i) => (
                    <div key={i} className='m-1'>
                        <img
                            className='h-16 w-16 p-1 rounded-lg overflow-hidden'
                            src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                            alt={`${item.provider_name} logo`}
                        ></img>
                    </div>
                ))
            ) : (
                <span className='p-2'>Sorry, no providers available for this show.</span>
            )}
        </div>
    );
}
