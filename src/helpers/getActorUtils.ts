import Logger from '../logger';
import { ActorDetail } from '../types';
import { TMDB_API_PATH } from './constants';
import { makeFetchRequest } from './fetch';

const LOG = new Logger('getActorUtils');

/**
 * Returns more detailed information about a given actor.
 * @param id | MovieDB credit_id of actor being queried
 * @returns {Promise<ActorDetail>} | Actor details
 */
const getActorDetails = async (id: string): Promise<ActorDetail | null> => {
    const data = await makeFetchRequest<ActorDetail>(
        `${TMDB_API_PATH}person/${id}?append_to_response=movie_credits,tv_credits&language=en-US`,
        LOG
    );
    return data;
};

export { getActorDetails };
