import { Typography as Typ } from '@mui/material';
import { Actor } from '../types';

interface ActorCardProps {
    /**
     * Actor metadata
     */
    details: Actor;
}

/**
 * A card that displays a picture of an actor, their name, and
 * the name of the character they played in a given show when applicable
 */
const ActorCard: React.FC<ActorCardProps> = ({ details }) => {
    return (
        <div
            data-testid='actor-card-component'
            className='m-3 flex flex-col w-[180px] bg-foreground rounded-t-md overflow-hidden flex-[0_0_auto]'
        >
            <img
                src={
                    details.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${details.profile_path}`
                        : '/poster-placeholder.jpeg'
                }
            />
            <div className='flex flex-col justify-between p-2'>
                <Typ fontWeight={'bold'}>{details.name}</Typ>
                <Typ>{details.character}</Typ>
            </div>
        </div>
    );
};

export default ActorCard;
