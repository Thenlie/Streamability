import { SUPABASE } from '../helpers/supabaseClient';
import { Link } from 'react-router-dom';
import { Session } from '../types';
import { useState, useEffect, MouseEvent } from 'react';
import {
    AppBar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Tooltip,
} from '@mui/material';
import {
    AccountCircle,
    DarkMode,
    ExpandLess,
    ExpandMore,
    Explore,
    LightMode,
    Login,
    Logout,
    PersonAddAlt,
    Search,
    Settings,
} from '@mui/icons-material';
import SearchInput from './SearchInput';
import { lightTheme } from '../theme';

interface NavProps {
    session: Session | null;
    theme: Theme;
    switchTheme: () => void;
}

/**
 * This component will be rendered in AppWrapper.tsx - on every page.
 * Navigation elements are placeholder for the time being for development purposes.
 * @returns {JSX.Element} | Navigation
 */
export default function Navigation({ session, theme, switchTheme }: NavProps): JSX.Element {
    const [themeIcon, setThemeIcon] = useState(<DarkMode />);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [expandedMenu, setExpandedMenu] = useState(false);
    const [expandedSearch, setExpandedSearch] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const open = Boolean(anchorElUser);

    // On component render, listen for changes to window size
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Set theme icon according to theme from props
    useEffect(() => {
        if (theme === lightTheme) {
            setThemeIcon(<LightMode className='mr-2' />);
        } else {
            setThemeIcon(<DarkMode className='mr-2' />);
        }
    }, [theme]);

    // Anytime browser window changes size, check if expanded view should be shown
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (windowWidth > 768) {
            setExpandedSearch(false);
        }
    };

    // Handle drop down menu visibility
    const toggleUserMenu = (event: MouseEvent<HTMLElement> | null, open: boolean) => {
        if (event) {
            setAnchorElUser(event.currentTarget);
        } else {
            setAnchorElUser(null);
        }
        setExpandedMenu(open);
    };

    const logoutHandler = async () => {
        // TODO: Error handling if any
        await SUPABASE.auth.signOut();
    };

    return (
        // TODO: #162 Use MUI ThemeProvider
        <AppBar position='static'>
            <Toolbar className='flex items-center justify-between bg-primary px-8 py-3'>
                <div>
                    <Link to='/' className='!text-text'>
                        Streamability
                    </Link>
                </div>

                <div className='flex items-center'>
                    {windowWidth <= 768 ? (
                        // 768px Tailwind breakpoint prefix `md`
                        <IconButton
                            aria-label='search'
                            className='!text-text'
                            onClick={() => setExpandedSearch(!expandedSearch)}
                        >
                            <Search />
                        </IconButton>
                    ) : (
                        <SearchInput />
                    )}
                    <div className='grow-0'>
                        <Tooltip title='Expand Menu'>
                            <IconButton
                                onClick={(event) => toggleUserMenu(event, true)}
                                size='large'
                                sx={{ ml: 2 }}
                                aria-haspopup='true'
                                aria-controls={open ? 'menu-appbar' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                data-testid='menu-button'
                            >
                                <AccountCircle fontSize='inherit' className='!fill-text' />
                                {expandedMenu ? (
                                    <ExpandLess className='!fill-text' />
                                ) : (
                                    <ExpandMore className='!fill-text' />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElUser}
                            id='menu-appbar'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={() => toggleUserMenu(null, false)}
                            data-testid='menu-appbar'
                            PaperProps={{
                                className: '!bg-background',
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 1px 16px rgba(5,0,10,0.30))',
                                    mt: 6,
                                },
                            }}
                        >
                            {session ? (
                                <div>
                                    <MenuItem
                                        className='!p-2'
                                        onClick={() => toggleUserMenu(null, false)}
                                        component={Link}
                                        to='/dashboard'
                                    >
                                        <ListItemIcon className='!text-text'>
                                            <Settings className='mr-2' />
                                            Dashboard
                                        </ListItemIcon>
                                    </MenuItem>
                                </div>
                            ) : (
                                <div>
                                    <MenuItem
                                        className='!p-2'
                                        onClick={() => toggleUserMenu(null, false)}
                                        component={Link}
                                        to='/auth/login'
                                    >
                                        <ListItemIcon className='!text-text'>
                                            <Login className='mr-2' />
                                            Login
                                        </ListItemIcon>
                                    </MenuItem>
                                    <MenuItem
                                        className='!p-2'
                                        onClick={() => toggleUserMenu(null, false)}
                                        component={Link}
                                        to='/auth/signup'
                                    >
                                        <ListItemIcon className='!text-text'>
                                            <PersonAddAlt className='mr-2' />
                                            Sign Up
                                        </ListItemIcon>
                                    </MenuItem>
                                </div>
                            )}
                            <Divider />
                            <MenuItem
                                className='!p-2'
                                onClick={() => toggleUserMenu(null, false)}
                                component={Link}
                                to='/discover'
                            >
                                <ListItemIcon className='!text-text'>
                                    <Explore className='mr-2' />
                                    Discover
                                </ListItemIcon>
                            </MenuItem>
                            <MenuItem className='!p-2' onClick={switchTheme}>
                                <ListItemIcon className='!text-text'>
                                    {themeIcon}
                                    Switch Theme
                                </ListItemIcon>
                            </MenuItem>
                            {session && (
                                <MenuItem
                                    className='!p-2'
                                    onClick={() => {
                                        logoutHandler();
                                        toggleUserMenu(null, false);
                                    }}
                                >
                                    <ListItemIcon className='!text-text'>
                                        <Logout className='mr-2' />
                                        Logout
                                    </ListItemIcon>
                                </MenuItem>
                            )}
                        </Menu>
                    </div>
                </div>
            </Toolbar>
            {/* TODO: Add a transition when search is expanded or collapsed */}
            {expandedSearch && (
                <div className='flex items-center justify-center bg-primary px-8 py-3'>
                    <SearchInput />
                </div>
            )}
        </AppBar>
    );
}
