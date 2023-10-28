import Skeleton from 'react-loading-skeleton';
import { Button, ShowCarouselLoader } from '../../components';

const DashboardLoader: React.FC = () => {
    return (
        <div className='m-6'>
            <Skeleton width={250} height={40} />
            <section className='m-6 flex flex-col flex-1'>
                <div className='text-left m-2 flex flex-col gap-1'>
                    <Skeleton width={215} height={25} />
                    <Skeleton width={200} height={25} />
                    <Skeleton width={250} height={25} />
                    <Skeleton width={150} height={25} />
                    <Skeleton width={150} height={25} />
                    <Skeleton width={150} height={25} />
                </div>
                <div className='my-2 flex flex-col'>
                    <Button title='' loading sx={{ width: 200 }} />
                    <Button title='' loading sx={{ width: 200 }} />
                    <Button title='' loading sx={{ width: 200 }} />
                </div>
                <ShowCarouselLoader />
                <Button title='' disabled sx={{ width: 200, margin: 'auto', marginTop: 2 }} />
            </section>
        </div>
    );
};

export default DashboardLoader;
