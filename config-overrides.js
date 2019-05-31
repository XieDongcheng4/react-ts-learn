const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const {getLoader} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@api': path.resolve(__dirname, 'src/api'),
        '@model': path.resolve(__dirname, 'src/model'),
        '@util': path.resolve(__dirname, 'src/util'),
    };

    const tsLoader = getLoader(
        config.module.rules,
        rule => rule.loader && typeof rule.loader === 'string' && rule.loader.includes('ts-loader')
    );
    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [
                tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: true,
                }),
            ],
        }),
    };
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A', // 主题色
        },
    })(config, env);
    return config;
};
