import React from 'react';

interface ErrorMessageProps {
    /**
     * Message to be displayed with the error
     */
    message: string;
}

/**
 * This function will take a message as input
 * And return a (soon to be) formatted error message
 * Currently used for user authentication only
 *
 * @param props | The error message to be displayed
 * @returns {JSX.Element}
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }): JSX.Element => {
    return (
        <div>
            <p data-testid='error-message-message'>Error! {message}</p>
        </div>
    );
};

export default ErrorMessage;
