interface Config {
    errorHandler: (error: any) => void;
}

export const config: Config = {
    errorHandler(error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error(`[[ saga-assist caught exception ]]:\n`, error);
        } else {
            throw error;
        }
    }
};
