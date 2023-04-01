const express = require('express');
const bodyParser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;
//const ObjectID = require('mongodb').ObjectID;
const mongoose = require("mongoose");
const usuarios =require('../api/usuario');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("./api/usuario", usuarios);
mongoose.connect(

    "mongodb://localhost/prueba",
    { userNewUrlParser: true},
    (err, res) =>{
        err && console.log("Error conectando a la bd");
        app.listen(27017, () => {
            console.log("Servidor corriendo en http://localhost:27017")

        });
    }
 

);
