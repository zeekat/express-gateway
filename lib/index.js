require('./eventBus'); // init event bus

const pluginsLoader = require('./plugins');
if (require.main === module) {
  const config = require('./config'); // this is to init config before loading servers and plugins
  const plugins = pluginsLoader.load({ config });
  require('./gateway')({ plugins, config });
} else { // Loaded as module (e.g. if "eg gateway create" generated code )
  class Main {
    constructor () {
      this.configPath = null;
    }

    load (configPath) {
      this.configPath = configPath;
      return this;
    }

    run () {
      process.env.EG_CONFIG_DIR = this.configPath || process.env.EG_CONFIG_DIR;
      const config = require('./config'); // this is to init config before loading servers and plugins
      const plugins = pluginsLoader.load({ config });
      const gateway = require('./gateway')({ plugins, config });
      return Promise.all([gateway]);
    }
  }

  module.exports = () => {
    return new Main();
  };
}
