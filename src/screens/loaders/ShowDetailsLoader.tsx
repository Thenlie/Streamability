import Skeleton from 'react-loading-skeleton';
import { ProvidersLoader, ShowCarouselLoader } from '../../components';
import React from 'react';

const ShowDetailsLoader: React.FC = (): React.JSX.Element => {
    return (
        <>
            <section className='m-6 flex flex-col md:flex-row'>
                <div className='rounded-md m-auto'>
                    <Skeleton width={350} height={550} />
                </div>
                <div className='m-3 max-w-xl text-left'>
                    <div className='pb-1'>
                        <Skeleton width={300} height={70} />
                    </div>
                    <Skeleton width={180} height={20} />
                    <Skeleton width={80} height={20} />
                    <Skeleton width={120} height={20} />
                    <div className='py-2'>
                        <Skeleton width={180} height={20} />
                        <Skeleton width={180} height={20} />
                    </div>
                    <div className='py-3'>
                        <Skeleton width={500} height={200} />
                    </div>
                    <ProvidersLoader count={4} />
                </div>
            </section>
            <ShowCarouselLoader />
        </>
    );
};

export default ShowDetailsLoader;
