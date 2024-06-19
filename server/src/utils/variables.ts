import dotenv from 'dotenv';

dotenv.config();

const {env} = process as {env: { [key: string]: string | undefined }};

export const {
    PORT,
    MONGO_URI,
    DB_NAME,
    NODE_ENV,
} = env;