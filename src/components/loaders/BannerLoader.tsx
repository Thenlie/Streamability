import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useWindowSize } from '../../hooks';

const BannerLoader: React.FC = (): JSX.Element => {
    const windowSize = useWindowSize();
    const [loaderWidth, setLoaderWidth] = useState<number>(1200);

    useEffect(() => {
        if (windowSize.width === null) return;
        if (windowSize.width > 1300) {
            setLoaderWidth(1240);
        } else if (windowSize.width > 1025) {
            setLoaderWidth(1000);
        } else {
            setLoaderWidth(windowSize.width);
        }
    }, [windowSize]);

    return (
        <>
            <div
                className='w-full flex lg:rounded-b-lg bottom-0.5 mx-auto justify-center'
                data-testid='banner-loader'
            >
                <Skeleton
                    height={400}
                    width={loaderWidth}
                    style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                />
            </div>
        </>
    );
};

export default BannerLoader;
