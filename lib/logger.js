const { format } = require('util');

const logData = (data) => {
  /* eslint-disable no-console */
  console.log(JSON.stringify(data));
};

const levels = {
  panic: 0,
  fatal: 2,
  error: 3,
  warn: 4,
  info: 6,
  debug: 7
};

const log = (level, label, message, ...args) => {
  logData({ short_message: format(message, ...args), level, label });
};

const createLoggerWithLabel = (label) => {
  const level = levels[(process.env.LOG_LEVEL || 'info')];

  return {
    panic: (message, ...args) => {
      log(0, label, message, ...args);
    },
    fatal: (message, ...args) => {
      if (level >= 2) {
        log(2, label, message, ...args);
      }
    },
    error: (message, ...args) => {
      if (level >= 3) {
        log(3, label, message, ...args);
      }
    },
    warn: (message, ...args) => {
      if (level >= 4) {
        log(4, label, message, ...args);
      }
    },
    log: (message, ...args) => {
      if (level >= 6) {
        log(6, label, message, ...args);
      }
    },
    info: (message, ...args) => {
      if (level >= 6) {
        log(6, label, message, ...args);
      }
    },
    debug: (message, ...args) => {
      if (level >= 7) {
        log(7, label, message, ...args);
      }
    },
    verbose: (message, ...args) => {
      if (level >= 7) {
        log(7, label, message, ...args);
      }
    }
  };
};

module.exports = {
  gateway: createLoggerWithLabel('[EG:gateway]'),
  policy: createLoggerWithLabel('[EG:policy]'),
  config: createLoggerWithLabel('[EG:config]'),
  db: createLoggerWithLabel('[EG:db]'),
  admin: createLoggerWithLabel('[EG:admin]'),
  plugins: createLoggerWithLabel('[EG:plugins]'),
  createLoggerWithLabel
};
