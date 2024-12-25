import { SUPABASE } from '../supabase/supabaseClient';
import { Link } from 'react-router';
import { Session } from '../types';
import React, { useState, useEffect, MouseEvent } from 'react';
import type { Theme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typ from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DarkMode from '@mui/icons-material/DarkMode';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Explore from '@mui/icons-material/Explore';
import LightMode from '@mui/icons-material/LightMode';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import PersonAddAlt from '@mui/icons-material/PersonAddAlt';
import Search from '@mui/icons-material/Search';
import Settings from '@mui/icons-material/Settings';
import SearchInput from './SearchInput';
import { lightTheme } from '../theme';

interface NavigationProps {
    session: Session | null;
    theme: Theme;
    switchTheme: () => void;
}

/**
 * This component will be rendered in AppWrapper.tsx - on every page.
 * Navigation elements are placeholder for the time being for development purposes.
 * @returns {JSX.Element} | Navigation
 */
const Navigation: React.FC<NavigationProps> = ({ session, theme, switchTheme }): JSX.Element => {
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
        await SUPABASE?.auth.signOut();
    };

    return (
        // TODO: #162 Use MUI ThemeProvider
        <AppBar position='static'>
            <Toolbar className='flex flex-col sm:flex-row items-center justify-between bg-foreground px-8 py-3 flex-wrap'>
                <Link to='/' className='!text-text flex items-center'>
                    <img
                        src='/images/logo-transparent.png'
                        className='w-16 inline'
                        alt='Streamability Logo'
                    ></img>
                    <Typ
                        variant='h5'
                        sx={{
                            display: 'inline',
                            m: 1,
                            letterSpacing: 2.5,
                            fontSize: { xs: 20, sm: 24, md: 36 },
                        }}
                    >
                        Streamability
                    </Typ>
                </Link>

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
                            // TODO: Fix deprecated prop
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
                                        to='/login'
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
                                        to='/signup'
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
                <div className='flex items-center justify-center bg-foreground px-8 py-3'>
                    <SearchInput />
                </div>
            )}
        </AppBar>
    );
};

export default Navigation;
