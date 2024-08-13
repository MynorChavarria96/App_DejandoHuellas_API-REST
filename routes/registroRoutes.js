const express = require('express');
const registroController = require('../controllers/registroController');
const mascotaController = require('../controllers/mascotaController');

const router = express.Router();

router.post('/registro', registroController.registrar);
router.get('/usuarios/username/:username', registroController.getUserByUsername);
router.get('/usuarios/id/:usuario_id', registroController.getUserById);

router.get('/Propietarios/id/:usuario_id', registroController.getPropietarioById);

router.get('/mascotas/especies', mascotaController.getEspeciesAll);
router.get('/mascotas/generos', mascotaController.getGenerosAll);

// Ruta para crear una nueva mascota
router.post('/mascotas', mascotaController.createMascota);

router.get('/mascotas/mismascotas/:propietario_id', mascotaController.getMisMascotas);

// Nueva ruta para actualizar la contraseña
router.put('/usuarios/update-password', registroController.updatePassword);

module.exports = router;
