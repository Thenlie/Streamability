import { useState, useEffect } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { ActorDetail } from '../types';
import { getActorDetails } from '../helpers';

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

    // TODO: Create loader screen
    if (loading) {
        return <p>Loading...</p>;
    }

    // TODO: Create empty screen
    if (!details) {
        return <p>Empty...</p>;
    }

    return (
        <section className='m-6 mb-8' data-testid='actor-detail-screen'>
            <p>{details.person.name}</p>
        </section>
    );
};

export default ActorDetailScreen;
