// - - - - = = = = APP = = = = - - - - //
const express = require('express');
const app = express();

// - - - - = = = = MIDDLEWARE = = = = - - - - //
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const path = require('path');
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// - - - - = = = = ROUTES = = = = - - - - //
const routes = require('./server/routes')
routes(app);

// - - - - = = = = PORT = = = = - - - - //
const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));