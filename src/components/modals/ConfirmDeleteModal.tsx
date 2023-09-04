import { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Delete, ArrowBackIosNew, WarningSharp } from '@mui/icons-material';

interface ConfirmDeleteModalProps {
    /**
     * Delete a users profile from supabase
     */
    deleteProfile: () => void;
}

/**
 * A modal to confirm if the user wants to permanently
 * delete their account.
 *
 * This will render to the screen as a button that
 * will open the modal when clicked.
 * @returns {JSX.Element}
 */
export default function ConfirmDeleteModal({
    deleteProfile,
}: ConfirmDeleteModalProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant='contained'
                size='large'
                color='error'
                type='button'
                sx={{ m: 0.5, width: 210 }}
                startIcon={<WarningSharp />}
                onClick={handleOpen}
            >
                Delete Profile
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: 2,
                        width: {
                            xs: 250,
                            sm: 500,
                        },
                        boxShadow: 24,
                    }}
                >
                    <div className='flex flex-col items-center bg-background p-4 rounded-md'>
                        <Typography variant='h6' align='center'>
                            Are you sure you want to delete your profile?
                        </Typography>
                        <Typography mb={2}>⚠️ Warning! This action cannot be undone.</Typography>
                        <Button
                            variant='contained'
                            size='large'
                            type='button'
                            color='error'
                            startIcon={<Delete />}
                            sx={{ m: 0.5, width: 210 }}
                            onClick={deleteProfile}
                        >
                            Yes
                        </Button>
                        <Button
                            variant='contained'
                            size='large'
                            type='button'
                            color='secondary'
                            startIcon={<ArrowBackIosNew />}
                            sx={{ m: 0.5, width: 210 }}
                            onClick={handleClose}
                        >
                            No
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
