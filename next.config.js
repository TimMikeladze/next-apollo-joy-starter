const { i18n } = require('./next-i18next.config');

const { withAxiom } = require('next-axiom');

const withBundleAnalyzer = require('next-bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const { version } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(withPWA(withAxiom(nextConfig)));
