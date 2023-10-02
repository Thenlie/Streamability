import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import React from 'react';
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
    return (
        <Form method='get' action='/search'>
            <TextInput
                type='text'
                name='q'
                label='Search'
                color='primary'
                variant='outlined'
                ariaLabel='search'
                inputProps={{
                    'data-testid': 'search-input',
                }}
                required
                sx={{
                    color: colorOverride,
                    borderBottomColor: colorOverride,
                    ':before': { borderBottomColor: colorOverride },
                    '&:not(.Mui-disabled):hover::before': { borderBottomColor: colorOverride },
                }}
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
