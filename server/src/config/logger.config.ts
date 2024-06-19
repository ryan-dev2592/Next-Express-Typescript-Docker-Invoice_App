// Logger configuration using winston

import { createLogger, format, transports } from 'winston';
import { NODE_ENV } from '@/utils/variables';

const enumerateErrorFormat = format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
}
);

const logger = createLogger({
    level: NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        enumerateErrorFormat(),
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [new transports.Console({
        stderrLevels: ['error'],
    })]
});

export default logger;