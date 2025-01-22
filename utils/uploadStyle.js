 export function uploaderStyle(statusCode) {
    // Define styles for different HTTP status ranges
    const styles = {
        idle: { 
            color: 'black',
        },
        uploading: { 
            color: '#0284c7',
        },
        success: { 
            color: '#16a34a',
        },
        error: { 
            color: '#b91c1c',
        },
    };

    // Determine style based on status code
    if (!statusCode) {
        return styles.idle; // Default state
    } else if (statusCode >= 100 && statusCode < 200) {
        return styles.uploading; // Informational (uploading in progress)
    } else if (statusCode >= 200 && statusCode < 300) {
        return styles.success; // Success
    } else if (statusCode >= 400) {
        return styles.error; // Client or Server Error
    } else {
        return styles.idle; // Fallback for unknown status
    }
}
