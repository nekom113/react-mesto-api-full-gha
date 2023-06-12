require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error_handler');
const { limiter } = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;
const app = express();
app.use(cors());

const start = async () => {
  try {
    await mongoose.connect(DB_ADDRESS, {});
  } catch (err) {
    console.error(`Catch ${err}`);
  }
};
start();
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.use(helmet());
app.use(limiter);

app.listen(PORT, console.log(`Server is working on PORT: ${PORT}`));
