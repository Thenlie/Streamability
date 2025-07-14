import Skeleton from 'react-loading-skeleton';
import { ShowCarouselLoader } from '../../components';
import React from 'react';

const ActorDetailLoader: React.FC = (): React.JSX.Element => {
    return (
        <>
            <section className='m-6 flex flex-col lg:flex-row'>
                <div className='rounded-md text-left lg:mx-auto lg:mt-3'>
                    <Skeleton
                        width={window.innerWidth > 1350 ? 375 : 250}
                        height={window.innerWidth > 1350 ? 525 : 375}
                    />
                </div>
                <div className='mt-3 lg:ml-3 max-w-xl text-left'>
                    <div className='pb-1'>
                        <Skeleton width={300} height={50} />
                    </div>
                    <Skeleton width={180} height={20} />
                    <Skeleton width={80} height={20} />
                    <div className='py-3'>
                        <Skeleton width={500} height={335} />
                    </div>
                </div>
            </section>
            <div className='m-6'>
                <ShowCarouselLoader />
            </div>
        </>
    );
};

export default ActorDetailLoader;
