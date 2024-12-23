const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  images: {
    domains: ["i.ibb.co"],
  },

  async redirects() {
    return [
      {
        source: "/mypage",
        destination: "/mypage/schedule",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
