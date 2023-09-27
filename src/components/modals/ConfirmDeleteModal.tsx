import React, { useState } from 'react';
import { Box, Modal, Typography as Typ } from '@mui/material';
import { Delete, ArrowBackIosNew, WarningSharp } from '@mui/icons-material';
import Button from '../Button';

interface ConfirmDeleteModalProps {
    /**
     * Delete a users profile from supabase
     */
    deleteProfile: () => void;
    /**
     * Loading triggered by deleting profile
     */
    loading: boolean;
}

/**
 * A modal to confirm if the user wants to permanently
 * delete their account.
 *
 * This will render to the screen as a button that
 * will open the modal when clicked.
 * @returns {JSX.Element}
 */
const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    deleteProfile,
    loading,
}): JSX.Element => {
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
                title='Delete Profile'
                color='error'
                StartIcon={WarningSharp}
                onClick={handleOpen}
            />
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
                        <Typ variant='h6' align='center'>
                            Are you sure you want to delete your profile?
                        </Typ>
                        <Typ mb={2}>⚠️ Warning! This action cannot be undone.</Typ>
                        <Button
                            title='Yes'
                            color='error'
                            loading={loading}
                            StartIcon={Delete}
                            onClick={deleteProfile}
                        />
                        <Button title='No' StartIcon={ArrowBackIosNew} onClick={handleClose} />
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ConfirmDeleteModal;
