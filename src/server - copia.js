const express = require('express');
const bodyParser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;
//const ObjectID = require('mongodb').ObjectID;

const app = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const dbName = 'prueba';

MongoClient.connect(url, function(err, client) {
  console.log("Conexion exitosa");




  const db = client.db(dbName);
  const usuarios = db.collection('usuario');



  // Definir rutas aquí


  //Crear usuario
  app.post('/crearUsuario', function(req, res) {
    const usuario = req.body;
  
    usuarios.insertOne(usuario, function(err, result) {
      if (err) throw err;
  
      console.log('Usuario creado: ', result.ops[0]);
      res.send(result.ops[0]);
    });
  });

  //Listar usurios
  app.get('/buscarUsuario', function(req, res) {
    usuarios.find({}, { projection: { rol: 0 } }).toArray(function(err, result) {
      if (err) throw err;
  
      console.log('lista usuarios: ', result);
      res.send(result);
    });
  });

  //Detalle de usuario
  app.get('/detalleUsuario/:id', function(req, res) {
    const id = new ObjectID(req.params.id);
  
    usuarios.findOne({ _id: id }, function(err, result) {
      if (err) throw err;
  
      console.log('Usuario encontrado: ', result);
      res.send(result);
    });
  });


  //Actualizar usuario

  app.put('/actualizarUsuario/:id', function(req, res) {
    const id = new ObjectID(req.params.id);
    const usuario = req.body;
  
    usuarios.updateOne({ _id: id }, { $set: usuario }, function(err, result) {
      if (err) throw err;
  
      console.log('Usuario actualizado: ', result.result);
      res.send(result.result);
    });
  });

  //Eliminar Usuario

  app.delete('/eliminarUsuario/:id', function(req, res) {
    const id = new ObjectID(req.params.id);
  
    usuarios.deleteOne({ _id: id }, function(err, result) {
      if (err) throw err;
  
      console.log('Usuario eliminado: ', result.result);
      res.send(result.result);
    });
  });

  app.listen(port, function() {
    console.log('Servidor iniciado en el puerto ' + port);
  })

});

