const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nombres:{type: String},
  apellidos:{type: String},
  telefono_celular:{type: String},
  correo_electronico:{type: String},
  contraseña:{type: String},
  dependencia:{type: String},
  estado:{type: String},
  rol:{type: String} 

});

module.exports = User = mongoose.model('Usuario',UsuarioSchema);