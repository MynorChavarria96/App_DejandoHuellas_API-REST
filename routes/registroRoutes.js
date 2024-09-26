const express = require('express');
const registroController = require('../controllers/registroController');
const mascotaController = require('../controllers/mascotaController');
const reportesController = require('../controllers/reportesController')


const router = express.Router();

router.post('/registro', registroController.registrar);
router.get('/usuarios/username/:username', registroController.getUserByUsername);
router.get('/usuarios/id/:usuario_id', registroController.getUserById);

router.get('/Propietarios/id/:usuario_id', registroController.getPropietarioById);

router.get('/mascotas/especies', mascotaController.getEspeciesAll);
router.get('/mascotas/generos', mascotaController.getGenerosAll);

router.get('/infoqr/:identificador_qr', mascotaController.getMascotabyQr);

// Ruta para crear una nueva mascota
router.post('/mascotas', mascotaController.createMascota);
router.post('/mascotas/ubicaciones', mascotaController.createubicacion);
router.put('/mascotas/update/:mascota_id', mascotaController.updateMascota);
router.put('/mascotas/delete/:mascota_id', mascotaController.deleteMascota);

router.get('/mascotas/mismascotas/:propietario_id', mascotaController.getMisMascotas);

// Nueva ruta para actualizar la contraseña
router.put('/usuarios/update-password', registroController.updatePassword);

router.post('/nuevo/reporte', reportesController.reportar);
router.post('/nuevo/reporteDes', reportesController.reportarD);
router.get('/get/reporteDes', reportesController.getReporteDesaparecidos);

module.exports = router;
