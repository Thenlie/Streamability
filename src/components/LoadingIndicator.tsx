import React from 'react';

const LoadingIndicator: React.FC = () => {
    const styles = {
        loadingIndicator: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0',
        },
        dot: {
            width: '16px',
            height: '16px',
            margin: '0 4px',
            backgroundColor: '#333',
            borderRadius: '50%',
            animation: 'dot-blink 1.4s infinite both',
        },
        '@keyframes dotBlink': {
            '0%, 80%, 100%': { opacity: 0 },
            '40%': { opacity: 1 },
        },
        dot1: {
            animationDelay: '-0.32s',
        },
        dot2: {
            animationDelay: '-0.16s',
        },
    };

    return (
        <div>
            <style>
                {`
                    @keyframes dot-blink {
                        0%, 80%, 100% {
                            opacity: 0;
                        }
                        40% {
                            opacity: 1;
                        }
                    }
                `}
            </style>
            <div style={styles.loadingIndicator}>
                <span style={{ ...styles.dot, ...styles.dot1 }}></span>
                <span style={{ ...styles.dot, ...styles.dot2 }}></span>
                <span style={styles.dot}></span>
            </div>
        </div>
    );
};

export default LoadingIndicator;