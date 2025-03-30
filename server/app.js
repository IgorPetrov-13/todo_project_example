require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;
const serverConfig = require("./config/serverConfig");

// Импортируем роуты из отдельных файлов
const apiRoutes = require("./routes/api.routes");

// Конфигурация
serverConfig(app);

// Маршрутизация
app.use("/api", apiRoutes);

app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
