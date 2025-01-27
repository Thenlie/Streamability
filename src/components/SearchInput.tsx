import Search from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react';
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

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <Form method='get' action='/search' onSubmit={clearSearch}>
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
