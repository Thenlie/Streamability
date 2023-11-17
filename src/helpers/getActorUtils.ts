import Logger from '../logger';
import { ActorDetail } from '../types';

const LOG = new Logger('getActorUtils');

/**
 * Returns more detailed information about a given actor.
 * @param id | MovieDB credit_id of actor being queried
 * @returns {Promise<ActorDetail>} | Actor details
 */
const getActorDetails = async (id: string): Promise<ActorDetail> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/credit/${id}?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    return (await response.json()) as ActorDetail;
};

export { getActorDetails };
