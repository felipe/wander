import * as Winston from 'winston';

const transport = new Winston.transports.Console();
const logger = Winston.createLogger({
  transports: [transport],
});

const wanderer = '📟';

export function console(message: string): void {
  process.stdout.write(message ? `${wanderer} ${message}` : '');
  process.stdout.write('\n');
}

export function info(message: string, data: any = null): void {
  log('info', data === null ? message : `{${message}: "${data}"}`);
}

export function debug(message: string, data: any = null): void {
  log('debug', data === null ? message : `{${message}: "${data}"}`);
}

export function error(message: string, data: any = null): void {
  log('error', data === null ? message : `{${message}: "${data}"}`);
}

export function log(level: string, message: string): void {
  switch (level) {
    case 'output':
      console(message);
      break;
    case 'error':
      logger.error(message);
      break;
    case 'debug':
      logger.debug(message);
      break;
    case 'info':
      logger.info(message);
      break;
    default:
      // logger.log(message)
      break;
  }
}
