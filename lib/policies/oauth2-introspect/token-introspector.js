const axios = require('axios');
const querystring = require('querystring');

const logger = require('../../logger').policy;

module.exports = (options) => {
  return (token, tokenTypeHint) => {
    const data = { token };

    if (tokenTypeHint) {
      data.token_type_hint = tokenTypeHint;
    }

    logger.info(`token-introspector : ${options.endpoint}`);

    const req = {
      url: options.endpoint,
      method: 'post',
      headers: {
        authorization: options.authorization_value,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: querystring.stringify(data),
      timeout: options.timeout
    };

    return axios(req).then(res => {
      if (res.data.active === true) {
        logger.debug('token-introspector : Token is active');
        return res.data;
      }
      logger.debug('token-introspector : Token is not active');

      throw new Error('Token not active');
    });
  };
};
