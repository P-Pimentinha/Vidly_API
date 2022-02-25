// Express Framework 
const express = require('express');
const app = express();
const winston = require('winston')

/* const { Err } = require('joi/lib/errors'); */
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

//Server connection
const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`Listening on port ${port}...`));