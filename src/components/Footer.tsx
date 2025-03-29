import { Link } from 'react-router';
import Typ from '@mui/material/Typography';
import { useWindowSize } from '../hooks';

const Footer: React.FC = (): JSX.Element => {
    const windowSize = useWindowSize();
    return (
        <footer
            className='w-full flex flex-col sm:flex-row items-center justify-between bg-foreground px-8 py-6 flex-wrap'
            style={{
                boxShadow:
                    '0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)',
            }}
        >
            {windowSize.width && (
                <div className='flex items-center'>
                    <Typ className='px-2 text-text!'>Powered By</Typ>
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
            <div className='hidden sm:block text-text!'>
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
