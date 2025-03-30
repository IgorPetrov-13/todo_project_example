const express = require('express');
const removeHTTPHeader = require('../middleware/removeHTTPHeader');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true })); // для чтения из POST запросов req.body
  app.use(express.json()); // для чтения json из body
  app.use(express.static(path.join(__dirname, 'public'))); // чтение папки static
  app.use(removeHTTPHeader); //удаление заголовка
  app.use(cookieParser()); // чтение кук
  app.use(morgan('dev')); // Логирование запросов на сервере
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:5173', 'https://igorpetrov-13.github.io'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['set-cookie'],
      credentials: true,
    })
  );
};

module.exports = serverConfig;
