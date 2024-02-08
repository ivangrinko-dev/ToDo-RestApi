const express = require('express');
const bodyParser = require('body-parser');
const route = require('./controller/task.controller');
const app = express();
const swaggerDocument = require("../swagger.json")
const swaggerUi = require("swagger-ui-express")
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/ivan', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/task', route);
app.use((error, req, res, _next)=> res.send(error.message));

module.exports = app;