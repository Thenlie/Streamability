import { Season } from '../types';
import CardMedia from '@mui/material/CardMedia';
import Typ from '@mui/material/Typography';
import { Link } from 'react-router';
import { pluralizeString } from '../helpers';

interface SeasonCardProps {
    details: Season;
    showId: number;
    title?: string;
}

/**
 * A card that displays TV Show Season data: season name, average rating, number of episodes, release date, season overview, and the season's poster
 * @param details | Season details
 * @returns {React.JSX.Element}
 */
const SeasonCard: React.FC<SeasonCardProps> = ({ details, title, showId }): React.JSX.Element => {
    return (
        <Link
            data-testid='season-card-component'
            className='my-3 flex flex-col sm:flex-row sm:rounded-md max-w-[180px] sm:max-w-none w-full bg-foreground rounded-t-md'
            to={`/details/tv/${showId}/seasons/${details.season_number}`}
        >
            <CardMedia
                component='img'
                className='rounded-xs'
                sx={{
                    boxShadow: 5,
                    width: 180,
                    maxHeight: 270,
                    '&:hover': { opacity: 0.8 },
                }}
                image={
                    details.poster_path
                        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                        : '/poster-placeholder.jpeg'
                }
                alt={details.name + ' poster'}
            />

            <div className='flex flex-col max-h-[270px] p-2 sm:p-4'>
                <Typ
                    className='sm:text-left sm:py-1 hover:text-blue-500 cursor-pointer'
                    fontWeight={'bold'}
                >
                    {details.name}
                </Typ>
                <div className='flex justify-around sm:justify-start sm:py-1'>
                    {details.season_number != 0 && details.vote_average > 0 && (
                        <Typ className='hidden sm:inline pr-4'>{details.vote_average}</Typ>
                    )}
                    {details.air_date && (
                        <Typ className='sm:pr-4'>{details.air_date.slice(0, 4)}</Typ>
                    )}
                    <Typ className='sm:pr-4'>{`${details.episode_count} ${pluralizeString(details.episode_count, 'Episode')}`}</Typ>
                </div>
                <div className='hidden sm:block'>
                    <Typ
                        className='text-left sm:py-1'
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '7',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {details.season_number != 0
                            ? details.overview
                            : `Special episodes including behind the scenes footage of ${title}.`}
                    </Typ>
                </div>
            </div>
        </Link>
    );
};

export default SeasonCard;
