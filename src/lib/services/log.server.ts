import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { destination, multistream, pino } from 'pino';

function createLogger() {
  const logDir = resolve(process.cwd(), 'logs');
  const outFile = resolve(logDir, 'output.log');
  const errFile = resolve(logDir, 'error.log');

  if (!existsSync(logDir)) mkdirSync(logDir);
  if (!existsSync(outFile)) writeFileSync(outFile, '', { flag: 'w' });
  if (!existsSync(errFile)) writeFileSync(errFile, '', { flag: 'w' });

  const log = pino(
    {
      formatters: {
        level: (label) => {
          return { type: label.toUpperCase() };
        },
        bindings: (bindings) => {
          return { pid: bindings.pid, host: bindings.hostname };
        },
      },
      messageKey: 'message',
      errorKey: 'error',
      timestamp: pino.stdTimeFunctions.isoTime,
    },
    multistream(
      [
        {
          level: 'info',
          stream: destination({
            dest: outFile,
            sync: true,
          }),
        },
        {
          level: 'error',
          stream: destination({
            dest: errFile,
            sync: true,
          }),
        },
      ],
      { dedupe: true },
    ),
  );

  return log;
}

export const log = createLogger();
