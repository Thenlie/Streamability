import React, { useEffect, useState } from 'react';
import { ShowProviders } from '../types';
import { getMovieProviders, getTvProviders } from '../helpers';
import { ProvidersLoader } from './loaders';
import { useWindowSize, useDebounceValue } from '../hooks';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography as Typ } from '@mui/material';

interface ProviderProps {
    id: number;
    showType: string;
}

/**
 * Displays streaming service logos for a given show
 *
 * @param id | TMDB id
 * @param showType | 'movie' or 'tv'
 * @returns {React.JSX.Element}
 */
const Providers: React.FC<ProviderProps> = ({ id, showType }): React.JSX.Element => {
    const windowSize = useWindowSize();
    const debouncedWindowSize = useDebounceValue(windowSize, 250);
    const [providers, setProviders] = useState<ShowProviders>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        const containerWidth =
            document.getElementById('provider-container')?.getBoundingClientRect().width || 0;
        const providerWidth = (providers?.results?.US?.flatrate?.length || 0) * 73.1;
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
                <ProvidersLoader count={3} />
            </div>
        );
    }

    return (
        <div
            id='provider-container'
            className={`flex items-center bg-background p-3 rounded-sm ${
                isOverflow ? 'overflow-x-scroll h-[100px]' : 'h-[80px]'
            }  overflow-y-hidden`}
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
                <span className='p-2 w-full text-center flex items-center justify-center'>
                    <ErrorOutlineIcon fontSize='large' className='mr-1' />
                    <Typ fontWeight='light'>Sorry! No providers available for this show.</Typ>
                </span>
            )}
        </div>
    );
};

export default Providers;
