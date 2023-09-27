import { Search } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React from 'react';
import { Form } from 'react-router-dom';

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
            <FormControl variant='filled'>
                <InputLabel htmlFor='q' color='secondary' className='!text-text'>
                    Search
                </InputLabel>
                <Input
                    type='text'
                    name='q'
                    color='secondary'
                    className='!text-text'
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
            </FormControl>
        </Form>
    );
};

export default SearchInput;
