import { useEffect, useState } from 'react';
import { ShowProviders } from '../types';
import { getMovieProviders, getTvProviders } from '../helpers';
import ProvidersPlaceholder from './ProvidersPlaceholder';
import { useWindowSize } from '../hooks';
import useDebounceValue from '../hooks/useDebounceValue';

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
    const windowSize = useWindowSize();
    const debouncedWindowSize = useDebounceValue(windowSize, 250);
    const [providers, setProviders] = useState<ShowProviders>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        const containerWidth =
            document.getElementById('provider-container')?.getBoundingClientRect().width || 0;
        const providerWidth = (providers?.results.US?.flatrate?.length || 0) * 70;
        if (providerWidth > containerWidth) setIsOverflow(true);
        else setIsOverflow(false);
    }, [debouncedWindowSize, providers]);

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
        <div
            id='provider-container'
            className={`flex items-center bg-primary p-1 rounded-sm ${
                isOverflow ? 'overflow-x-scroll h-[90px]' : 'h-[70px]'
            }  overflow-y-hidden hidden-bg-scrollbar`}
        >
            {providers?.results?.US?.flatrate ? (
                providers.results.US.flatrate.map((item, i) => (
                    <img
                        key={i}
                        className={`h-16 w-16 m-1 ${isOverflow ? 'mb-3' : ''} rounded-lg`}
                        src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                        alt={`${item.provider_name} logo`}
                    ></img>
                ))
            ) : (
                <span className='p-2 w-full text-center'>
                    Sorry, no providers available for this show.
                </span>
            )}
        </div>
    );
}
