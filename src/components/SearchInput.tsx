import Search from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-router';
import TextInput from '../components/TextInput';

interface SearchInputProps {
    /**
     * Override the default text color of the input
     */
    colorOverride?: 'white' | 'black';
}

/**
 * Currently using a react router form, this will redirect to /search?q=INPUT
 * We can then pull the query from the URL and don't need to pass it as props
 */
const SearchInput: React.FC<SearchInputProps> = ({ colorOverride }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const url = new URL(window.location.href);
    const query = url.searchParams.get('q')?.trim();

    const clearSearch = () => {
        setSearchTerm('');
    };

    /**
     * On page load, if searching, set the value to what was searched.
     * otherwise clear any input
     */
    useEffect(() => {
        if (query) {
            setSearchTerm(query);
        } else {
            clearSearch();
        }
    }, [query]);

    return (
        <Form method='get' action='/search'>
            <TextInput
                type='text'
                name='q'
                id='q'
                label='Search'
                color='primary'
                textOverrideColor={colorOverride}
                variant='filled'
                ariaLabel='search'
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                endAdornment={
                    <InputAdornment aria-label='submit search' position='end'>
                        <IconButton type='submit' sx={{ color: colorOverride }}>
                            <Search />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Form>
    );
};

export default SearchInput;
