import { useState, useEffect } from 'react';
import { Location, useLocation } from 'react-router';
import { ActorDetail } from '../types';
import { convertDataToShowType, getActorDetails } from '../helpers';
import Collapse from '@mui/material/Collapse';
import Typ from '@mui/material/Typography';
import { Button, ShowCarousel } from '../components';
import { ActorDetailLoader } from './loaders';
import EmptyActorDetailScreen from './EmptyActorDetailScreen';

const ActorDetailScreen: React.FC = () => {
    const location: Location = useLocation();
    const actorId = location.pathname.split('/')[3];
    const [details, setDetails] = useState<ActorDetail>(
        location.state ? location.state.details : null
    );
    const [loading, setLoading] = useState(true);
    const [detailsOpen, setDetailsOpen] = useState(false);

    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            const actorDetails = await getActorDetails(actorId);
            setDetails(actorDetails);
            setLoading(false);
        };
        handler();
    }, [location]);

    if (loading && !details) {
        return <ActorDetailLoader />;
    }

    if (!details) {
        return <EmptyActorDetailScreen />;
    }

    return (
        <>
            <section
                className='m-6 mb-0 flex flex-col lg:flex-row'
                data-testid='actor-detail-screen'
            >
                <div className='rounded-md m-3 w-[250px] h-[375px] xl:w-[330px] xl:h-[525px]'>
                    <img
                        className='rounded-md'
                        src={
                            details.profile_path
                                ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                                : '/poster-placeholder.jpeg'
                        }
                        alt={
                            details.profile_path
                                ? `${details.name} profile`
                                : 'Actor Image Placeholder'
                        }
                    />
                </div>
                <div className='m-3 max-w-xl'>
                    <Typ variant='h4' align='left'>
                        {details.name}
                    </Typ>
                    <Typ variant='body2' align='left'>
                        {details.birthday}
                    </Typ>
                    <Typ variant='body2' align='left'>
                        {details.place_of_birth}
                    </Typ>
                    <Collapse in={detailsOpen} collapsedSize={335}>
                        <Typ align='left' marginTop={1}>
                            {details.biography}
                        </Typ>
                    </Collapse>
                    {details.biography.length > 1000 && (
                        <>
                            <div
                                className={`relative top-[-30px] bg-gradient-to-t from-foreground h-8 ${
                                    (detailsOpen || details.biography.length < 1000) && 'hidden'
                                }`}
                            ></div>
                            <Button
                                title={detailsOpen ? 'Read less' : 'Read more'}
                                sx={{ minHeight: 30 }}
                                onClick={() => setDetailsOpen(!detailsOpen)}
                            />
                        </>
                    )}
                </div>
            </section>
            {details.movie_credits && (
                <section className='m-4 mb-8'>
                    <ShowCarousel
                        data={convertDataToShowType(details.movie_credits.cast, 'movie')}
                        fallbackText='Sorry, we can not find any movies associate with this actor!'
                        profile={null}
                        headerProps={{ title: 'Movies' }}
                    />
                </section>
            )}
            {details.tv_credits && (
                <section className='m-4 mb-8'>
                    <ShowCarousel
                        data={convertDataToShowType(details.tv_credits.cast, 'tv')}
                        fallbackText='Sorry, we can not find any tv shows associate with this actor!'
                        profile={null}
                        headerProps={{ title: 'TV' }}
                    />
                </section>
            )}
        </>
    );
};

export default ActorDetailScreen;
