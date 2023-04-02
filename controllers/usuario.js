const mongoose = require("mongoose");
const Usuario = require('../models/usuario');



const findAllUser = async (req, res) => {
    try {
        const users = await Usuario.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

const findAllUserV2 = async (req, res) => {
    try {
        const { sort, order } = req.query;

        let sortOption = {};
        if (sort && order) {
            sortOption[sort] = order === 'desc' ? -1 : 1;
        }

        const users = await Usuario.find()
            .sort(sortOption)
            .select('nombres apellidos email dependencia');

        const formattedUsers = users.map((user) => {
            const nombreCompleto = `${user.apellidos}, ${user.nombres}`;
            return {
                nombreCompleto,
                correo_electronico: user.correo_electronico,
                dependencia: user.dependencia,

            };
        });

        res.status(200).json(formattedUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};


const findbyID = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: `No se encontró usuario con id ${req.params.id}` });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ocurrió un error al buscar el usuario' });
    }
};



const addUser = async (req, res) => {
    try {
        const usuario = new Usuario({
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono_celular: req.body.telefono_celular,
            correo_electronico: req.body.correo_electronico,
            contraseña: req.body.contraseña,
            dependencia: req.body.dependencia,
            estado: req.body.estado,
            rol: req.body.rol,
        });

        const savedUser = await usuario.save();
        res.status(200).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al guardar el usuario');
    }
};


const deleteUser = (req, res) => {
    Usuario.findByIdAndDelete(req.params.id)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).send({
                    message: `No se encontró usuario con id ${req.params.id}`
                });
            }
            res.send({
                message: "Usuario eliminado exitosamente!"
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: `No se encontró usuario con id ${req.params.id}`
                });
            }
            return res.status(500).send({
                message: `Error al eliminar usuario con id ${req.params.id}`
            });
        });
};

const updateUser = async (req, res) => {
    const userId = req.params.id; // id del usuario a actualizar
    const updateData = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono_celular: req.body.telefono_celular,
        correo_electronico: req.body.correo_electronico,
        contraseña: req.body.contraseña,
        dependencia: req.body.dependencia,
        estado: req.body.estado,
        rol: req.body.rol
    };

    try {
        // Buscamos el usuario por ID y lo actualizamos con los nuevos datos
        const updatedUser = await Usuario.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).send('No se encontró el usuario a actualizar');
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error al actualizar el usuario');
    }
};

module.exports = { findAllUser, findbyID, addUser, deleteUser, updateUser, findAllUserV2 };



