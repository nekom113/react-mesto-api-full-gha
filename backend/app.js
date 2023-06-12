const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error_handler');
const { limiter } = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());

const { PORT = 3000 } = process.env;

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});
  } catch (err) {
    console.error(`Catch ${err}`);
  }
};
start();
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.use(helmet());
app.use(limiter);

app.listen(PORT, console.log(`Server is working on PORT: ${PORT}`));
