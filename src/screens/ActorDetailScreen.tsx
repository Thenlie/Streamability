import { useState, useEffect } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { ActorDetail } from '../types';
import { getActorDetails } from '../helpers';
import { Typography as Typ } from '@mui/material';
import { ShowCarousel } from '../components';

const ActorDetailScreen: React.FC = () => {
    const location: Location = useLocation();
    const actorId = location.pathname.split('/')[3];
    const [details, setDetails] = useState<ActorDetail>(
        location.state ? location.state.details : null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            const actorDetails = await getActorDetails(actorId);
            setDetails(actorDetails);
            setLoading(false);
        };
        handler();
    }, [location]);

    // TODO: #758 Create loader screen
    if (loading && !details) {
        return <p>Loading...</p>;
    }

    // TODO: #757 Create empty screen
    if (!details) {
        return <p>Empty...</p>;
    }

    return (
        <>
            <section
                className='m-6 mb-8 flex flex-col lg:flex-row'
                data-testid='actor-detail-screen'
            >
                <div className='rounded-md m-3 w-[250px] lg:w-[330px['>
                    <img
                        className='rounded-md'
                        src={
                            details.profile_path
                                ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                                : '/poster-placeholder.jpeg'
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
                    <Typ align='left' marginTop={1}>
                        {details.biography}
                    </Typ>
                </div>
            </section>
            {details.movie_credits && (
                <section className='m-4 mb-8'>
                    <ShowCarousel
                        data={details.movie_credits.cast} // TODO: Convert to ShowData
                        fallbackText='Sorry, we can not find any movies associate with this actor!'
                        profile={null}
                        headerProps={{ title: 'Movies' }}
                    />
                </section>
            )}
        </>
    );
};

export default ActorDetailScreen;
