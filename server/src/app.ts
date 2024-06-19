import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import createHttpError from 'http-errors';


// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(compression());
app.use(morgan('dev'));

// Import routes

// Not found route handler
app.use((req:Request, res:Response, next:NextFunction) => {
    next(createHttpError.NotFound("This route does not exist!"));
})

// Error handler


export default app;