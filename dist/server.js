"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connect with dp
        (0, db_1.connectToDb)();
        // start server
        const server = app_1.app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
        server.on('error', (error) => {
            if (error.syscall !== 'listen')
                throw error;
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
        });
        // server shutdown
        const shutdown = (signal) => __awaiter(void 0, void 0, void 0, function* () {
            console.info(`Received ${signal} shutdown gracefully`);
            server.close(() => __awaiter(void 0, void 0, void 0, function* () {
                console.info('HTTP server closed');
                process.exit(0);
            }));
            setTimeout(() => {
                console.error('Force shutdown after timeout');
                process.exit(1);
            }, 10000);
        });
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
        process.on('unhandledRejection', (reason, promise) => {
            console.error(`Unhandled Rejection at: ${promise}, reason: ${reason.message}`);
            throw reason;
        });
        process.on('uncaughtException', (error) => {
            console.error(`Uncaught Exception: ${error.message}`);
            shutdown('uncaughtException');
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Server initialization failed: ${errorMessage}`);
        process.exit(1);
    }
});
startServer();
