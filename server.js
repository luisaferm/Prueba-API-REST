const express = require('express');
const bodyParser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;
//const ObjectID = require('mongodb').ObjectID;
const mongoose = require("mongoose");
//const usuarios = require('../api/usuario');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use("/api/usuario", usuarios);
mongoose.connect('mongodb://localhost/prueba', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa'))
  .catch((error) => console.log('Error de conexión', error));
