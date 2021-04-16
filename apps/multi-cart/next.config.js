// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

module.exports = withNx({
    webpack: (config, nextConfig) => {

        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            include: [nextConfig.dir],
            use: 'graphql-tag/loader',
        });
        // ❌ NOPE: config.webpack5 = true; // thx: https://github.com/vercel/next.js/issues/21740
        return config;
    },
});
