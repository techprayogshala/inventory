module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  basePath: process.env.BASE_PATH || 'api',
  isProduction: process.env.NODE_ENV === 'production',
};
