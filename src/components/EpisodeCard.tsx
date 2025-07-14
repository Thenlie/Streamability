import { useState, useEffect } from 'react';
import { Actor, Crew, Episode, EpisodeDetails } from '../types';
import { formatReleaseDate, DateSize } from '../helpers';
import { getTvEpisodeDetails } from '../helpers';
import { useWindowSize } from '../hooks';
import CardMedia from '@mui/material/CardMedia';
import Typ from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router';
import { Star } from '@mui/icons-material';

interface EpisodeCardProps {
    details: Episode;
}

/**
 * Renders episode details for a TV Show
 * @param details
 * @returns {React.JSX.Element}
 */
const EpisodeCard: React.FC<EpisodeCardProps> = ({ details }): React.JSX.Element => {
    const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);
    const [expand, setExpand] = useState<boolean>(false);
    const windowSize = useWindowSize();

    useEffect(() => {
        const handler = async () => {
            const epDetails = await getTvEpisodeDetails(
                details.show_id,
                details.season_number,
                details.episode_number
            );
            setEpisodeDetails(epDetails);
        };
        if (expand && !episodeDetails) handler();
    }, [expand]);

    /**
     * Util function for rendering Cast, Guest Stars, and Crew
     * @param actors
     * @param title
     * @param isCrew
     * @returns {React.JSX.Element}
     */
    const renderActors = (
        actors: Actor[] | Crew[],
        title: 'Cast' | 'Guest Stars' | 'Crew'
    ): React.JSX.Element => {
        return (
            <div className='my-2'>
                <Typ fontWeight={'bold'} variant='body2' textAlign={'left'}>
                    {title}
                </Typ>
                <div className='flex overflow-x-scroll'>
                    {actors.map((item, i) => (
                        <Link
                            to={`/details/actor/${item.id}`}
                            key={i}
                            className='flex items-center my-2 space-x-1 mr-4 md:min-w-[180px]'
                        >
                            <CardMedia
                                component='img'
                                className='rounded-lg'
                                sx={{
                                    boxShadow: 5,
                                    width: 66,
                                    minWidth: 66,
                                    height: 66,
                                    '&:hover': { cursor: 'pointer', opacity: 0.8 },
                                }}
                                image={
                                    item.profile_path
                                        ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                                        : '/poster-placeholder.jpeg'
                                }
                                alt={item.name + ' poster'}
                            />
                            <div className='flex-1 min-w-0'>
                                <Typ
                                    textAlign={'left'}
                                    fontWeight={'bold'}
                                    variant='body2'
                                    className='hover:text-blue-500 truncate'
                                >
                                    {item.name}
                                </Typ>
                                <Typ textAlign={'left'} variant='body2' className='truncate'>
                                    {'character' in item ? item.character : item.job}
                                </Typ>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    /**
     * Renders a Episode's metadata
     * @param details
     * @returns {React.JSX.Element}
     */
    const renderMetaData = (details: Episode): React.JSX.Element => {
        return (
            <div>
                {details.air_date && (
                    <Typ variant='subtitle1' fontWeight={'light'}>
                        {formatReleaseDate(details.air_date, DateSize.MEDIUM)}
                    </Typ>
                )}
                {details.vote_average > 0 && (
                    <div className='flex'>
                        <Star />
                        <Typ variant='subtitle1'>{details.vote_average}</Typ>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className='my-3 bg-foreground rounded-b-md rounded-xs max-w-[275px] md:max-w-none w-full'>
            <div data-testid='episode-card-component' className='flex flex-col md:flex-row '>
                <CardMedia
                    component='img'
                    className='rounded-t-sm'
                    sx={{
                        boxShadow: 5,
                        width: 275,
                        minWidth: 275,
                        height: 150,
                    }}
                    image={
                        details.still_path
                            ? `https://image.tmdb.org/t/p/w500${details.still_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={details.name + ' poster'}
                />
                <div className='px-3 flex flex-col truncate'>
                    <div className='py-2 flex md:space-x-2'>
                        <Typ>{details.episode_number}.</Typ>
                        <Typ
                            fontWeight={'bold'}
                            textAlign={'center'}
                            className='grow md:grow-0 truncate'
                        >
                            {details.name}
                            {details.runtime && (
                                <span className='text-gray-300 font-light text-xs'>
                                    {' (' + details.runtime + 'm)'}
                                </span>
                            )}
                        </Typ>
                    </div>
                    {windowSize.width && windowSize.width >= 768 && (
                        <div>
                            <div className='flex space-x-3'>{renderMetaData(details)}</div>
                            <Typ
                                variant='body2'
                                textAlign={'left'}
                                className='pt-2 text-wrap'
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
                    )}
                </div>
                {/* Mobile expand menu */}
                <Divider />
                {windowSize.width && windowSize.width < 768 && (
                    <div
                        data-testid='episode-card-component-menu'
                        style={{
                            maxHeight: expand ? '600px' : '0px',
                            overflow: 'hidden',
                            transition: 'max-height .5s ease-in-out',
                        }}
                    >
                        <div className='p-4'>
                            <div className='flex flex-row justify-start space-x-3'>
                                {renderMetaData(details)}
                            </div>
                            <Typ
                                variant='body2'
                                textAlign={'left'}
                                className='pt-4'
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '15',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {details.overview}
                            </Typ>
                            {episodeDetails?.credits.cast &&
                                episodeDetails?.credits.cast.length > 0 &&
                                renderActors(episodeDetails.credits.cast, 'Cast')}
                            {details?.guest_stars.length > 0 &&
                                renderActors(details.guest_stars, 'Guest Stars')}
                            {details?.crew.length > 0 && renderActors(details.crew, 'Crew')}
                        </div>

                        {episodeDetails?.credits.cast.length == 0 &&
                            details?.guest_stars.length == 0 &&
                            details?.crew.length == 0 &&
                            !details.overview && (
                                <Typ variant='body2' textAlign={'center'} className='pt-2'>
                                    {
                                        "Sorry, we don't have additional information about this episode!"
                                    }
                                </Typ>
                            )}
                    </div>
                )}
            </div>
            {/* Tablet+ expand menu */}
            {windowSize.width && windowSize.width > 768 && (
                <div
                    data-testid='episode-card-component-menu'
                    style={{
                        maxHeight: expand ? '850px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height .5s ease-in-out',
                    }}
                >
                    <Divider />
                    <div className='flex flex-col px-4'>
                        {episodeDetails?.credits.cast &&
                            episodeDetails?.credits.cast.length > 0 &&
                            renderActors(episodeDetails.credits.cast, 'Cast')}
                        {details?.guest_stars.length > 0 &&
                            renderActors(details.guest_stars, 'Guest Stars')}
                        {details?.crew.length > 0 && renderActors(details.crew, 'Crew')}
                        {episodeDetails?.images.stills &&
                            episodeDetails.images.stills.length > 0 && (
                                <div className='flex-col my-2'>
                                    <Typ fontWeight={'bold'} variant='body2' textAlign={'left'}>
                                        Episode Images
                                    </Typ>
                                    <div className='flex overflow-x-scroll'>
                                        {episodeDetails?.images.stills.map((item, i) => (
                                            <div key={i} className='mt-2 mr-2'>
                                                <CardMedia
                                                    component='img'
                                                    className='rounded-xs'
                                                    sx={{
                                                        boxShadow: 5,
                                                        minWidth: 275,
                                                        height: 150,
                                                    }}
                                                    image={
                                                        details.still_path
                                                            ? `https://image.tmdb.org/t/p/w500${item.file_path}`
                                                            : '/poster-placeholder.jpeg'
                                                    }
                                                    alt={'episode image ' + i}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {episodeDetails?.credits.cast.length == 0 &&
                            details?.guest_stars.length == 0 &&
                            details?.crew.length == 0 &&
                            episodeDetails.images.stills.length == 0 && (
                                <Typ variant='body2' textAlign={'center'} className='pt-2'>
                                    {
                                        "Sorry, we don't have additional information about this episode!"
                                    }
                                </Typ>
                            )}
                    </div>
                </div>
            )}
            <Divider />
            <div
                onClick={() => setExpand(!expand)}
                className='py-1 px-2 cursor-pointer hover:opacity-70 flex justify-center'
            >
                <Typ variant='subtitle2'>Expand{expand ? <ExpandLess /> : <ExpandMore />}</Typ>
            </div>
        </div>
    );
};

export default EpisodeCard;
