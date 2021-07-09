module.exports = {
  devServer(configFunction) {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);

      config.headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      };

      return config;
    };
  },
  jest: config => {
    return config;
  },
  paths(paths, _env) {
    return paths;
  },
  webpack: (config, _env) => {
    return config;
  },
};
