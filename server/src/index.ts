import { createServer } from "http";
import app from "./app";
import { PORT } from "./utils/variables";
import connectDB from "./config/db/connectDb";
import logger from "./config/logger.config";

// Connect to the database
connectDB();

// Create a server
let server = createServer(app);

// Start the server
server.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
});

// Handle unhandled promise rejections
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
    });
    } else {
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// Handle SIGINT signal
process.on("SIGINT", () => {
    logger.info("SIGINT received");
    if (server) {
        server.close();
    }
});

// Handle SIGTERM signal
process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});

export default server;