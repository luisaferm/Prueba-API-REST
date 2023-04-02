const userController = require("../controllers/usuario");
const express = require("express");

const router = express.Router();

router.post('/crearUsuario', userController.addUser);
router.get('/listarUsuario', userController.findAllUser);
router.get('/detalleUsuario/:id', userController.findbyID);
router.put('/actualizarUsuario/:id', userController.updateUser);
router.delete('/eliminarUsuario/:id', userController.deleteUser);
router.get('/listarUsuarioV2/', userController.findAllUserV2);

module.exports = router;











