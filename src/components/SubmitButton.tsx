import React from 'react';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface SubmitButtonProps {
    /**
     * Displays loading spinner when true
     */
    loading: boolean;
}

/**
 * Generic form submission button
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({ loading }) => {
    return (
        <>
            <div>
                <Button
                    variant='contained'
                    size='large'
                    type='submit'
                    color='secondary'
                    sx={{ margin: '10px', minWidth: '210px', minHeight: '45px' }}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
                </Button>
            </div>
        </>
    );
};

export default SubmitButton;
