const fs = require('fs');

// Use polling to watch config files for changes.
//
// this is relatively slow but we don't need immediate action - 5
// seconds polling frequency is fine, and this should work on any
// platform.

const configWatcher = {
  watchFile: (path, callback) => {
    const listener = (current, previous) => {
      if (current.size > 0) { // size == 0 when no file exists
        if (current.mtimeMs !== previous.mtimeMs || current.size !== previous.size) {
          callback(path);
        }
      }
    };
    fs.watchFile(path, {}, listener);
    const watcher = {
      close: () => {
        fs.unwatchFile(path, listener);
      }
    };
    return watcher;
  },
  watchFiles: (paths, callback) => {
    const watchers = paths.map(path => {
      configWatcher.watchFile(path, callback);
    });
    const watcher = {
      close: () => {
        watchers.forEach(watcher => watcher.close());
      }
    };
    return watcher;
  }
};

module.exports = configWatcher;
