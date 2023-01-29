import { createLogger, transports, format as fmtOptions } from 'winston';

const logger = createLogger({
  format: fmtOptions.combine(
    fmtOptions.errors({
      stack: true,
    }),
    fmtOptions.prettyPrint(),
    fmtOptions.colorize({ all: true }),
  ),
  transports: [new transports.Console()],
});

export default logger;
