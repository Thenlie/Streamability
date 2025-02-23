import { useState } from 'react';
import { Episode } from '../types';
import { CardMedia, Typography as Typ } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ExpandLess, ExpandMore } from '@mui/icons-material/';
import { formatReleaseDate, DateSize } from '../helpers';

interface EpisodeCardProps {
    details: Episode;
}

/**
 * Component to render a TV Show Episode and its details
 */
const EpisodeCard: React.FC<EpisodeCardProps> = ({ details }): JSX.Element => {
    const [expand, setExpand] = useState<boolean>(false);
    return (
        <div className='my-3 bg-foreground rounded-b-md w-full rounded-sm max-w-[275px] md:max-w-none'>
            <div data-testid='episode-card-component' className='flex flex-col md:flex-row '>
                <CardMedia
                    component='img'
                    className='rounded-t-sm'
                    sx={{
                        boxShadow: 5,
                        width: 275,
                        maxHeight: 270,
                        '&:hover': { cursor: 'pointer' },
                    }}
                    image={
                        details.still_path
                            ? `https://image.tmdb.org/t/p/w500${details.still_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={details.name + ' poster'}
                />
                <div className='px-3 flex flex-col truncate'>
                    <div className='py-2 w-full flex justify-between items-center md:justify-start truncate md:space-x-2'>
                        <Typ>{details.episode_number}.</Typ>
                        <Typ fontWeight={'bold'} className='grow md:grow-0 truncate'>
                            {details.name}
                        </Typ>
                    </div>
                    <div className='hidden md:flex space-x-3'>
                        <Typ variant='subtitle1'>{details.vote_average}</Typ>
                        <Typ variant='subtitle1'>
                            {formatReleaseDate(details.air_date, DateSize.MEDIUM)}
                        </Typ>
                        <Typ variant='subtitle1'>{details.runtime}m</Typ>
                    </div>
                    <div className='py-2 hidden md:block'>
                        <Typ
                            variant='body2'
                            className='text-wrap text-left'
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '3',
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {details.overview}
                        </Typ>
                    </div>
                </div>
                <div
                    className='md:hidden'
                    style={{
                        maxHeight: expand ? '600px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height .5s ease-in-out',
                    }}
                >
                    <Divider />
                    <div className='p-4'>
                        <div className='flex flex-row justify-start space-x-3'>
                            <Typ variant='subtitle1'>{details.vote_average}</Typ>
                            <Typ variant='subtitle1'>
                                {formatReleaseDate(details.air_date, DateSize.MEDIUM)}
                            </Typ>
                            <Typ variant='subtitle1'>{details.runtime}m</Typ>
                        </div>
                        <Typ
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '15',
                                WebkitBoxOrient: 'vertical',
                            }}
                            variant='body2'
                            className='text-left pt-4'
                        >
                            {details.overview}
                        </Typ>
                        <div className='text-left pt-4'>
                            {/* possible undefined values WIP */}
                            <Typ variant='body2'>
                                Directed by:{' '}
                                {details.crew.find((item) => item.job == 'Director')?.name}
                            </Typ>
                            <Typ variant='body2'>
                                Written by:{' '}
                                {
                                    details.crew.find(
                                        (item) => item.job == 'Writer' || item.job == 'Story'
                                    )?.name
                                }
                            </Typ>
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div
                onClick={() => setExpand(!expand)}
                className='py-1 px-2 cursor-pointer hover:opacity-70'
            >
                <Typ variant='subtitle2'>Expand{expand ? <ExpandLess /> : <ExpandMore />}</Typ>
            </div>
        </div>
    );
};

export default EpisodeCard;
