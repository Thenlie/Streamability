interface ErrorMessageProps {
    message: string
}

/**
 * This function will take a message as input
 * And return a (soon to be) formatted error message
 * Currently used for user authentication only
 * 
 * @param props | The error message to be displayed
 * @returns {JSX.Element}
 */
export default function ErrorMessage(props: ErrorMessageProps): JSX.Element {
    return (
        <div>
            <p data-testid="error-message-message">Error! {props.message}</p>
        </div>
    );
}