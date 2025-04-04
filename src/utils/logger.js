class Logger {
    static info(message) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }

    static error(message, error) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
        if (error?.stack) {
            console.error(error.stack);
        }
    }

    static warn(message) {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }

    static debug(message) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
        }
    }
}

export default Logger; 