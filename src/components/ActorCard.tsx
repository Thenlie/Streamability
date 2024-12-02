import CardMedia from '@mui/material/CardMedia';
import { default as Typ } from '@mui/material/Typography';
import { Actor } from '../types';
import { Link } from 'react-router';

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
            <Link to={`/details/actor/${details.id}`}>
                <CardMedia
                    component='img'
                    className='w-full cursor-pointer rounded-sm'
                    sx={{
                        width: 180,
                        minWidth: 180,
                        aspectRatio: 2 / 3,
                        boxShadow: 5,
                        '&:hover': { opacity: 0.8 },
                    }}
                    image={
                        details.profile_path
                            ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={details.name}
                />
            </Link>
            <div className='flex flex-col justify-between p-2'>
                <Typ fontWeight={'bold'}>{details.name}</Typ>
                <Typ>{details.character}</Typ>
            </div>
        </div>
    );
};

export default ActorCard;
