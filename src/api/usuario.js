const userController = require(".../controllers/usuario");
const express = require("express");

const router = express.Router();

router.post('/crearUsuario', userController.addUser);
router.get('/listarUsuario', userController.findAllUser);
router.get('/detalleUsuario', userController.findbyID);
router.put('/actualizarUsuario/:id', userController.updateUser);
router.delete('/eliminarUsuario/:id', userController.deleteUser);

module.exports = router;











