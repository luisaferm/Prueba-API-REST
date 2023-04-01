const mongoose = require("mongoose");
const Usuario = require('.../models/usuario');

const findAllUser = (req, res) => {
    Usuario.find((err, users) => {
        err && res.status(500).send(err.message);
        res.status(200).json(users);

    })

}

const findbyID = (req, res) => {
    Usuario.findbyID(req.paramas.id, (err, user) => {
        err && res.status(500).send(err.message);
        res.status(200).json(user);
    })
}
const addUser = (req, res) => {
    let usuario = new Usuario({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono_celular: req.body.telefono_celular,
        correo_electronico: req.body.correo_electronico,
        contraseña: req.body.contraseña,
        dependencia: req.body.dependencia,
        estado: req.body.estado,
        rol: req.body.rol

    });

    usuario.save((err, usr) => {
        err && res.status(500).send(err.message);
 
        res.status(200).json(usr);

    });
};

module.exports = {findAllUser, findbyID, addUser};
 


