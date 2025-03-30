const jwtConfig = require('./jwtConfig');

const cookiesConfig = {
  httpOnly: true,
  maxAge: jwtConfig.refresh.expiresIn,
  secure: true,
  sameSite: 'none',
};
module.exports = cookiesConfig;
