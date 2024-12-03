const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.lawpath.com.au'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  },
}

module.exports = nextConfig

