const router = require('express').Router();
const verifyRefreshToken = require('../../middleware/verifyRefreshToken');
const generateTokens = require('../../utils/generateTokens');
const jwtConfig = require('../../config/jwtConfig');
const cookiesConfig = require('../../config/cookiesConfig');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const { user } = res.locals;
  const { accessToken, refreshToken } = generateTokens({ user });

  res.cookie(jwtConfig.refresh.type, refreshToken, cookiesConfig).json({ accessToken, user });
});

module.exports = router;
