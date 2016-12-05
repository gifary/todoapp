const express = require('express');
const app = express();
const swig = require('swig');
const config = require('./config');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
require('./db');
swig.setDefaults(config.swig);
app.engine('html', swig.renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// routes config

const indexRoute = require('./routes/');

app.use('/', indexRoute);
app.use('/list', indexRoute);

// error handler

app.listen(config.port, () => {
  console.log(`Pet Server is listening on port ${config.port}`);
});
