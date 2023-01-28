import { createLogger, transports, format as fmtOptions } from 'winston';

const logger = createLogger({
  format: fmtOptions.combine(
    fmtOptions.errors({
      stack: true,
    }),
    fmtOptions.metadata(),
    fmtOptions.prettyPrint(),
  ),
  silent: process.env.NODE_ENV === 'production',
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});

export default logger;
