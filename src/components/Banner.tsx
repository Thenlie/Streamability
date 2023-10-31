import { useState, useEffect } from 'react';
import { ShowData } from '../types';
import { Typography as Typ } from '@mui/material';
import SearchInput from './SearchInput';
import { BannerLoader } from './loaders';

interface BannerProps {
    /**
     * Array of data to randomly choose an image
     */
    data: ShowData[] | null;
    /**
     * If the show data is still loading
     */
    dataLoading?: boolean;
    /**
     * Title that is displayed on the banner
     */
    title: string;
    /**
     * If true, renders SearchInput component below title
     */
    renderSearchInput?: boolean;
    /**
     * If true, renders Streamability logo
     */
    renderLogo?: boolean;
}

/**
 * Image Banner with title and optional search input
 */
const Banner: React.FC<BannerProps> = ({
    data,
    dataLoading = false,
    title,
    renderSearchInput,
    renderLogo,
}) => {
    const [bannerPath, setBannerPath] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (data) {
            const rand = Math.floor((Math.random() * data.length) / 2);
            const path = `https://image.tmdb.org/t/p/original${data?.[rand]?.banner_path}` || null;
            setBannerPath(path);
            setLoading(false);
        } else if (!dataLoading) {
            setLoading(false);
        }
    }, [data, dataLoading]);

    if (loading || dataLoading) {
        return <BannerLoader />;
    }

    return (
        <div
            className={`p-4 lg:rounded-b-lg w-full lg:w-3/4 bg-no-repeat bg-cover bg-top mx-auto ${
                !renderLogo && 'flex flex-col justify-center items-center'
            }`}
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerPath})`,
                height: 400,
            }}
            data-testid='banner'
            id='banner'
        >
            {renderLogo && (
                <img
                    src='/images/logo-transparent.png'
                    className={`w-60 mx-auto ${bannerPath && 'md:mx-0'}`}
                />
            )}
            <Typ variant='h4' className='hidden md:block px-2 text-left text-white'>
                {title}
            </Typ>
            {renderSearchInput && <SearchInput colorOverride='white' />}
        </div>
    );
};

export default Banner;
