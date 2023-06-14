module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    router: {
      mode: "hash", // 或者是 'browser'
      basename: "/streamline-mobile",
    },
    publicPath: "./",
    webpackChain(chain) {
      chain.resolve.mainFields.clear();
      chain.merge({
        resolve: {
          mainFields: ["main:h5", "module", "browser", "main", "jsnext:main"],
        },
      });
    },
  },
};
