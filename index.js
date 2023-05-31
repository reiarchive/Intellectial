require('dotenv').config()
// require('./config/database').connect();

// Import env
const { API_PORT } = process.env;

// Import express and use it
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Import route
const main_routes = require('./routes/MainRoutes');
const api_routes = require('./routes/ApiRoutes');

// Use route
app.use('/', main_routes);
app.use('/api', api_routes);



app.listen(API_PORT, () => {
  console.log(`Server is running on http://localhost:${API_PORT}`);
});