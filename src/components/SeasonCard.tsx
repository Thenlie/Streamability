import { Season } from '../types';
import CardMedia from '@mui/material/CardMedia';
import { default as Typ } from '@mui/material/Typography';
import { Link } from 'react-router';

interface SeasonCardProps {
    details: Season;
}

/**
 * A card that displays TV Show Season data: season name, average rating, number of episodes, release date, season overview, and the season's poster
 * @param details | Season details
 * @returns {JSX.Element}
 */
const SeasonCard: React.FC<SeasonCardProps> = ({ details }): JSX.Element => {
    return (
        <Link
            data-testid='season-card-component'
            className='m-3 flex flex-col sm:flex-row bg-foreground rounded-t-md sm:rounded-md'
            to={`seasons/${details.season_number}`}
        >
            <CardMedia
                component='img'
                className='rounded-sm w-full'
                sx={{
                    boxShadow: 5,
                    minWidth: 180,
                    maxHeight: 270,
                    '&:hover': { opacity: 0.8 },
                }}
                image={
                    details.poster_path
                        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                        : '/poster-placeholder.jpeg'
                }
                alt={details.name}
            />

            <div className='flex flex-col max-h-[270px] p-2 sm:p-4 max-w-[1200px]'>
                <Typ
                    className='sm:text-left sm:py-1 hover:text-blue-500 cursor-pointer'
                    fontWeight={'bold'}
                >
                    {details.name}
                </Typ>
                <div className='flex justify-around sm:justify-start sm:py-1'>
                    <Typ className='hidden sm:inline pr-4'>{details.vote_average}</Typ>
                    <Typ className='sm:px-4'>{details.air_date.slice(0, 4)}</Typ>
                    <Typ className='sm:px-4'>{details.episode_count} Episodes</Typ>
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
                        {details.overview}
                    </Typ>
                </div>
            </div>
        </Link>
    );
};

export default SeasonCard;
