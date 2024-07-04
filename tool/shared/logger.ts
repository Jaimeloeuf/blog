class Logger {
  info(header: string, ...args: Parameters<typeof console.log>) {
    console.log(`[INFO-${header}]`, ...args);
  }

  verbose(header: string, ...args: Parameters<typeof console.log>) {
    console.log(`[VERBOSE-${header}]`, ...args);
  }

  error(header: string, ...args: Parameters<typeof console.error>) {
    console.error(`[ERR-${header}]`, ...args);
  }
}

export const logger = new Logger();
