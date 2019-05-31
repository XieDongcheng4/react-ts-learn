const path = require('path')
module.exports = function override(config, env) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@api': path.resolve(__dirname, 'src/api'),
        '@model': path.resolve(__dirname, 'src/model'),
        '@util': path.resolve(__dirname, 'src/util'),
    }
    return config;
}
