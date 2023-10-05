import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import React from 'react';
import { Form } from 'react-router-dom';
import TextInput from '../components/TextInput';

/**
 * Currently using a react router form,
 * this will redirect to /search?q=INPUT
 * We can then pull the query from the URL
 *
 * @returns {JSX.Element} | the main search input component
 */
const SearchInput: React.FC = (): JSX.Element => {
    return (
        // TODO: #162 Use MUI ThemeProvider
        <Form method='get' action='/search'>
            <TextInput
                type='text'
                name='q'
                label='Search'
                variant='outlined'
                aria-label='search'
                inputProps={{
                    'data-testid': 'search-input',
                }}
                required
                endAdornment={
                    <InputAdornment aria-label='submit search' position='end'>
                        <IconButton type='submit' data-testid='search-button'>
                            <Search className='!text-text' />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Form>
    );
};

export default SearchInput;
