const path = require('path')
module.exports = function override(config, env) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@utils': path.resolve(__dirname, 'src/utils'),
    }
    return config;
}
