import { app } from "./app";



const startServer = async () => {
    try {

        // connect with dp


        // start server
        const server = app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        })


        server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.syscall !== 'listen') throw error;

            switch (error.code) {
                case 'EACCES':
                    console.error(`Port ${process.env.PORT} requires elevated privileges`);
                    process.exit(1);
                case 'EADDRINUSE':
                    console.error(`Port ${process.env.PORT} is already in use`);
                    process.exit(1);
                default:
                    throw error;
            }
        })

        // server shutdown
        const shutdown = async (signal: string) => {
            console.info(`Received ${signal} shutdown gracefully`);

            server.close(async () => {
                console.info('HTTP server closed');
                process.exit(0);

            });

            setTimeout(() => {
                console.error('Force shutdown after timeout');
                process.exit(1);
            }, 10000);
        }


        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);


        process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
            console.error(`Unhandled Rejection at: ${promise}, reason: ${reason.message}`);
            throw reason;
        });


        process.on('uncaughtException', (error: Error) => {
            console.error(`Uncaught Exception: ${error.message}`);
            shutdown('uncaughtException');
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Server initialization failed: ${errorMessage}`);
        process.exit(1);
    }
}


startServer();