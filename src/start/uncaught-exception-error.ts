import { winston_exceptions, winston_logger } from "./logger";

const uncaught_exception_error = () => {
    process.on('uncaughtException', (ex) => {
        winston_logger.error('uncaught Exception found', ex);
        winston_exceptions.error(ex.message, ex.stack);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex: globalThis.Error) => {
        winston_logger.error('unhandled rejection found', ex.stack);
        winston_exceptions.error(ex.message, ex);
        process.exit(1);
    })
};

export = uncaught_exception_error;