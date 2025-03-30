const router = require('express').Router();
const bcrypt = require('bcrypt');
const generateTokens = require('../../utils/generateTokens');
const jwtConfig = require('../../config/jwtConfig');
const cookiesConfig = require('../../config/cookiesConfig');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'Пустые поля' });
    }

    const userInDb = await prisma.user.findUnique({ where: { email } });
    if (userInDb) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const { accessToken, refreshToken } = generateTokens({ user });
      delete user.password;

      res
        .status(201)
        .cookie(jwtConfig.refresh.type, refreshToken, cookiesConfig)
        .json({ accessToken, user });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/authorization', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'Пустые поля' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const { accessToken, refreshToken } = generateTokens({ user });

    delete user.password;
    res.cookie(jwtConfig.refresh.type, refreshToken, cookiesConfig).json({ accessToken, user });
  } catch (error) {
    res.status(500).json({ message: 'Не верный email или пароль' });
  }
});

router.delete('/logout', (req, res) => {
  res.clearCookie(jwtConfig.refresh.type).json({ accessToken: '', user: {} });
});

module.exports = router;
