const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v4/games/",
    createProxyMiddleware({
      target: "https://api.igdb.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/v4/game_videos",
    createProxyMiddleware({
      target: "https://api.igdb.com",
      changeOrigin: true,
    })
  );
  app.use(
    "https://api.igdb.com/v4/screenshots",
    createProxyMiddleware({
      target: "https://api.igdb.com",
      changeOrigin: true,
    })
  );
  app.use(
    "https://api.igdb.com/v4/language_supports",
    createProxyMiddleware({
      target: "https://api.igdb.com",
      changeOrigin: true,
    })
  );
};
