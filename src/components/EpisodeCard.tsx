import { useState, useEffect } from 'react';
import { Actor, Episode, EpisodeDetails } from '../types';
import { CardMedia, Typography as Typ } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ExpandLess, ExpandMore } from '@mui/icons-material/';
import { formatReleaseDate, DateSize } from '../helpers';
import { getTvEpisodeDetails } from '../helpers';
import { Link } from 'react-router';

interface EpisodeCardProps {
    details: Episode;
}

/**
 * Component to render a TV Show Episode and its details
 */
const EpisodeCard: React.FC<EpisodeCardProps> = ({ details }): JSX.Element => {
    const [expand, setExpand] = useState<boolean>(false);
    const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);
    console.log(details);

    useEffect(() => {
        const handler = async () => {
            const episodeDetails = await getTvEpisodeDetails(
                details.show_id,
                details.season_number,
                details.episode_number
            );
            setEpisodeDetails(episodeDetails);
            // console.log(episodeDetails);
        };
        if (expand && !episodeDetails) handler();
    }, [expand]);

    const renderActors = (actors: (Actor & { job?: string })[], title: 'Cast' | 'Guest Stars' | 'Crew', isCrew?: boolean): JSX.Element => {
        return (
            <div className='my-2'>
                <Typ fontWeight={'bold'} variant='body2' textAlign={'left'}>{title}</Typ>
                <div className='flex overflow-x-scroll'>
                    {actors.map((item, i) => (
                        <Link to={`/details/actor/${item.id}`} key={i} className='flex items-center my-2 space-x-1 mr-4 md:min-w-[180px]'>
                            <CardMedia
                                component='img'
                                className='rounded-lg'
                                sx={{
                                    boxShadow: 5,
                                    width: 66,
                                    minWidth: 66,
                                    height: 66,
                                    '&:hover': { cursor: 'pointer' },

                                }}
                                image={
                                    item.profile_path
                                        ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                                        : '/poster-placeholder.jpeg'
                                }
                                alt={item.name + ' poster'}
                            />
                            <div className='flex-1 min-w-0'>
                                <Typ className='text-left hover:text-blue-500 truncate' fontWeight={'bold'} variant='body2'>{item.name}</Typ>
                                <Typ className='text-left truncate' variant='body2'>{!isCrew ? item.character : item.job}</Typ>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    const renderMetaData = (details: Episode) => {
        return (
            <>
                <Typ variant='subtitle1'>{details.vote_average}</Typ>
                <Typ variant='subtitle1'>
                    {formatReleaseDate(details.air_date, DateSize.MEDIUM)}
                </Typ>
                <Typ variant='subtitle1'>{details.runtime}m</Typ>
            </>
        )
    }

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
                        {renderMetaData(details)}
                    </div>
                    <div className='py-2 hidden md:block'>
                        <Typ
                            variant='body2'
                            className='text-wrap text-left hidden md:block'
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
                {/* Expand mobile */}
                <div
                    style={{
                        maxHeight: expand ? '600px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height .5s ease-in-out',
                    }}
                >
                    <Divider />
                    <div className='md:hidden p-4'>
                        <div className='flex flex-row justify-start space-x-3'>
                            {renderMetaData(details)}
                        </div>
                        <Typ
                            className='text-left pt-4'
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '15',
                                WebkitBoxOrient: 'vertical',
                            }}
                            variant='body2'
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
                        {episodeDetails?.credits.cast &&
                            renderActors(episodeDetails.credits.cast, 'Cast')
                        }
                        {details?.guest_stars &&
                            renderActors(details.guest_stars, 'Guest Stars')
                        }
                    </div>
                </div>

            </div>
            {/* >:md expand menu */}
            <div className='hidden md:block px-4'
                style={{
                    maxHeight: expand ? '850px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height .5s ease-in-out',
                }}
            >
                <Divider />
                <div className='flex flex-col'>
                    {episodeDetails?.credits.cast &&
                        renderActors(episodeDetails.credits.cast, 'Cast')
                    }
                    {details?.guest_stars &&
                        renderActors(details.guest_stars, 'Guest Stars')
                    }
                    {details?.crew &&
                        renderActors(details.crew, 'Crew', true)
                    }
                    {episodeDetails?.images &&
                        <div className='text-left flex-col my-2'>
                            <Typ fontWeight={'bold'} variant='body2' textAlign={'left'}>Episode Images</Typ>
                            <div className='flex'>
                                {episodeDetails?.images.stills.map((item, i) => (
                                    <div key={i} className=''>
                                        <CardMedia
                                            component='img'
                                            className='rounded-sm'
                                            sx={{
                                                boxShadow: 5,
                                                width: 210,
                                                maxHeight: 270,
                                                '&:hover': { cursor: 'pointer' },
                                            }}
                                            image={
                                                details.still_path
                                                    ? `https://image.tmdb.org/t/p/w500${item.file_path}`
                                                    : '/poster-placeholder.jpeg'
                                            }
                                            alt={details.name + ' poster'}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
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
