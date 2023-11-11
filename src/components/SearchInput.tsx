import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { Form } from 'react-router-dom';
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
 *
 * @returns {JSX.Element} | the main search input component
 */
const SearchInput: React.FC<SearchInputProps> = ({ colorOverride }): JSX.Element => {
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
