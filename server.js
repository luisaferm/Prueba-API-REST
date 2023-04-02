
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const usuarios =require('./api/usuario');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/usuario/', usuarios);

mongoose.connect('mongodb://127.0.0.1/prueba', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa'))
  .catch((error) => console.log('Error de conexión', error));

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});