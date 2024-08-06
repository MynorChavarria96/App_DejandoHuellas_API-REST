const express = require('express');
const registroController = require('../controllers/registroController');

const router = express.Router();

router.post('/registro', registroController.registrar);
router.get('/usuarios/username/:username', registroController.getUserByUsername);
router.get('/usuarios/id/:usuario_id', registroController.getUserById);

// Nueva ruta para actualizar la contraseña
router.put('/usuarios/update-password', registroController.updatePassword);

module.exports = router;
