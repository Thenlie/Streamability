import React from 'react';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface SubmitButtonProps {
    title: string;
    /**
     * Displays loading spinner when true
     */
    loading: boolean;
    /**
     * Displays icon in front of button content
     */
    startIcon?: React.ReactNode;
    onClick?: () => void;
}

/**
 * Generic form submission button
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({ title, loading, startIcon, onClick }) => {
    return (
        <>
            <div>
                <Button
                    variant='contained'
                    size='large'
                    type='submit'
                    color='secondary'
                    sx={{ margin: 0.5, minWidth: '210px', minHeight: '45px' }}
                    startIcon={startIcon}
                    onClick={onClick}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : title}
                </Button>
            </div>
        </>
    );
};

export default SubmitButton;
