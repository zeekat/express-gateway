const path = require('path');
const gateway = require('express-gateway-lite');

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
