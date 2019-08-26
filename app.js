const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/api/index');
const connect = require('./connect');
const authenticateService = require('./service/authenticate');
const config = require('./config');

// Create global app object
const app = express();

app.use(cors());
app.use(authenticateService.authenticate());

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

connect.initDb();

app.use(`/${config.basePath}`, indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler

app.use((err, req, res, next) => {
  if (!config.isProduction) {
    console.log(err.stack);
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send({ errors: { message: 'Invalid Token' } });
  }
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: err,
    },
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
