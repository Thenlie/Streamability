import { Link } from 'react-router-dom';
import { Typography as Typ } from '@mui/material';
import { useWindowSize } from '../hooks';

const Footer: React.FC = (): JSX.Element => {
    const windowSize = useWindowSize();
    return (
        <footer className='w-full bottom-0 bg-primary px-4 py-2 flex justify-center sm:justify-between items-center drop-shadow-[0_-3px_3px_rgba(0,0,0,.25)] '>
            {windowSize.width && (
                <div className='flex items-center'>
                    <Typ className='px-2'>Powered By</Typ>
                    <Link to='https://www.themoviedb.org/' target='_blank'>
                        <img
                            className='px-2'
                            src='/images/tmdb.svg'
                            alt='the movie db'
                            width={64}
                            height={64}
                        />
                    </Link>
                    {windowSize.width > 640 ? (
                        <Link to='https://www.justwatch.com/' target='_blank'>
                            <img
                                className='px-2'
                                src='/images/JustWatch-large.png'
                                alt='JustWatch'
                                width={128}
                                height={128}
                            />
                        </Link>
                    ) : (
                        <Link to='https://www.justwatch.com/' target='_blank'>
                            <img
                                className='px-2'
                                src='/images/JustWatch.png'
                                alt='JustWatch'
                                width={64}
                                height={64}
                            />
                        </Link>
                    )}
                </div>
            )}
            <div className='hidden sm:block'>
                <Typ>
                    Want to contribute?{' '}
                    <Link
                        className='underline hover:text-blue-500'
                        to='https://github.com/Thenlie/Streamability'
                    >
                        Check us out!
                    </Link>
                </Typ>
            </div>
        </footer>
    );
};

export default Footer;
