process.env.VUE_APP_PUBLIC_PATH =
  process.env.NODE_ENV !== "production" ? "" : "/com-480-project-bkh/";

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH
};
